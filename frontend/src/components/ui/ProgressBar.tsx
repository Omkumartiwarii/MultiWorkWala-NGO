import { motion, useReducedMotion } from "motion/react";

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  label: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-ink-600">{label}</span>
        <span className="font-semibold text-navy-900">{clamped}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className="h-2 overflow-hidden rounded-full bg-navy-900/10"
      >
        {reduceMotion ? (
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${clamped}%` }} />
        ) : (
          <motion.div
            className="h-full rounded-full bg-brand-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${clamped}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>
    </div>
  );
}
