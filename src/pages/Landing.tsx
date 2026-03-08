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
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none grid-bg opacity-25" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Main hero area */}
          <div className="relative min-h-[80vh] flex items-center py-16">
            {/* Left text content - absolutely positioned to ensure correct placement */}
            <motion.div
              className="relative z-20 max-w-[500px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Small badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/40 mb-6">
                <Shield className="h-3 w-3 text-primary" />
                <span className="text-[11px] text-muted-foreground font-medium">Real-time phishing detection platform</span>
              </div>

              {/* Main heading */}
              <h1 className="text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight mb-5 text-foreground">
                Protect Your Inbox
                <br />
                Against Phishing
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[380px] mb-8">
                Advanced AI engine that scans and detects phishing emails in real-time. Protect your organization from sophisticated email threats.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-3 mb-6">
                <Link
                  to="/analyzer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground shadow-[var(--neon-glow)] hover:brightness-110 transition-all"
                >
                  Get Started
                </Link>
                <Link
                  to="/education"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-secondary/50 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Checkmarks */}
              <div className="flex items-center gap-5">
                {["No credit card required", "Instant results", "Free to use"].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right visual - bordered frame with orb */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-0 w-[55%] hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl border border-border/50 bg-card/20 overflow-hidden">
                {/* Grid inside frame */}
                <div className="absolute inset-0 grid-bg opacity-20" />

                {/* Glow behind orb */}
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-primary/20 blur-[100px]" />

                {/* Isometric platform SVG */}
                <svg className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[75%]" viewBox="0 0 400 220" fill="none">
                  {/* Platform base */}
                  <polygon points="200,30 370,120 200,210 30,120" fill="none" stroke="hsl(260 80% 62% / 0.15)" strokeWidth="1" />
                  <polygon points="200,35 360,120 200,205 40,120" fill="hsl(230 25% 8% / 0.6)" stroke="hsl(260 80% 62% / 0.25)" strokeWidth="0.5" />
                  
                  {/* Inner hexagonal lines */}
                  <polygon points="200,65 310,120 200,175 90,120" fill="none" stroke="hsl(260 80% 62% / 0.12)" strokeWidth="0.5" />
                  <polygon points="200,90 265,120 200,150 135,120" fill="none" stroke="hsl(260 80% 62% / 0.1)" strokeWidth="0.5" />
                  
                  {/* Connection lines */}
                  <line x1="200" y1="35" x2="200" y2="205" stroke="hsl(260 80% 62% / 0.08)" strokeWidth="0.5" />
                  <line x1="40" y1="120" x2="360" y2="120" stroke="hsl(260 80% 62% / 0.08)" strokeWidth="0.5" />
                  <line x1="120" y1="75" x2="280" y2="165" stroke="hsl(260 80% 62% / 0.06)" strokeWidth="0.5" />
                  <line x1="280" y1="75" x2="120" y2="165" stroke="hsl(260 80% 62% / 0.06)" strokeWidth="0.5" />
                  
                  {/* Node dots on vertices */}
                  {[
                    [200, 35], [360, 120], [200, 205], [40, 120],
                    [200, 65], [310, 120], [200, 175], [90, 120],
                    [200, 90], [265, 120], [200, 150], [135, 120],
                    [200, 120], [150, 97], [250, 97], [150, 143], [250, 143],
                  ].map(([cx, cy], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="3" fill="hsl(260 80% 62% / 0.5)" />
                      <circle cx={cx} cy={cy} r="1.5" fill="hsl(260 80% 62%)" />
                    </g>
                  ))}
                </svg>

                {/* Floating orb above platform */}
                <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[35%]">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div
                      className="w-full aspect-square rounded-full"
                      style={{
                        background: "radial-gradient(circle at 35% 35%, hsl(280 75% 70% / 0.8), hsl(260 80% 50% / 0.6) 40%, hsl(260 80% 30% / 0.3) 70%, transparent 100%)",
                        boxShadow: "0 0 60px 20px hsl(260 80% 62% / 0.25), 0 20px 40px -10px hsl(260 80% 62% / 0.3)",
                        filter: "blur(1px)",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Scan line animation */}
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  animate={{ top: ["20%", "80%", "20%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/20 rounded-tl" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/20 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/20 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/20 rounded-br" />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom border line */}
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
