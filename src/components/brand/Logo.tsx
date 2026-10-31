import Link from "next/link";
import styles from "./Logo.module.css";

/** Planora AI Planner brand mark and wordmark; links home. */
export function Logo({ tone = "night" }: { tone?: "night" | "ivory" }) {
  return (
    <Link href="/" className={styles.logo} data-tone={tone}>
      <svg width="32" height="32" viewBox="0 0 34 34" fill="none" aria-hidden="true" className={styles.icon}>
        <defs>
          <linearGradient id="planoraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="planoraGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="30" height="30" rx="9" fill="url(#planoraGlow)" opacity="0.2" />
        <rect x="2" y="2" width="30" height="30" rx="9" stroke="url(#planoraGrad)" strokeWidth="1.5" />
        {/* Modern Sparkle / Star Node representing AI planning */}
        <path
          d="M17 6 L19.2 13.8 L27 16 L19.2 18.2 L17 26 L14.8 18.2 L7 16 L14.8 13.8 Z"
          fill="url(#planoraGrad)"
          className={styles.sparkle}
        />
        <circle cx="24" cy="9" r="1.8" fill="#38bdf8" />
        <circle cx="10" cy="23" r="1.4" fill="#c084fc" />
      </svg>
      <span className={styles.textWrap}>
        <span className={styles.mainBrand}>Planora</span>
        <span className={styles.badge}>AI Planner</span>
      </span>
    </Link>
  );
}

