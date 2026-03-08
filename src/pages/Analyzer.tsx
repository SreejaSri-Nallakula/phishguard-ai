import { useState, useRef } from "react";
import { Search, Trash2, Upload, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeEmail, type AnalysisResult } from "@/lib/phishingAnalyzer";
import AnalysisReport from "@/components/AnalysisReport";

export default function Analyzer() {
  const [emailContent, setEmailContent] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    setAnalyzing(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1800));
    const res = analyzeEmail(emailContent);
    setResult(res);
    setAnalyzing(false);

    const history = JSON.parse(localStorage.getItem("phishguard_history") || "[]");
    history.unshift({
      id: Date.now(),
      date: new Date().toISOString(),
      riskScore: res.riskScore,
      classification: res.classification,
      domain: res.domain.name,
      snippet: emailContent.slice(0, 80),
      result: res,
    });
    localStorage.setItem("phishguard_history", JSON.stringify(history.slice(0, 50)));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("text/") || file.name.endsWith(".eml") || file.name.endsWith(".msg") || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setEmailContent(text);
        setUploadedFile(file.name);
      };
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      setUploadedFile(file.name);
      setEmailContent(`[Uploaded screenshot: ${file.name}]\n\nNote: Screenshot analysis is a preview feature. For best results, paste the email text directly.`);
    } else {
      setUploadedFile(file.name);
      setEmailContent(`[Uploaded file: ${file.name}]\n\nUnsupported format. Please paste email text or upload a .txt/.eml file.`);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Email Analyzer</span>
          </h1>
          <p className="text-muted-foreground">Paste email content below for AI-powered phishing detection</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 md:p-8">
          <label className="block text-sm font-medium mb-3 text-foreground">Paste Email Content</label>
          <textarea
            rows={10}
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder={"From: support@example.com\nSubject: Urgent: Verify your account\n\nDear user,\n\nWe noticed unusual activity on your account. Click here to verify your identity immediately...\n\nhttps://secure-login-verify.com/auth"}
            className="w-full rounded-xl bg-secondary/50 border border-border p-4 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
          />

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleAnalyze}
              disabled={!emailContent.trim() || analyzing}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-[var(--neon-glow)] hover:shadow-[var(--neon-glow-strong)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {analyzing ? "Analyzing..." : "Analyze Email"}
            </button>
            <button
              onClick={() => { setEmailContent(""); setResult(null); setUploadedFile(null); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.eml,.msg,image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 flex items-center gap-3 p-4 rounded-xl border border-dashed border-border text-muted-foreground text-sm cursor-pointer hover:border-primary/50 hover:bg-secondary/20 transition-all"
          >
            <Upload className="h-5 w-5 flex-shrink-0" />
            <span>
              {uploadedFile
                ? <>Uploaded: <span className="text-primary font-medium">{uploadedFile}</span></>
                : <>Upload email file or screenshot — <span className="text-primary font-medium hover:underline">Browse files</span></>
              }
            </span>
          </div>
        </motion.div>

        <AnimatePresence>
          {analyzing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 glass-card p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="absolute left-0 right-0 h-0.5 bg-primary/60 animate-scan-line shadow-[var(--neon-glow)]" />
              <div className="text-center relative z-10">
                <Loader2 className="h-10 w-10 neon-text mx-auto mb-3 animate-spin" />
                <p className="font-semibold">AI Analysis in Progress</p>
                <p className="text-sm text-muted-foreground mt-1">Scanning email for phishing indicators...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && !analyzing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <AnalysisReport result={result} emailContent={emailContent} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
