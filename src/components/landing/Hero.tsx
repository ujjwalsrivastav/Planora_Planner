import { PatternBackground } from "@/components/brand/PatternBackground";
import styles from "./Hero.module.css";
import { HeroBrief } from "./HeroBrief";
import { PlanPreview } from "./PlanPreview";

const HEADLINE = ["Every celebration,", "masterfully planned,", "flawlessly executed."];

/** Headline, interactive 3D pattern background, one-line brief input and 3D preview card. */
export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <PatternBackground />
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <div className={styles.kickerWrap}>
          <span className={styles.kickerBadge}>Next-Gen AI Event Intelligence</span>
          <span className={styles.browserBadge}>Instant Access · Zero Sign-Up</span>
          <p className={styles.kicker}>Intelligent celebration planning powered by Gemini</p>
        </div>
        <h1 id="hero-title" className={styles.title}>
          {HEADLINE.map((line) => (
            <span key={line} className={styles.line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className={styles.lead}>
          The unified workspace for weddings, milestone birthdays, and community gatherings.
          Share your vision in plain words — Planora AI Planner instantly orchestrates your budget,
          chronological milestones, vendor checklists, and creative direction in real time.
        </p>
        <div className={styles.statsPillGroup}>
          <div className={styles.statPill}>
            <strong>87%</strong>
            <span>Budget Optimized</span>
          </div>
          <div className={styles.statPill}>
            <strong>100%</strong>
            <span>Timeline Precision</span>
          </div>
          <div className={styles.statPill}>
            <strong>Real-Time</strong>
            <span>Collaborative Co-Planner</span>
          </div>
          <div className={styles.statPill}>
            <strong>10+</strong>
            <span>Languages</span>
          </div>
        </div>
        <HeroBrief />
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.cardGlowRing} aria-hidden="true" />
        <PlanPreview />
      </div>
    </section>
  );
}


