import { Link } from "react-router-dom";
import { Shield, Search, FileText, Zap, Globe, BarChart3, AlertTriangle, Lock, ChevronRight, ArrowRight, Check, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const steps = [
  { icon: FileText, title: "Paste Email", desc: "Copy the suspicious email content into our analyzer" },
  { icon: Search, title: "AI Analysis", desc: "Our AI engine scans for phishing indicators in real-time" },
  { icon: BarChart3, title: "Get Report", desc: "Receive a detailed security report with risk score" },
];

const features = [
  { icon: Zap, title: "AI Phishing Detection", desc: "Advanced NLP models detect sophisticated phishing attempts" },
  { icon: AlertTriangle, title: "Suspicious Phrase Detection", desc: "Highlights urgent language and social engineering tactics" },
  { icon: Globe, title: "Domain Reputation Check", desc: "Verifies sender domains against threat intelligence databases" },
  { icon: BarChart3, title: "Risk Score Meter", desc: "Quantified threat assessment from 0 to 100" },
  { icon: Lock, title: "Link Scanner", desc: "Analyzes embedded URLs for malicious redirects" },
  { icon: Shield, title: "Security Recommendations", desc: "Actionable advice tailored to each threat level" },
];

const floatingItems = [
  { icon: Mail, label: "Email Scanned", x: "6%", y: "22%", delay: 0.6 },
  { icon: ShieldCheck, label: "Safe", x: "87%", y: "28%", delay: 0.9 },
  { icon: AlertTriangle, label: "Threat Found", x: "4%", y: "68%", delay: 1.2 },
  { icon: Lock, label: "Secured", x: "89%", y: "62%", delay: 1.5 },
];

export default function Landing() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-background">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{
          backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-16">
            {/* Left content */}
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs text-muted-foreground font-medium mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-safe"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                AI-Powered Email Security
              </motion.div>

              <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight mb-6 text-foreground">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Protect Your
                </motion.span>
                <motion.span
                  className="block gradient-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Inbox First
                </motion.span>
              </h1>

              <motion.p
                className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                Fast, friendly, and engaging — our AI engine scans and detects phishing emails before they reach you.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-3 mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Link
                  to="/analyzer"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[var(--neon-glow)]"
                >
                  Start Analyzing
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all"
                >
                  Login / Sign Up
                </Link>
                <Link
                  to="/education"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-medium border border-border text-foreground hover:bg-secondary/50 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="flex items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { value: "99.2%", label: "Detection Rate" },
                  { value: "20K+", label: "Emails Scanned" },
                  { value: "<1s", label: "Analysis Time" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side — isometric-style illustration cards */}
            <motion.div
              className="relative hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-lg aspect-square">
                {/* Main card */}
                <motion.div
                  className="absolute top-[10%] left-[10%] w-[75%] glass-card p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Email Analysis</div>
                      <div className="text-xs text-muted-foreground">Real-time scanning</div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-2.5 rounded-full bg-secondary w-full" />
                    <div className="h-2.5 rounded-full bg-secondary w-4/5" />
                    <div className="h-2.5 rounded-full bg-secondary w-3/5" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-safe/10 text-safe text-xs font-medium flex items-center gap-1">
                      <Check className="h-3 w-3" /> Safe
                    </div>
                    <div className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs">Score: 12/100</div>
                  </div>
                </motion.div>

                {/* Floating threat card */}
                <motion.div
                  className="absolute top-[5%] right-[2%] glass-card p-4 rounded-xl shadow-md w-48"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-xs font-semibold text-destructive">Threat Found</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">Suspicious link detected in email body</div>
                  </motion.div>
                </motion.div>

                {/* Floating stats card */}
                <motion.div
                  className="absolute bottom-[12%] right-[5%] glass-card p-4 rounded-xl shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-xs font-semibold text-foreground">Risk Score</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">87<span className="text-sm text-muted-foreground">/100</span></div>
                  </motion.div>
                </motion.div>

                {/* Bottom-left domain card */}
                <motion.div
                  className="absolute bottom-[8%] left-[5%] glass-card p-3 rounded-xl shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4 text-suspicious" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">Domain Check</div>
                      <div className="text-[10px] text-muted-foreground">paypai-secure.com</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 400">
                  <motion.line x1="200" y1="120" x2="320" y2="60" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.8 }} />
                  <motion.line x1="200" y1="200" x2="340" y2="280" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.8 }} />
                  <motion.line x1="180" y1="220" x2="100" y2="320" stroke="hsl(var(--suspicious))" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 0.8 }} />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-b border-border/30" />
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Three simple steps to detect phishing emails</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }} className="glass-card-hover p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-[var(--neon-glow)]">
                  {i + 1}
                </div>
                <step.icon className="h-10 w-10 neon-text mx-auto mb-4 mt-2" />
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Enterprise-grade email security analysis</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card-hover p-6">
                <f.icon className="h-8 w-8 neon-text mb-4" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DANGER SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp} className="glass-card p-8 md:p-12 border-destructive/30">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-bold">Why Phishing is Dangerous</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Phishing attacks account for <span className="text-foreground font-semibold">over 80% of reported security incidents</span>. Cybercriminals use deceptive emails to steal credentials, financial data, and personal information.</p>
              <p>A single successful phishing attack can lead to <span className="text-destructive font-semibold">identity theft, financial loss, and organizational data breaches</span> costing millions of dollars.</p>
              <p>PhishGuard AI helps you stay ahead of these threats by analyzing emails in real-time before you interact with them.</p>
            </div>
            <Link to="/education" className="inline-flex items-center gap-2 mt-6 text-primary hover:underline font-medium text-sm">
              Learn how to protect yourself <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}