import { Link } from "react-router-dom";
import { Shield, Search, FileText, Zap, Globe, BarChart3, AlertTriangle, Lock, ChevronRight, Mail, CheckCircle2, ArrowRight } from "lucide-react";
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

const logoNames = [
  { name: "Google", icon: "G" },
  { name: "Microsoft", icon: "M" },
  { name: "Apple", icon: "" },
  { name: "Meta", icon: "∞" },
];

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Dark background with gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large purple orb - center right */}
          <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px]" />
          {/* Secondary accent orb */}
          <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent/10 blur-[120px]" />
          {/* Bottom subtle glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/5 blur-[100px]" />
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Left content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm text-primary font-medium">Real-time threat detection</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-6"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="text-foreground">Protect Your Inbox</span>
                <br />
                <span className="text-foreground">Against </span>
                <span className="gradient-text">Phishing</span>
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-base md:text-lg max-w-[460px] leading-relaxed mb-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                AI-powered email security that detects and blocks sophisticated phishing threats before they reach you. Paste, scan, and stay safe.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 mb-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  to="/analyzer"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground shadow-[var(--neon-glow-strong)] hover:brightness-110 transition-all"
                >
                  Start Scanning
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/education"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {[
                  { val: "99.2%", label: "Accuracy" },
                  { val: "< 2s", label: "Scan Speed" },
                  { val: "50K+", label: "Threats Blocked" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-lg font-bold text-foreground">{s.val}</span>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - 3D-style visual */}
            <motion.div
              className="relative hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-[420px] aspect-square">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-primary/10" />
                <div className="absolute inset-4 rounded-full border border-primary/15" />
                <div className="absolute inset-10 rounded-full border border-primary/20" />

                {/* Center glowing orb */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
                  style={{
                    background: "radial-gradient(circle, hsl(260 80% 62% / 0.6) 0%, hsl(280 75% 60% / 0.3) 40%, transparent 70%)",
                    boxShadow: "0 0 80px 30px hsl(260 80% 62% / 0.2)",
                  }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Shield center icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="h-16 w-16 text-primary drop-shadow-[0_0_20px_hsl(260_80%_62%_/_0.6)]" />
                </motion.div>

                {/* Orbiting elements */}
                <motion.div
                  className="absolute top-6 right-12 glass-card px-3 py-2 rounded-lg border-primary/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-destructive" />
                    <span className="text-[11px] font-medium text-foreground">Threat Found</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-12 left-4 glass-card px-3 py-2 rounded-lg border-safe/20"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-safe" />
                    <span className="text-[11px] font-medium text-foreground">Email Safe</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-2 glass-card px-3 py-2 rounded-lg border-primary/20"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-medium text-foreground">Scanning...</span>
                  </div>
                </motion.div>

                {/* Dotted orbit path */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 420 420">
                  <circle cx="210" cy="210" r="160" fill="none" stroke="hsl(260 80% 62%)" strokeWidth="0.5" strokeDasharray="4 6" />
                  <circle cx="210" cy="210" r="120" fill="none" stroke="hsl(260 80% 62%)" strokeWidth="0.5" strokeDasharray="3 5" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Trusted by bar */}
          <motion.div
            className="mt-20 pt-10 border-t border-border/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p className="text-center text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium mb-6">
              Guarding The Industry's Top Apps And Games,
              <br className="sm:hidden" />
              {" "}From Innovative Startups To Renowned Enterprises.
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-16">
              {logoNames.map((item, i) => (
                <span key={i} className="text-muted-foreground/40 font-semibold text-sm tracking-wide flex items-center gap-1.5">
                  <span className="text-lg">{item.icon}</span> {item.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
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

      {/* Features */}
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

      {/* Danger Section */}
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
