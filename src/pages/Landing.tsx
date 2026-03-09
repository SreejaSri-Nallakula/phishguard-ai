import { Link } from "react-router-dom";
import { Shield, Search, FileText, Zap, Globe, BarChart3, AlertTriangle, Lock, ChevronRight, ArrowRight, Check, Mail, ShieldAlert, ShieldCheck, Eye } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const heroCards = [
  { icon: ShieldAlert, label: "Phishing Detected", color: "from-red-500 to-orange-500", rotate: "-12deg", detail: "Suspicious sender + urgency tactics" },
  { icon: Mail, label: "Email Scanned", color: "from-primary to-accent", rotate: "-6deg", detail: "AI analysis in 2.3 seconds" },
  { icon: Eye, label: "Link Analysis", color: "from-violet-500 to-purple-600", rotate: "0deg", detail: "3 malicious URLs found" },
  { icon: ShieldCheck, label: "Safe Email", color: "from-emerald-500 to-teal-500", rotate: "6deg", detail: "No threats detected" },
  { icon: AlertTriangle, label: "Threat Alert", color: "from-amber-500 to-red-500", rotate: "12deg", detail: "Domain spoofing attempt" },
];

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
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(260,30%,15%)] via-[hsl(260,25%,20%)] to-[hsl(260,20%,25%)]">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Text content */}
          <div className="flex flex-col items-center text-center pt-24 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[700px]"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs text-white/60 font-medium">AI-Powered Email Security</span>
              </div>

              <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight mb-6">
                <span className="text-white">Less phishing, </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-primary-foreground">more security.</span>
                <br />
                <span className="text-white">Protect your inbox</span>
              </h1>

              <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-[520px] mx-auto mb-10">
                Advanced AI that detects phishing emails, scans malicious links, and keeps your organization safe — all in real-time.
              </p>

              <Link
                to="/analyzer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_0_30px_hsl(152,69%,40%/0.3)] hover:shadow-[0_0_40px_hsl(152,69%,40%/0.5)] hover:brightness-110 transition-all"
              >
                Start Analyzing for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Tilted cards row */}
          <div className="relative flex items-end justify-center gap-4 md:gap-6 pb-16 pt-8 overflow-hidden">
            {heroCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="relative w-[140px] md:w-[180px] h-[200px] md:h-[260px] rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl"
                style={{ transform: `rotate(${card.rotate})`, transformOrigin: "bottom center" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                  <card.icon className="h-10 w-10 md:h-12 md:w-12 mb-3 drop-shadow-lg" />
                  <span className="text-xs md:text-sm font-bold mb-1">{card.label}</span>
                  <span className="text-[10px] md:text-xs text-white/70 leading-tight">{card.detail}</span>
                </div>
              </motion.div>
            ))}
            {/* Fade overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(260,20%,25%)] to-transparent pointer-events-none" />
          </div>
        </div>
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
