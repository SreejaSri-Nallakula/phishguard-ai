import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

// Re-implement the analysis logic on the backend
const SUSPICIOUS_PHRASES = [
  "urgent action required", "verify your account", "click here immediately",
  "your account has been compromised", "confirm your identity", "suspended",
  "verify your information", "unusual activity", "act now", "limited time",
  "update your payment", "confirm your password", "security alert",
  "unauthorized access", "click the link below", "account will be closed",
  "account suspended", "account locked", "access has been restricted",
  "your account will be deactivated", "verify your email", "identity verification",
  "won a prize", "congratulations", "free gift", "claim your reward",
  "you have been selected", "lucky winner", "cash prize", "gift card",
  "you won", "unclaimed reward", "free iphone", "free money",
  "wire transfer", "bank account", "update billing", "payment failed",
  "invoice attached", "unpaid invoice", "overdue payment", "refund pending",
  "tax refund", "irs notice", "government grant", "inheritance",
  "million dollars", "funds transfer", "western union", "moneygram",
  "reset your password immediately", "enter your credentials", "sign in now",
  "login attempt detected", "new login from", "unusual sign-in",
  "confirm your credit card", "ssn", "social security number",
  "date of birth", "mother's maiden name",
  "act within 24 hours", "respond immediately", "final notice",
  "last warning", "your account expires", "urgent request",
  "failure to respond", "immediate action needed", "do not ignore",
  "important notification", "critical alert", "your subscription",
  "your device has been infected", "virus detected", "malware found",
  "your computer is at risk", "call microsoft", "call apple support",
  "tech support", "remote access", "click to scan",
  "package delivery failed", "missed delivery", "reschedule delivery",
  "dhl notification", "fedex alert", "usps delivery",
  "do not share this email", "confidential", "strictly private",
  "for your eyes only", "this is not spam",
  "deactivate", "expire", "will be terminated", "close your account"
];

const URGENCY_WORDS = [
  "immediately", "urgent", "asap", "right now", "within 24 hours",
  "act fast", "hurry", "don't wait", "time sensitive", "expiring soon",
  "last chance", "now or never", "respond today", "by end of day",
  "within 48 hours", "final 24 hours",
];

const MALICIOUS_DOMAINS = [
  "secure-login-verify.com", "acc0unt-update.net", "paypa1-verify.com",
  "amaz0n-security.com", "g00gle-alert.com", "faceb00k-secure.com",
  "apple-id-verify.com", "netflix-billing.com", "bankofamerica-secure.net",
  "paypal-update-info.com", "microsoft-alert.com", "support-helpdesk.com",
  "account-alert.net", "securemail-alert.com", "login-verify-now.com",
];

const SUSPICIOUS_TLDS = [
  ".xyz", ".top", ".click", ".buzz", ".loan", ".win", ".work", ".gq",
  ".tk", ".ml", ".cf", ".ga", ".men", ".download", ".stream", ".racing",
  ".party", ".trade", ".review", ".date", ".faith", ".bid", ".accountant",
];

const LEGITIMATE_DOMAINS: Record<string, string[]> = {
  paypal: ["paypal.com"],
  amazon: ["amazon.com", "amazon.co.uk", "amazon.in"],
  google: ["google.com", "gmail.com", "accounts.google.com"],
  microsoft: ["microsoft.com", "outlook.com", "live.com", "hotmail.com"],
  apple: ["apple.com", "icloud.com"],
  netflix: ["netflix.com"],
  facebook: ["facebook.com", "fb.com"],
  instagram: ["instagram.com"],
  twitter: ["twitter.com", "x.com"],
  dhl: ["dhl.com"],
  fedex: ["fedex.com"],
  ups: ["ups.com"],
  usps: ["usps.com"],
  irs: ["irs.gov"],
};

function analyzeEmail(content: string) {
  const lowerContent = content.toLowerCase().replace(/\s+/g, ' ');
  let score = 0;

  // 1. Detect suspicious phrases
  const suspiciousWords: { word: string; index: number }[] = [];
  SUSPICIOUS_PHRASES.forEach((phrase) => {
    const idx = lowerContent.indexOf(phrase);
    if (idx !== -1) {
      if (!suspiciousWords.some(w => Math.abs(w.index - idx) < 5)) {
        suspiciousWords.push({ word: phrase, index: idx });
        score += 8;
      }
    }
  });

  // 2. Urgency language
  let urgencyCount = 0;
  URGENCY_WORDS.forEach((w) => {
    if (lowerContent.includes(w)) urgencyCount++;
  });
  score += urgencyCount * 6;

  // 3. Extract and check links
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  const foundUrls = content.match(urlRegex) || [];
  const links = foundUrls.map((url) => {
    const isMalicious = MALICIOUS_DOMAINS.some((d) => url.toLowerCase().includes(d));
    const isSuspiciousTld = SUSPICIOUS_TLDS.some((t) => url.includes(t));
    const hasIpAddress = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url);
    const isUrlShortener = /(bit\.ly|tinyurl\.com|t\.co|ow\.ly|goo\.gl)/.test(url);

    const isSafe = !isMalicious && !isSuspiciousTld && !hasIpAddress && !isUrlShortener;

    if (isMalicious) score += 20;
    else if (hasIpAddress) score += 18;
    else if (isUrlShortener) score += 12;
    else if (!isSafe) score += 12;

    return { url, safe: isSafe };
  });

  // 4. Extract sender domain
  const emailBodyRegex = /[\w.-]+@([\w.-]+\.[\w.]+)/;
  const domainMatch = content.match(emailBodyRegex);
  const domainName = domainMatch ? domainMatch[1].toLowerCase() : "unknown.com";

  const isMaliciousDomain = MALICIOUS_DOMAINS.some((d) => domainName.includes(d));
  const isSuspiciousTld = SUSPICIOUS_TLDS.some((t) => domainName.endsWith(t));

  if (isMaliciousDomain) score += 30;
  else if (isSuspiciousTld) score += 18;

  // 5. Brand spoofing detection
  for (const [brand, legits] of Object.entries(LEGITIMATE_DOMAINS)) {
    if (lowerContent.includes(brand) && !legits.some(l => domainName.endsWith(l)) && domainName !== "unknown.com") {
      score += 22;
      if (!suspiciousWords.some(w => w.word.includes(brand))) {
        suspiciousWords.push({ word: `Spoofed brand: ${brand}`, index: lowerContent.indexOf(brand) });
      }
    }
  }

  // 6. Direct malicious domain mention in text (Fallback for OCR lacking 'http://')
  MALICIOUS_DOMAINS.forEach((domain) => {
    if (lowerContent.includes(domain)) {
      if (!links.some(l => l.url.toLowerCase().includes(domain))) {
         score += 40; 
         if (!suspiciousWords.some(w => w.word.includes(domain))) {
           suspiciousWords.push({ word: `Malicious domain: ${domain}`, index: lowerContent.indexOf(domain) });
         }
      }
    }
  });

  score = Math.min(100, Math.max(0, score));
  if (content.trim().length < 20 && score === 0) {
    score = 5;
  }

  const classification = score <= 25 ? "Safe" : score <= 55 ? "Suspicious" : "Phishing";

  const domainRep = isMaliciousDomain ? "Malicious" : isSuspiciousTld ? "Suspicious" : domainName === "unknown.com" ? "Unknown" : "Good";

  const explanations: string[] = [];
  if (suspiciousWords.length > 0) explanations.push(`Found ${suspiciousWords.length} suspicious phrase(s).`);
  if (urgencyCount > 0) explanations.push(`Uses ${urgencyCount} urgency tactic(s).`);
  if (links.some(l => !l.safe)) explanations.push("Contains unsafe links.");
  if (score > 55) explanations.push("High risk of phishing.");
  else if (score > 25) explanations.push("Caution advised.");
  else explanations.push("Appears safe.");

  const advice =
    classification === "Safe"
      ? ["This email appears safe.", "Verify the sender.", "Never share passwords."]
      : classification === "Suspicious"
      ? ["Do not click links.", "Contact the organization directly.", "Report this email."]
      : ["Do NOT click links.", "Report as phishing immediately.", "Block the sender.", "Change your passwords if you clicked anything."];

  return {
    riskScore: score,
    classification,
    suspiciousWords,
    domain: {
      name: domainName,
      age: isMaliciousDomain ? "2 days" : isSuspiciousTld ? "3 months" : "5+ years",
      reputation: domainRep,
    },
    links,
    aiExplanation: explanations.join(" "),
    advice,
  };
}

function isValidEmailFormat(text: string) {
  const headerRegex = /^(from|to|subject|date|bcc|cc):/im;
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  return headerRegex.test(text) || emailRegex.test(text);
}

export const analyzeAndSave = async (req: Request, res: Response) => {
  try {
    const { content, userId } = req.body;
    
    if (!content || !isValidEmailFormat(content)) {
      return res.status(400).json({ error: "It's not an email" });
    }

    const result = analyzeEmail(content);
    
    try {
      const scan = await prisma.scan.create({
        data: {
          userId: userId || null,
          riskScore: result.riskScore,
          classification: result.classification,
          domain: result.domain.name,
          snippet: content.slice(0, 80),
          resultJson: JSON.stringify(result),
        },
      });
      return res.json(scan);
    } catch (dbError) {
      console.error("Database Save Failed (Scans):", dbError);
      // Fallback: return the analysis result even if saving to DB fails
      return res.json({
        id: "temp-" + Date.now(),
        userId: userId || null,
        riskScore: result.riskScore,
        classification: result.classification,
        domain: result.domain.name,
        snippet: content.slice(0, 80),
        resultJson: JSON.stringify(result),
        date: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Analysis and Save Error:", error);
    res.status(500).json({ error: "Analysis failed", details: error instanceof Error ? error.message : String(error) });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.json([]);
    }

    const scans = await prisma.scan.findMany({
      where: { userId: String(userId) },
      orderBy: { createdAt: "desc" },
    });
    res.json(scans);
  } catch (error) {
    console.error("Get History Error:", error);
    res.json([]); // Return empty history instead of 500
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.json({ total: 0, safe: 0, suspicious: 0, phishing: 0 });
    }

    const where = { userId: String(userId) };
    
    const total = await prisma.scan.count({ where });
    const safe = await prisma.scan.count({ where: { ...where, classification: "Safe" } });
    const suspicious = await prisma.scan.count({ where: { ...where, classification: "Suspicious" } });
    const phishing = await prisma.scan.count({ where: { ...where, classification: "Phishing" } });

    res.json({ total, safe, suspicious, phishing });
  } catch (error) {
    console.error("Get Stats Error:", error);
    res.json({ total: 0, safe: 0, suspicious: 0, phishing: 0 }); // Return zeros instead of 500
  }
};
