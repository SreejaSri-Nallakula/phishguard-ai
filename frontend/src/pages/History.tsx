import { useState, useEffect } from "react";
import { Clock, Eye, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnalysisReport from "@/components/AnalysisReport";
import { api } from "@/lib/api";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<any | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userStr = localStorage.getItem("phishguard_user");
        const user = userStr ? JSON.parse(userStr) : null;
        const params = user ? { userId: user.id } : undefined;
        
        const data = await api.get("/scans", params);
        setHistory(data.map((item: any) => ({
          ...item,
          result: JSON.parse(item.resultJson)
        })));
      } catch (error) {
        console.error("History Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const clearHistory = () => {
    setHistory([]);
  };

  const classColors: Record<string, string> = { Safe: "text-safe", Suspicious: "text-suspicious", Phishing: "text-destructive" };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold gradient-text">
          Scan History
        </motion.h1>
        {history.length > 0 && (
          <button onClick={clearHistory} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all">
            <Trash2 className="h-4 w-4" /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No scan history yet. Analyze an email to get started.</p>
        </motion.div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-6 py-4 font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Risk Score</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Domain</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold">{item.riskScore}</td>
                    <td className={`px-6 py-4 font-semibold ${classColors[item.classification] || ""}`}>{item.classification}</td>
                    <td className="px-6 py-4 font-mono text-xs">{item.domain}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => setViewing(item)} className="inline-flex items-center gap-1 text-primary hover:underline text-xs">
                        <Eye className="h-3 w-3" /> View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {viewing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-20 overflow-y-auto">
            <div className="max-w-3xl w-full mx-4 pb-20">
              <button onClick={() => setViewing(null)} className="mb-4 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-all">
                ← Back to History
              </button>
              <AnalysisReport result={viewing.result} emailContent={viewing.snippet} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
