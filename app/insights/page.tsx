"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "./data";
import styles from "./styles.module.css";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════
   Tag filter
════════════════════════════════ */
const ALL_TAGS = ["All", ...Array.from(new Set(articles.map((a) => a.tag)))];

export default function InsightsPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? articles : articles.filter((a) => a.tag === active);

  return (
    <>
      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroNoise} />
        <div className={styles.heroInner}>
          <div className={`${styles.heroBar} ${styles.a1}`} />
          <span className={`${styles.eyebrow} ${styles.a1}`}>Knowledge Base</span>
          <h1 className={`${styles.heroTitle} ${styles.a2}`}>
            Investment <em>Insights</em>
          </h1>
          <p className={`${styles.heroSub} ${styles.a3}`}>
            Guides, analysis, and strategic intelligence for investors
            exploring infrastructure opportunities across Sub-Saharan Africa.
          </p>
          {/* stats strip */}
          <div className={`${styles.heroStats} ${styles.a4}`}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>{articles.length}</span>
              <span className={styles.heroStatLabel}>Articles</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>{ALL_TAGS.length - 1}</span>
              <span className={styles.heroStatLabel}>Topics</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>SSA</span>
              <span className={styles.heroStatLabel}>Focus Region</span>
            </div>
          </div>
        </div>
        <div className={`${styles.heroScroll} ${styles.a4}`}>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ══ ARTICLE LIST ══ */}
      <section className={styles.listSection}>
        <div className={styles.container}>

          {/* tag filter bar */}
          <Reveal className={styles.filterBar}>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`${styles.filterBtn} ${active === tag ? styles.filterBtnActive : ""}`}
              >
                {tag}
              </button>
            ))}
          </Reveal>

          {/* featured article — always first visible */}
          {filtered.length > 0 && (
            <Reveal className={styles.featured}>
              <Link
                href={`/insights/${filtered[0].slug}`}
                className={styles.featuredCard}
              >
                <div className={styles.featuredAccent} />
                <div className={styles.featuredInner}>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredTag}>{filtered[0].tag}</span>
                    <span className={styles.featuredNum}>{filtered[0].num} / 0{articles.length}</span>
                  </div>
                  <h2 className={styles.featuredTitle}>{filtered[0].title}</h2>
                  <p className={styles.featuredIntro}>{filtered[0].intro}</p>
                  <span className={styles.featuredLink}>
                    Read article <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* remaining articles grid */}
          {filtered.length > 1 && (
            <div className={styles.grid}>
              {filtered.slice(1).map((article, i) => (
                <Reveal key={article.slug} delay={i * 80}>
                  <Link
                    href={`/insights/${article.slug}`}
                    className={styles.card}
                  >
                    <div className={styles.cardTop} />
                    <div className={styles.cardHead}>
                      <span className={styles.cardNum}>{article.num}</span>
                      <span className={styles.cardTag}>{article.tag}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardIntro}>{article.intro}</p>
                    <span className={styles.cardLink}>
                      Read article <ArrowRight size={13} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {/* empty state */}
          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No articles found for this topic.</p>
            </div>
          )}

        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaNoise} />
        <div className={styles.container}>
          <Reveal className={styles.ctaInner}>
            <div className={styles.ctaRule} />
            <h2 className={styles.ctaTitle}>Ready to Invest in Africa?</h2>
            <p className={styles.ctaSub}>
              Talk to our team about structured infrastructure investment
              opportunities across Sub-Saharan Africa.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact"          className={styles.btnGold}>Get in Touch</Link>
              <Link href="/invest-in-africa" className={styles.btnGhost}>Invest in Africa</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}