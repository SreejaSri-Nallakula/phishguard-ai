import { Shield, AlertTriangle, Eye, Lock, Mail, Globe, FileWarning, UserX } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const tactics = [
  { icon: Mail, title: "Email Spoofing", desc: "Attackers forge email headers to appear as trusted senders like banks or employers." },
  { icon: Globe, title: "Fake Websites", desc: "Phishing links lead to cloned websites designed to steal your login credentials." },
  { icon: FileWarning, title: "Malicious Attachments", desc: "Documents or files containing malware that infects your device when opened." },
  { icon: UserX, title: "Social Engineering", desc: "Manipulating emotions like fear or urgency to trick victims into acting quickly." },
];

const identifiers = [
  "Generic greetings like 'Dear Customer' instead of your name",
  "Urgent language demanding immediate action",
  "Misspelled sender domains (e.g., paypa1.com instead of paypal.com)",
  "Requests for sensitive information like passwords or SSN",
  "Suspicious links that don't match the supposed sender",
  "Poor grammar and spelling errors",
  "Threats of account suspension or legal action",
  "Offers that seem too good to be true",
];

const safetyTips = [
  { icon: Eye, title: "Verify the Sender", desc: "Always check the sender's email address carefully. Look for misspellings or unusual domains." },
  { icon: Lock, title: "Enable 2FA", desc: "Use two-factor authentication on all important accounts to add an extra layer of security." },
  { icon: Shield, title: "Use Security Software", desc: "Keep antivirus and anti-phishing tools updated on all your devices." },
  { icon: AlertTriangle, title: "Report Phishing", desc: "Forward suspicious emails to your IT department or report them to the email provider." },
];

export default function Education() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Phishing Education Center</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Learn how to identify and protect yourself from phishing attacks</p>
      </motion.div>

      {/* What is Phishing */}
      <motion.section {...fadeUp} className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-suspicious" /> What is Phishing?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Phishing is a type of cyberattack where criminals send fraudulent communications that appear to come from legitimate sources. The goal is to steal sensitive data like login credentials, credit card numbers, or install malware on the victim's device. Phishing attacks most commonly arrive via email but can also come through text messages, phone calls, or social media.
        </p>
      </motion.section>

      {/* Common Tactics */}
      <motion.section {...fadeUp} className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Common Phishing Tactics</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tactics.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6">
              <t.icon className="h-8 w-8 neon-text mb-3" />
              <h3 className="font-semibold mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How to Identify */}
      <motion.section {...fadeUp} className="glass-card p-8 mb-8 border-suspicious/20">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Eye className="h-6 w-6 text-suspicious" /> How to Identify Fake Emails
        </h2>
        <ul className="space-y-3">
          {identifiers.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-suspicious mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Stay Safe */}
      <motion.section {...fadeUp}>
        <h2 className="text-2xl font-bold mb-6">How to Stay Safe Online</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {safetyTips.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6">
              <t.icon className="h-8 w-8 text-safe mb-3" />
              <h3 className="font-semibold mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
