import { Shield, AlertTriangle, XCircle, Globe, Link2, Brain, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import RiskGauge from "./RiskGauge";
import type { AnalysisResult } from "@/lib/phishingAnalyzer";

interface Props {
  result: AnalysisResult;
  emailContent: string;
}

export default function AnalysisReport({ result, emailContent }: Props) {
  const classColors = {
    Safe: { bg: "bg-safe/10", text: "text-safe", border: "border-safe/30" },
    Suspicious: { bg: "bg-suspicious/10", text: "text-suspicious", border: "border-suspicious/30" },
    Phishing: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
  };
  const c = classColors[result.classification];

  const highlightContent = () => {
    if (result.suspiciousWords.length === 0) return emailContent;
    let highlighted = emailContent;
    const sorted = [...result.suspiciousWords].sort((a, b) => b.index - a.index);
    sorted.forEach(({ word }) => {
      const regex = new RegExp(`(${word})`, "gi");
      highlighted = highlighted.replace(regex, `<mark class="bg-destructive/30 text-destructive px-1 rounded">$1</mark>`);
    });
    return highlighted;
  };

  return (
    <div className="space-y-6">
      {/* Score + Classification */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Risk Score</h3>
          <RiskGauge score={result.riskScore} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Classification</h3>
          <div className={`px-8 py-4 rounded-xl ${c.bg} ${c.border} border`}>
            <div className="flex items-center gap-3">
              {result.classification === "Safe" && <Shield className={`h-8 w-8 ${c.text}`} />}
              {result.classification === "Suspicious" && <AlertTriangle className={`h-8 w-8 ${c.text}`} />}
              {result.classification === "Phishing" && <XCircle className={`h-8 w-8 ${c.text}`} />}
              <span className={`text-2xl font-bold ${c.text}`}>{result.classification}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Suspicious Words */}
      {result.suspiciousWords.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-suspicious" /> Suspicious Phrases Detected
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {result.suspiciousWords.map((sw, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/30 text-destructive text-xs font-mono">{sw.word}</span>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-secondary/30 text-sm font-mono whitespace-pre-wrap max-h-60 overflow-y-auto" dangerouslySetInnerHTML={{ __html: highlightContent() }} />
        </motion.div>
      )}

      {/* Domain Reputation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6">
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 neon-text" /> Domain Reputation
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground block">Domain</span>
            <span className="font-mono">{result.domain.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Age</span>
            <span className="font-mono">{result.domain.age}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Status</span>
            <span className={`font-semibold ${result.domain.reputation === "Good" ? "text-safe" : result.domain.reputation === "Malicious" ? "text-destructive" : "text-suspicious"}`}>
              {result.domain.reputation}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Links */}
      {result.links.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <Link2 className="h-5 w-5 neon-text" /> Link Scanner
          </h3>
          <div className="space-y-2">
            {result.links.map((link, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 text-sm">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${link.safe ? "bg-safe" : "bg-destructive animate-glow-pulse"}`} />
                <span className="font-mono truncate flex-1">{link.url}</span>
                <span className={`text-xs font-semibold ${link.safe ? "text-safe" : "text-destructive"}`}>
                  {link.safe ? "SAFE" : "DANGEROUS"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Explanation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 neon-text" /> AI Explanation
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.aiExplanation || "Analysis pending detailed explanation."}</p>
      </motion.div>

      {/* Security Advice */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <ShieldCheck className="h-5 w-5 neon-text" /> Security Advice
        </h3>
        <ul className="space-y-2">
          {(result.advice || []).map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {a}
            </li>
          ))}
          {(!result.advice || result.advice.length === 0) && (
            <li className="text-sm text-muted-foreground">No specific advice available for this scan.</li>
          )}
        </ul>
      </motion.div>
    </div>
  );
}
