import { useState, useRef } from "react";
import { Search, Trash2, Upload, Loader2, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Tesseract from "tesseract.js";
import AnalysisReport from "@/components/AnalysisReport";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { api } from "@/lib/api";
import { toast } from "sonner";

export default function Analyzer() {
  const [emailContent, setEmailContent] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailError, setShowEmailError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isValidEmailFormat = (text: string) => {
    // Check for common email headers (From:, To:, Subject:, Date:)
    const headerRegex = /^(from|to|subject|date|bcc|cc):/im;
    // Check for any email address
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    
    return headerRegex.test(text) || emailRegex.test(text);
  };

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    
    if (!isValidEmailFormat(emailContent)) {
      setShowEmailError(true);
      return;
    }

    setAnalyzing(true);
    setResult(null);
    setError(null);
    try {
      const userStr = localStorage.getItem("phishguard_user");
      let user = null;
      try { user = userStr ? JSON.parse(userStr) : null; } catch { user = null; }
      
      const scan = await api.post("/scans/analyze", { 
        content: emailContent,
        userId: user?.id 
      });
      const analysisResult = JSON.parse(scan.resultJson);
      setResult(analysisResult);
      setShowResultModal(true);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError("Analysis failed. Please ensure the backend server is running on port 5000 and try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file.name);
    setResult(null);

    if (file.type.startsWith("text/") || file.name.endsWith(".eml") || file.name.endsWith(".msg") || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setEmailContent(text);
      };
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      setIsOcrProcessing(true);
      setOcrProgress(0);
      
      try {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setOcrProgress(m.progress * 100);
            }
          }
        });
        
        setEmailContent(result.data.text);
      } catch (error) {
        console.error("OCR Error:", error);
        setEmailContent(`[Error parsing image: ${file.name}]\nPlease try pasting the text manually.`);
      } finally {
        setIsOcrProcessing(false);
        setOcrProgress(0);
      }
    } else {
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
            onClick={() => !isOcrProcessing && fileInputRef.current?.click()}
            className={`mt-4 flex items-center gap-3 p-4 rounded-xl border border-dashed border-border text-muted-foreground text-sm transition-all ${
              isOcrProcessing ? "opacity-70 cursor-wait bg-secondary/10" : "cursor-pointer hover:border-primary/50 hover:bg-secondary/20"
            }`}
          >
            {isOcrProcessing ? (
              <Loader2 className="h-5 w-5 flex-shrink-0 animate-spin text-primary" />
            ) : (
              <Upload className="h-5 w-5 flex-shrink-0" />
            )}
            <div className="flex-1">
              {isOcrProcessing ? (
                <div className="space-y-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-primary font-medium">Extracting text from image...</span>
                    <span>{Math.round(ocrProgress)}%</span>
                  </div>
                  <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-primary h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${ocrProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <span>
                  {uploadedFile
                    ? <>Uploaded: <span className="text-primary font-medium">{uploadedFile}</span></>
                    : <>Upload email file or screenshot — <span className="text-primary font-medium hover:underline">Browse files</span></>
                  }
                </span>
              )}
            </div>
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
          {error && !analyzing && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-8 p-4 rounded-xl border border-destructive/50 bg-destructive/10 text-destructive flex items-center justify-center gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && !analyzing && (
            <div className="mt-8">
              <AnalysisReport result={result} emailContent={emailContent} />
            </div>
          )}
        </AnimatePresence>

        <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold gradient-text">Analysis Result</DialogTitle>
              <DialogDescription>
                Detailed breakdown of the email scan findings.
              </DialogDescription>
            </DialogHeader>
            {result && (
              <div className="mt-4">
                <AnalysisReport result={result} emailContent={emailContent} />
              </div>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={showEmailError} onOpenChange={setShowEmailError}>
          <DialogContent className="max-w-[320px] bg-white border-none p-6 text-center rounded-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-600">Error</h3>
                <p className="text-red-500/80 text-sm mt-1">It's not an email</p>
              </div>
              <button 
                onClick={() => setShowEmailError(false)}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors mt-2"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
