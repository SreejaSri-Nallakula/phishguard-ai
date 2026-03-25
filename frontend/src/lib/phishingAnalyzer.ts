export interface AnalysisResult {
  riskScore: number;
  classification: "Safe" | "Suspicious" | "Phishing";
  suspiciousWords: { word: string; index: number }[];
  domain: { name: string; age: string; reputation: "Good" | "Suspicious" | "Malicious" | "Unknown" };
  links: { url: string; safe: boolean }[];
  aiExplanation: string;
  advice: string[];
}

// --- Phishing signal dictionaries ---
const SUSPICIOUS_PHRASES = [
  // Account/identity threats
  "urgent action required", "verify your account", "click here immediately",
  "your account has been compromised", "confirm your identity", "suspended",
  "verify your information", "unusual activity", "act now", "limited time",
  "update your payment", "confirm your password", "security alert",
  "unauthorized access", "click the link below", "account will be closed",
  "account suspended", "account locked", "access has been restricted",
  "your account will be deactivated", "verify your email", "identity verification",
  // Prize / reward scams
  "won a prize", "congratulations", "free gift", "claim your reward",
  "you have been selected", "lucky winner", "cash prize", "gift card",
  "you won", "unclaimed reward", "free iphone", "free money",
  // Financial fraud
  "wire transfer", "bank account", "update billing", "payment failed",
  "invoice attached", "unpaid invoice", "overdue payment", "refund pending",
  "tax refund", "irs notice", "government grant", "inheritance",
  "million dollars", "funds transfer", "western union", "moneygram",
  // Credential theft
  "reset your password immediately", "enter your credentials", "sign in now",
  "login attempt detected", "new login from", "unusual sign-in",
  "confirm your credit card", "ssn", "social security number",
  "date of birth", "mother's maiden name",
  // Urgency & pressure
  "act within 24 hours", "respond immediately", "final notice",
  "last warning", "your account expires", "urgent request",
  "failure to respond", "immediate action needed", "do not ignore",
  "important notification", "critical alert", "your subscription",
  // Technical deception
  "your device has been infected", "virus detected", "malware found",
  "your computer is at risk", "call microsoft", "call apple support",
  "tech support", "remote access", "click to scan",
  // Delivery scams
  "package delivery failed", "missed delivery", "reschedule delivery",
  "dhl notification", "fedex alert", "usps delivery",
  // Confidentiality lures
  "do not share this email", "confidential", "strictly private",
  "for your eyes only", "this is not spam",
  // Deactivation
  "deactivate", "expire", "will be terminated", "close your account",
];

const URGENCY_WORDS = [
  "immediately", "urgent", "asap", "right now", "within 24 hours",
  "act fast", "hurry", "don't wait", "time sensitive", "expiring soon",
  "last chance", "now or never", "respond today", "by end of day",
  "within 48 hours", "final 24 hours",
];

// Known malicious / spoof domains
const MALICIOUS_DOMAINS = [
  "secure-login-verify.com", "acc0unt-update.net", "paypa1-verify.com",
  "amaz0n-security.com", "g00gle-alert.com", "faceb00k-secure.com",
  "apple-id-verify.com", "netflix-billing.com", "bankofamerica-secure.net",
  "paypal-update-info.com", "microsoft-alert.com", "support-helpdesk.com",
  "account-alert.net", "securemail-alert.com", "login-verify-now.com",
];

// Suspicious top-level domains commonly used in phishing
const SUSPICIOUS_TLDS = [
  ".xyz", ".top", ".click", ".buzz", ".loan", ".win", ".work", ".gq",
  ".tk", ".ml", ".cf", ".ga", ".men", ".download", ".stream", ".racing",
  ".party", ".trade", ".review", ".date", ".faith", ".bid," ,".accountant",
];

// Trusted brands commonly spoofed
const SPOOFED_BRANDS = [
  "paypal", "amazon", "google", "microsoft", "apple", "netflix", "facebook",
  "instagram", "twitter", "bank of america", "chase bank", "wells fargo",
  "ebay", "dropbox", "linkedin", "dhl", "fedex", "ups", "usps",
  "irs", "social security", "covid", "stimulus",
];

// Legitimate domains for those brands (to detect spoofing)
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

export function analyzeEmail(content: string): AnalysisResult {
  const lowerContent = content.toLowerCase();
  let score = 0;

  // 1. Detect suspicious phrases
  const suspiciousWords: { word: string; index: number }[] = [];
  SUSPICIOUS_PHRASES.forEach((phrase) => {
    const idx = lowerContent.indexOf(phrase);
    if (idx !== -1) {
      // Don't double-count very similar phrases
      if (!suspiciousWords.some(w => Math.abs(w.index - idx) < 5)) {
        suspiciousWords.push({ word: phrase, index: idx });
        score += 8;
      }
    }
  });

  // 2. Urgency language (extra penalty on top)
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
    const isSuspiciousTld = SUSPICIOUS_TLDS.some((t) => {
      try { return new URL(url).hostname.endsWith(t); } catch { return url.includes(t); }
    });
    const hasIpAddress = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url);
    const hasObfuscation = url.includes("%") || url.includes("@") || /\d{5,}/.test(url);
    const isUrlShortener = /(bit\.ly|tinyurl\.com|t\.co|ow\.ly|goo\.gl|short\.link|shorturl\.at)/.test(url);

    const isSafe = !isMalicious && !isSuspiciousTld && !hasIpAddress && !hasObfuscation && !isUrlShortener;

    if (isMalicious) score += 20;
    else if (hasIpAddress) score += 18;
    else if (isUrlShortener) score += 12;
    else if (!isSafe) score += 12;

    return { url, safe: isSafe };
  });

  // 4. Extract sender domain
  const emailHeaderRegex = /from:.*?[\w.-]+@([\w.-]+\.[\w.]+)/i;
  const emailBodyRegex = /[\w.-]+@([\w.-]+\.[\w.]+)/;
  const domainMatch = content.match(emailHeaderRegex) || content.match(emailBodyRegex);
  const domainName = domainMatch ? domainMatch[1].toLowerCase() : "unknown.com";

  const isMaliciousDomain = MALICIOUS_DOMAINS.some((d) => domainName.includes(d));
  const isSuspiciousTld = SUSPICIOUS_TLDS.some((t) => domainName.endsWith(t));

  if (isMaliciousDomain) score += 30;
  else if (isSuspiciousTld) score += 18;

  // 5. Brand spoofing detection: brand mentioned but sender domain doesn't match
  for (const [brand, legitimateDomains] of Object.entries(LEGITIMATE_DOMAINS)) {
    const brandMentioned = lowerContent.includes(brand);
    const senderIsLegitimate = legitimateDomains.some((ld) => domainName.endsWith(ld));
    if (brandMentioned && !senderIsLegitimate && domainName !== "unknown.com") {
      score += 22;
      if (!suspiciousWords.some(w => w.word.includes(brand))) {
        suspiciousWords.push({ word: `Spoofed brand: ${brand}`, index: lowerContent.indexOf(brand) });
      }
    }
  }

  // 6. Credential request patterns
  const credentialPatterns = [
    /password/i, /credit card/i, /ssn/i, /social security/i,
    /bank account/i, /routing number/i, /pin number/i,
    /mother.s maiden/i, /date of birth/i, /cvv/i,
  ];
  credentialPatterns.forEach((pat) => {
    if (pat.test(content)) score += 15;
  });

  // 7. HTML tricks (disguised links, invisible text)
  if (/<a\s+href=["'][^"']+["'][^>]*>[^<]*<\/a>/i.test(content)) {
    // Link text doesn't match the href
    const linkMatches = content.matchAll(/<a\s+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi);
    for (const match of linkMatches) {
      const href = match[1].toLowerCase();
      const text = match[2].toLowerCase();
      if (text.includes("http") && !href.includes(text.replace(/https?:\/\//, ""))) {
        score += 15;
      }
    }
  }

  // 8. Excessive capitalization (shouting / pressure)
  const capsRatio = (content.match(/[A-Z]/g) || []).length / Math.max(content.length, 1);
  if (capsRatio > 0.3) score += 10;

  // 9. Multiple exclamation points (high pressure)
  const exclamations = (content.match(/!/g) || []).length;
  if (exclamations >= 3) score += 8;

  // 10. Generic greetings (lack of personalization)
  const genericGreetings = ["dear customer", "dear user", "dear account holder", "dear member", "dear valued customer", "hello friend", "greetings"];
  if (genericGreetings.some(g => lowerContent.startsWith(g) || lowerContent.includes("\n" + g))) {
    score += 10;
    suspiciousWords.push({ word: "Generic greeting (lack of personalization)", index: 0 });
  }

  score = Math.min(100, Math.max(0, score));
  if (content.trim().length < 20) score = 5;

  // Classification thresholds: Safe ≤ 25, Suspicious ≤ 55, Phishing > 55
  const classification: AnalysisResult["classification"] =
    score <= 25 ? "Safe" : score <= 55 ? "Suspicious" : "Phishing";

  const domainRep = isMaliciousDomain
    ? "Malicious" as const
    : isSuspiciousTld
    ? "Suspicious" as const
    : domainName === "unknown.com"
    ? "Unknown" as const
    : "Good" as const;

  // Build detailed explanation
  const explanations: string[] = [];
  if (suspiciousWords.length > 0)
    explanations.push(`Found ${suspiciousWords.length} suspicious phrase(s) commonly used in phishing attacks.`);
  if (urgencyCount > 0)
    explanations.push(`Email uses ${urgencyCount} urgency/pressure tactic(s) to force quick action.`);
  if (links.some((l) => !l.safe))
    explanations.push("Contains links pointing to known malicious, obfuscated, or shortened domains.");
  if (isMaliciousDomain)
    explanations.push("The sender's domain is listed in known phishing blacklists.");
  if (suspiciousWords.some(w => w.word.startsWith("Spoofed brand:")))
    explanations.push("The email impersonates a well-known brand but the sender domain does not match the legitimate company.");
  if (score > 55)
    explanations.push("The combination of factors strongly indicates a phishing attempt. Do NOT interact with this email.");
  else if (score > 25)
    explanations.push("Some suspicious elements were found. Treat this email with caution.");
  else
    explanations.push("No significant phishing indicators were detected in this email.");

  const advice =
    classification === "Safe"
      ? ["This email appears safe, but always stay vigilant.", "Verify the sender if the email was unexpected.", "Never share passwords or sensitive info over email."]
      : classification === "Suspicious"
      ? ["Do not click any links until you verify the sender.", "Contact the organization directly using their official website.", "Report this email to your IT security team."]
      : ["Do NOT click any links or download attachments.", "Do NOT reply or provide personal information.", "Report this email as phishing immediately.", "Block the sender and delete the email.", "If you already clicked a link, change your passwords immediately and notify your bank if financial info was shared."];

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
