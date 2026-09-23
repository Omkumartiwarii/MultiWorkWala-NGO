import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { formatNumber } from "@/utils/format";

interface ImpactCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Counts up to `value` when scrolled into view. Screen readers get the final figure immediately. */
export function ImpactCounter({ value, suffix = "", className }: ImpactCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {formatNumber(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {formatNumber(value)}
        {suffix}
      </span>
    </span>
  );
}
