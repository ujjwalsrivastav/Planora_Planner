import styles from "./SentenceDemo.module.css";

const BRIEF = [
  { field: "type", label: "Celebration", value: "Wedding" },
  { field: "guests", label: "Guests", value: "300" },
  { field: "city", label: "City", value: "Hyderabad" },
  { field: "date", label: "Date", value: "February 2027" },
  { field: "budget", label: "Budget", value: "₹25,00,000" },
  { field: "traditions", label: "Traditions", value: "Haldi, Sangeet" },
];

/**
 * Natural Language Prompt to Structured Event Blueprint.
 * LandingMotion scrubs the highlight on scroll.
 */
export function SentenceDemo() {
  return (
    <section className={styles.demo} aria-labelledby="demo-title" data-demo="">
      <div className={`container ${styles.demoInner}`}>
        <h2 id="demo-title" className={styles.demoTitle}>
          One sentence transforms into a complete event blueprint.
        </h2>
        <p className={styles.demoLead}>
          Express your ideas naturally in English, Hindi, or Hinglish. Our Gemini intelligence
          extracts key constraints, dates, guest counts, and traditions to assemble your foundation
          in seconds.
        </p>
        <p className={styles.sentence}>
          A <mark data-token="guests">300-guest</mark> <mark data-token="type">Telugu wedding</mark>{" "}
          in <mark data-token="city">Hyderabad</mark> <mark data-token="date">next February</mark>,{" "}
          <mark data-token="budget">₹25 lakh</mark>, with{" "}
          <mark data-token="traditions">haldi and sangeet</mark>.
        </p>
        <dl className={styles.fields}>
          {BRIEF.map((f) => (
            <div key={f.field} data-field={f.field}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

