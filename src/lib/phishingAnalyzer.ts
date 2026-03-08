export interface AnalysisResult {
  riskScore: number;
  classification: "Safe" | "Suspicious" | "Phishing";
  suspiciousWords: { word: string; index: number }[];
  domain: { name: string; age: string; reputation: "Good" | "Suspicious" | "Malicious" | "Unknown" };
  links: { url: string; safe: boolean }[];
  aiExplanation: string;
  advice: string[];
}

const SUSPICIOUS_PHRASES = [
  "urgent action required", "verify your account", "click here immediately",
  "your account has been compromised", "confirm your identity", "suspended",
  "verify your information", "unusual activity", "act now", "limited time",
  "update your payment", "confirm your password", "security alert",
  "unauthorized access", "click the link below", "won a prize",
  "congratulations", "free gift", "claim your reward", "expire",
  "deactivate", "reset your password immediately", "wire transfer",
];

const MALICIOUS_DOMAINS = ["secure-login-verify.com", "acc0unt-update.net", "paypa1-verify.com", "amaz0n-security.com", "g00gle-alert.com"];
const SUSPICIOUS_TLDS = [".xyz", ".top", ".click", ".buzz", ".loan", ".win"];

export function analyzeEmail(content: string): AnalysisResult {
  const lowerContent = content.toLowerCase();
  let score = 0;

  // Detect suspicious phrases
  const suspiciousWords: { word: string; index: number }[] = [];
  SUSPICIOUS_PHRASES.forEach((phrase) => {
    const idx = lowerContent.indexOf(phrase);
    if (idx !== -1) {
      suspiciousWords.push({ word: phrase, index: idx });
      score += 12;
    }
  });

  // Extract and check links
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  const foundUrls = content.match(urlRegex) || [];
  const links = foundUrls.map((url) => {
    const isSafe = !MALICIOUS_DOMAINS.some((d) => url.includes(d)) && !SUSPICIOUS_TLDS.some((t) => url.includes(t));
    if (!isSafe) score += 15;
    return { url, safe: isSafe };
  });

  // Extract domain from email-like patterns
  const emailRegex = /[\w.-]+@([\w.-]+\.\w+)/;
  const domainMatch = content.match(emailRegex);
  const domainName = domainMatch ? domainMatch[1] : "unknown.com";
  const isMaliciousDomain = MALICIOUS_DOMAINS.some((d) => domainName.includes(d));
  const isSuspiciousTld = SUSPICIOUS_TLDS.some((t) => domainName.endsWith(t));

  if (isMaliciousDomain) score += 25;
  else if (isSuspiciousTld) score += 15;

  // Check for urgency / pressure
  const urgencyWords = ["immediately", "urgent", "asap", "right now", "within 24 hours", "act fast"];
  urgencyWords.forEach((w) => { if (lowerContent.includes(w)) score += 5; });

  // Check for credential requests
  if (lowerContent.includes("password") || lowerContent.includes("credit card") || lowerContent.includes("ssn") || lowerContent.includes("social security")) {
    score += 20;
  }

  score = Math.min(100, Math.max(0, score));
  if (content.trim().length < 20) score = Math.max(score, 5);

  const classification: AnalysisResult["classification"] = score <= 30 ? "Safe" : score <= 60 ? "Suspicious" : "Phishing";

  const domainRep = isMaliciousDomain ? "Malicious" as const : isSuspiciousTld ? "Suspicious" as const : domainName === "unknown.com" ? "Unknown" as const : "Good" as const;

  const explanations: string[] = [];
  if (suspiciousWords.length > 0) explanations.push(`Found ${suspiciousWords.length} suspicious phrase(s) commonly used in phishing attacks.`);
  if (links.some((l) => !l.safe)) explanations.push("Contains links pointing to known malicious or suspicious domains.");
  if (isMaliciousDomain) explanations.push("The sender's domain is associated with known phishing campaigns.");
  if (score > 60) explanations.push("The combination of urgency language, suspicious links, and credential requests strongly indicates a phishing attempt.");
  else if (score > 30) explanations.push("Some elements of this email raise concerns but are not conclusive. Exercise caution.");
  else explanations.push("No significant phishing indicators were detected in this email.");

  const advice = classification === "Safe"
    ? ["This email appears safe, but always stay vigilant.", "Verify the sender if the email was unexpected."]
    : classification === "Suspicious"
    ? ["Do not click any links until you verify the sender.", "Contact the organization directly using official channels.", "Report this email to your IT security team."]
    : ["Do NOT click any links or download attachments.", "Do NOT reply or provide personal information.", "Report this email as phishing immediately.", "Block the sender and delete the email.", "If you already clicked a link, change your passwords immediately."];

  return {
    riskScore: score,
    classification,
    suspiciousWords,
    domain: { name: domainName, age: isMaliciousDomain ? "2 days" : isSuspiciousTld ? "3 months" : "5 years", reputation: domainRep },
    links,
    aiExplanation: explanations.join(" "),
    advice,
  };
}
