import { motion } from "framer-motion";

interface RiskGaugeProps {
  score: number;
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  const getColor = () => {
    if (score <= 30) return "hsl(var(--safe))";
    if (score <= 60) return "hsl(var(--suspicious))";
    return "hsl(var(--destructive))";
  };

  const getLabel = () => {
    if (score <= 30) return "Safe";
    if (score <= 60) return "Suspicious";
    return "Phishing";
  };

  const angle = (score / 100) * 180;
  const color = getColor();

  // SVG arc
  const radius = 80;
  const cx = 100;
  const cy = 95;
  const startAngle = -180;
  const endAngle = startAngle + angle;

  const polarToCartesian = (a: number) => ({
    x: cx + radius * Math.cos((a * Math.PI) / 180),
    y: cy + radius * Math.sin((a * Math.PI) / 180),
  });

  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArc = angle > 180 ? 1 : 0;

  const bgStart = polarToCartesian(-180);
  const bgEnd = polarToCartesian(0);

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">
        {/* Background arc */}
        <path
          d={`M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 1 1 ${bgEnd.x} ${bgEnd.y}`}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <motion.path
          d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
        <text x="100" y="80" textAnchor="middle" fill={color} fontSize="32" fontWeight="bold" fontFamily="Inter">
          {score}
        </text>
        <text x="100" y="105" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" fontFamily="Inter">
          / 100
        </text>
      </svg>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-bold mt-1"
        style={{ color }}
      >
        {getLabel()}
      </motion.span>
    </div>
  );
}
