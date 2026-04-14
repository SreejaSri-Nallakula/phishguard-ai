import { Shield, Menu, X, User, LogOut, Camera, Loader2, MoreHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/analyzer", label: "Analyzer" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/history", label: "History" },
  { path: "/education", label: "Education" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("phishguard_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("phishguard_token");
    localStorage.removeItem("phishguard_user");
    setUser(null);
    setUserDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setUploading(true);
      try {
        const res = await api.put("/auth/profile", { 
          name: user.name, 
          profileImage: base64String 
        });
        localStorage.setItem("phishguard_user", JSON.stringify(res.user));
        setUser(res.user);
        toast.success("Profile picture updated!");
      } catch (error: any) {
        toast.error(error.message || "Failed to upload image");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 neon-text" />
            <span className="text-lg font-bold gradient-text">PhishGuard AI</span>
          </Link>

          {/* Desktop Nav shifted to corner - handled in the right-side container below */}

          <div className="flex items-center gap-1 md:gap-2">
            {!user && (
              <div className="hidden md:flex items-center gap-1">
                <Link
                  to="/education"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === "/education" ? "bg-primary/10 neon-text" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  Education
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary/10 neon-text neon-border hover:bg-primary/20 transition-all ml-1"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {user && (
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary/10 neon-text neon-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            
            {user && (
              <div className="relative ml-1" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border overflow-hidden hover:border-primary transition-colors flex items-center justify-center bg-secondary/30"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.92, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="absolute right-0 mt-3 w-64 glass-card p-2 shadow-2xl z-[60] border border-white/10"
                    >
                      {/* User Header Section */}
                      <div className="px-4 py-4 mb-2 flex flex-col items-center text-center bg-white/5 rounded-xl border border-white/5">
                        <div className="w-16 h-16 rounded-full border-2 border-primary/30 overflow-hidden mb-3 shadow-inner bg-secondary/30 relative group">
                          {user.profileImage ? (
                            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10">
                              <User className="h-8 w-8 text-primary" />
                            </div>
                          )}
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Camera className="h-5 w-5 text-white" />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-foreground truncate w-full px-2">{user.name || "User"}</h4>
                        <p className="text-[11px] text-muted-foreground truncate w-full px-2">{user.email}</p>
                      </div>
                      
                      {/* Action Menu Items */}
                      <div className="space-y-1">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:neon-text transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4 group-hover:scale-110 transition-transform" />}
                          </div>
                          <span className="font-medium">Update Photo</span>
                        </button>
                        
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-destructive/5 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                            <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                          </div>
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button className="md:hidden text-foreground ml-1" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="p-4 flex flex-col gap-2">
                {navItems
                  .filter((item) => {
                    if (!user) return item.path === "/education";
                    return true;
                  })
                  .map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        location.pathname === item.path ? "bg-primary/10 neon-text" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                {!user && (
                  <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                    <Link
                      to="/education"
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === "/education" ? "bg-primary/10 neon-text" : "text-muted-foreground"}`}
                    >
                      Education
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground"
                    >
                      Login
                    </Link>
                    <Link
                      to="/login?mode=signup"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3 px-4 mb-4">
                      <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-secondary/30 flex items-center justify-center">
                        {user.profileImage ? <img src={user.profileImage} alt="" className="w-full h-full object-cover" /> : <User className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{user.name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" /> 
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-4 w-4 neon-text" />
            <span className="font-semibold gradient-text">PhishGuard AI</span>
          </div>
          <p>© 2026 PhishGuard AI. Intelligent Email Phishing Detection Platform.</p>
        </div>
      </footer>
    </div>
  );
}
