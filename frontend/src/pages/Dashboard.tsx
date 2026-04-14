import { useState, useEffect, useMemo } from "react";
import { Shield, AlertTriangle, XCircle, Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("phishguard_user");
        let user = null;
        try { user = userStr ? JSON.parse(userStr) : null; } catch { user = null; }
        const params = user ? { userId: user.id } : undefined;

        const [statsData, historyData] = await Promise.all([
          api.get("/scans/stats", params),
          api.get("/scans", params)
        ]);
        setStats(statsData);
        setHistory(historyData);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pieData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: "Safe", value: stats.safe || 0, color: "hsl(var(--safe))" },
      { name: "Suspicious", value: stats.suspicious || 0, color: "hsl(var(--suspicious))" },
      { name: "Phishing", value: stats.phishing || 0, color: "hsl(var(--destructive))" },
    ].filter((d) => d.value > 0 || d.name === "Safe");
  }, [stats]);

  const barData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });
    return days.map((day) => {
      const dayItems = history.filter((h: any) => h.date?.slice(0, 10) === day);
      const [year, month, dayOnly] = day.split("-");
      return {
        day: `${dayOnly}-${month}`,
        Safe: dayItems.filter((h: any) => h.classification === "Safe").length,
        Suspicious: dayItems.filter((h: any) => h.classification === "Suspicious").length,
        Phishing: dayItems.filter((h: any) => h.classification === "Phishing").length,
      };
    });
  }, [history]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    { label: "Emails Scanned", value: stats?.total || 0, icon: Mail, color: "neon-text" },
    { label: "Safe Emails", value: stats?.safe || 0, icon: Shield, color: "text-safe" },
    { label: "Suspicious", value: stats?.suspicious || 0, icon: AlertTriangle, color: "text-suspicious" },
    { label: "Phishing Detected", value: stats?.phishing || 0, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-10 gradient-text">
        Security Dashboard
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <span className="text-3xl font-bold">{s.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="font-semibold mb-6">Threat Distribution</h3>
          {stats?.total > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} strokeWidth={2} stroke="hsl(var(--background))">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">No data yet. Analyze some emails first.</div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-semibold mb-6">7-Day Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="Safe" fill="hsl(var(--safe))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Suspicious" fill="hsl(var(--suspicious))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Phishing" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
