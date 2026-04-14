import { useState, useEffect } from "react";
import { Shield, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [isSignup, setIsSignup] = useState(searchParams.get("mode") === "signup");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Sync state with URL params
  useEffect(() => {
    const mode = new URLSearchParams(location.search).get("mode");
    setIsSignup(mode === "signup");
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const payload = isSignup ? { email, password, name } : { email, password };
      
      const res = await api.post(endpoint, payload);
      
      if (!res?.token) throw new Error("Invalid server response");
      
      localStorage.setItem("phishguard_token", res.token);
      localStorage.setItem("phishguard_user", JSON.stringify(res.user));
      
      toast.success(isSignup ? "Account created successfully!" : "Welcome back!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 neon-text mx-auto mb-4" />
          <h1 className="text-2xl font-bold">{isSignup ? "Create Your Account" : "Welcome Back"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignup ? "Start protecting your inbox today" : "Continue your phishing protection"}
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-[var(--neon-glow)] hover:shadow-[var(--neon-glow-strong)] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isSignup ? "Create Account" : "Sign In")} 
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already protecting your inbox?" : "New to PhishGuard AI?"}{" "}
            <button 
              onClick={() => navigate(isSignup ? "/login" : "/login?mode=signup")} 
              className="text-primary hover:underline font-medium"
            >
              {isSignup ? "Sign In" : "Create a Free Account"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
