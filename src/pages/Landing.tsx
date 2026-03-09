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
      <section className="relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/8 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-accent/8 blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        {/* Floating badges */}
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            className="absolute hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs text-muted-foreground shadow-sm z-10"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: item.delay }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              className="flex items-center gap-2"
            >
              <item.icon className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{item.label}</span>
            </motion.div>
          </motion.div>
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[85vh] py-16">
            <motion.div
              className="relative z-20 max-w-[620px] text-center mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Animated badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/40 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="h-3.5 w-3.5 text-primary" />
                </motion.div>
                <span className="text-[11px] text-muted-foreground font-medium">Real-time phishing detection platform</span>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-safe"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              <h1 className="text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] font-extrabold leading-[1.05] tracking-tight mb-5 text-foreground">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="block"
                >
                  Protect Your Inbox
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="block gradient-text"
                >
                  Against Phishing
                </motion.span>
              </h1>

              <motion.p
                className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[440px] mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Advanced AI engine that scans and detects phishing emails in real-time. Protect your organization from sophisticated email threats.
              </motion.p>

              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/analyzer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground shadow-[var(--neon-glow)] hover:shadow-[var(--neon-glow-strong)] hover:brightness-110 transition-all"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/education"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-secondary/50 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {["No credit card required", "Instant results", "Free to use"].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>

              {/* Decorative gradient line */}
              <motion.div
                className="mt-12 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
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