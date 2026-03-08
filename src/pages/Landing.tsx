import { Link } from "react-router-dom";
import { Shield, Search, FileText, Zap, Globe, BarChart3, AlertTriangle, Lock, ChevronRight, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import heroOrb from "@/assets/hero-orb.png";

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
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-bg opacity-30" />
          {/* Subtle glow behind the visual */}
          <div className="absolute top-[40%] right-[15%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[160px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center max-w-6xl mx-auto">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-secondary/50 mb-7">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground font-medium">Real-time phishing detection</span>
              </div>

              {/* Heading */}
              <h1 className="text-[2.6rem] md:text-5xl lg:text-[3.3rem] font-extrabold leading-[1.08] tracking-tight mb-5">
                <span className="text-foreground">Protect Your Inbox</span>
                <br />
                <span className="text-foreground">Against </span>
                <span className="gradient-text">Phishing</span>
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-[15px] max-w-[420px] leading-relaxed mb-8">
                Advanced AI that detects phishing emails in real-time. Simply paste suspicious content and get instant threat analysis.
              </p>

              {/* Buttons */}
              <div className="flex flex-row gap-3 mb-8">
                <Link
                  to="/analyzer"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm bg-primary text-primary-foreground shadow-[var(--neon-glow)] hover:brightness-110 transition-all"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/education"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-medium text-sm border border-border text-foreground hover:bg-secondary/60 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Check features */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {["No credit card required", "Instant analysis", "Free to use"].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual with border frame */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Bordered frame container */}
              <div className="relative w-full max-w-[520px] aspect-square rounded-2xl border border-border/60 bg-card/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-primary/10 blur-[80px]" />
                </div>

                {/* Grid inside frame */}
                <div className="absolute inset-0 grid-bg opacity-20" />

                {/* Orb image */}
                <motion.img
                  src={heroOrb}
                  alt="AI Security Shield"
                  className="relative z-10 w-[85%] max-w-[400px] drop-shadow-[0_0_40px_hsl(260_80%_62%_/_0.25)]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/30 rounded-tl-md" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/30 rounded-tr-md" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/30 rounded-bl-md" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/30 rounded-br-md" />
              </div>
            </motion.div>
          </div>

          {/* Trusted by */}
          <motion.div
            className="mt-20 pt-8 border-t border-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <p className="text-center text-[11px] text-muted-foreground/50 uppercase tracking-[0.18em] font-medium mb-5">
              Guarding The Industry's Top Apps And Games,
              {" "}From Innovative Startups To Renowned Enterprises.
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-14">
              {[
                { icon: "△", name: "Unity" },
                { icon: "◈", name: "Ubisoft" },
                { icon: "", name: "Apple" },
                { icon: "∞", name: "Meta" },
              ].map((item, i) => (
                <span key={i} className="text-muted-foreground/30 font-semibold text-xs tracking-wider flex items-center gap-1.5">
                  <span className="text-base">{item.icon}</span> {item.name}
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
