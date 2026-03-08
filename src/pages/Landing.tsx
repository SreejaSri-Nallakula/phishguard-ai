import { Link } from "react-router-dom";
import { Shield, Search, FileText, Zap, Globe, BarChart3, AlertTriangle, Lock, ChevronRight } from "lucide-react";
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

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-40">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[140px] animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[120px] animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/4 blur-[100px]" />
        </div>

        {/* Floating shield icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-[15%] opacity-[0.07]"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="h-16 w-16 text-primary" />
          </motion.div>
          <motion.div
            className="absolute top-32 right-[18%] opacity-[0.06]"
            animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Lock className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.div
            className="absolute bottom-24 left-[22%] opacity-[0.05]"
            animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <AlertTriangle className="h-14 w-14 text-destructive" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Email Security
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="gradient-text">AI Phishing</span>
              <br />
              <span className="text-foreground">Email Detector</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Protect yourself from phishing attacks using intelligent AI email analysis. Detect threats before they reach you.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <Link to="/analyzer" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground shadow-[var(--neon-glow-strong)] hover:shadow-[var(--neon-glow)] transition-all hover:scale-105">
                Start Scanning <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/education" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold border border-border text-foreground hover:bg-secondary/50 transition-all hover:scale-105">
                Learn About Phishing
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              {[
                { value: "99.2%", label: "Detection Rate" },
                { value: "< 2s", label: "Scan Speed" },
                { value: "50K+", label: "Threats Blocked" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
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
