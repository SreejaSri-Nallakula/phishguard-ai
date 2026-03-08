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

const trustedBy = ["Google", "Microsoft", "Amazon", "Meta", "Stripe"];

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-40">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-6"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                AI-Powered Protection
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-foreground">Stop Phishing</span>
                <br />
                <span className="text-foreground">Emails With </span>
                <span className="gradient-text">AI</span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Enterprise-grade email threat detection powered by advanced machine learning. Analyze suspicious emails instantly and protect your organization.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/analyzer" className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold bg-primary text-primary-foreground shadow-[var(--neon-glow-strong)] hover:opacity-90 transition-all">
                  Start Free Analysis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/education" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-medium border border-border text-foreground hover:bg-muted transition-colors">
                  How It Works
                </Link>
              </motion.div>

              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                {["No signup required — paste & scan instantly", "99.2% phishing detection accuracy", "Trusted by 50,000+ security professionals"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-safe flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Visual mock */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                {/* Email card mock */}
                <motion.div
                  className="glass-card p-6 rounded-2xl border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                    <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Suspicious Email Detected</div>
                      <div className="text-xs text-muted-foreground">From: support@paypa1-secure.com</div>
                    </div>
                    <div className="ml-auto px-2.5 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                      High Risk
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Threat Score</span>
                      <span className="font-bold text-destructive">92/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-destructive"
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Spoofed Domain", status: "danger" },
                      { label: "Urgency Tactics", status: "danger" },
                      { label: "Suspicious Links", status: "warning" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2.5 text-sm py-1.5"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
                      >
                        <AlertTriangle className={`h-3.5 w-3.5 flex-shrink-0 ${item.status === "danger" ? "text-destructive" : "text-suspicious"}`} />
                        <span className="text-foreground">{item.label}</span>
                        <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                          item.status === "danger" ? "bg-destructive/10 text-destructive" : "bg-suspicious/10 text-suspicious"
                        }`}>
                          Detected
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating notification */}
                <motion.div
                  className="absolute -top-4 -right-4 glass-card px-4 py-2.5 rounded-xl border border-safe/20 shadow-[var(--safe-glow)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-safe" />
                    <span className="text-xs font-semibold text-foreground">Threat Blocked</span>
                  </div>
                </motion.div>

                {/* Floating scan badge */}
                <motion.div
                  className="absolute -bottom-3 -left-3 glass-card px-4 py-2.5 rounded-xl border border-primary/20 shadow-[var(--neon-glow)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">AI Scan Complete</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Trusted by */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-5">Trusted by teams at</p>
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              {trustedBy.map((name, i) => (
                <span key={i} className="text-sm font-semibold text-muted-foreground/50 tracking-wide">{name}</span>
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
