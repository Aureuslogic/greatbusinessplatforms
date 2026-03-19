"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  BarChart3,
  Users,
  Zap,
  Building2,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import styles from "./page.module.css";

/* ─── tiny hook: fires when element enters viewport ─── */
function useInView(threshold = 0.15) {
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

/* ─── animated section wrapper ─── */
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

/* ─── data ─── */
const whatWeDo = [
  {
    Icon: TrendingUp,
    title: "Capital Mobilisation",
    desc: "Connecting projects with global investors and development finance institutions to unlock the capital required for transformational infrastructure.",
  },
  {
    Icon: BarChart3,
    title: "Financial Structuring",
    desc: "Designing funding frameworks that make large-scale projects bankable and investable for institutional and sovereign stakeholders.",
  },
  {
    Icon: Users,
    title: "Strategic Advisory",
    desc: "Supporting governments and project sponsors from concept through to financing, ensuring alignment between stakeholders.",
  },
];

const sectors = [
  {
    Icon: Zap,
    title: "Energy Infrastructure",
    desc: "Financing and development of energy generation and distribution projects that power economic growth.",
  },
  {
    Icon: Building2,
    title: "Strategic Capital Projects",
    desc: "Advisory on large-scale national infrastructure initiatives that drive long-term development.",
  },
  {
    Icon: Droplets,
    title: "Water Infrastructure",
    desc: "Investment facilitation for water systems and resource management across the continent.",
  },
];

const howWeWork = [
  "Project identification and development support",
  "Financial modelling and structuring",
  "Capital mobilisation from global investors",
  "Strategic partnerships with development institutions",
];

const partners = [
  "Governments & Public Sector Agencies",
  "Development Finance Institutions",
  "Infrastructure Investors",
  "Strategic Project Sponsors",
];

/* ─── page ─── */
export default function Home() {
  return (
    <main className={styles.main}>

      {/* ══════════ HERO ══════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroNoise} />

        <div className={styles.heroContent}>
          <div className={styles.heroLine} />

          <h1 className={`${styles.heroHeading} ${styles.heroAnimate1}`}>
            Mobilising Capital for Transformational Infrastructure in{" "}
            <em>Sub-Saharan Africa</em>
          </h1>

          <p className={`${styles.heroSub} ${styles.heroAnimate2}`}>
            Great Business Platforms is a technology-enabled corporate finance boutique that works
            with governments and public sector institutions across Sub-Saharan Africa to mobilise
            and structure developmental finance — connecting governments, development finance
            institutions, and global investors.
          </p>

          <div className={`${styles.heroCta} ${styles.heroAnimate3}`}>
            <Link href="/services" className={styles.btnGold}>Our Services</Link>
            <Link href="/contact" className={styles.btnGhost}>Partner With Us</Link>
          </div>
        </div>

        <div className={styles.heroScroll}>
          <span className={styles.heroScrollDot} />
        </div>
      </section>

      {/* ══════════ WHAT WE DO ══════════ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <span className={styles.eyebrow}>Our Focus</span>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.sectionSub}>
              Great Business Platforms helps governments and institutions design, structure, and
              finance projects that deliver long-term economic value.
            </p>
          </Reveal>

          <div className={styles.cardGrid}>
            {whatWeDo.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className={styles.card}>
                  <div className={styles.cardAccent} />
                  <div className={styles.cardIcon}>
                    <Icon size={26} />
                  </div>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECTOR FOCUS ══════════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <span className={styles.eyebrow}>Industries</span>
            <h2 className={styles.sectionTitle}>Our Sector Focus</h2>
          </Reveal>

          <div className={styles.cardGrid}>
            {sectors.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className={`${styles.card} ${styles.cardBordered}`}>
                  <div className={styles.cardIcon}>
                    <Icon size={26} />
                  </div>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW WE WORK ══════════ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>

            <Reveal>
              <div className={styles.splitLeft}>
                <span className={styles.eyebrow}>Process</span>
                <h2 className={styles.sectionTitle}>How We Work</h2>
                <p className={styles.sectionSub}>
                  We collaborate with governments, development finance institutions, and private
                  sector investors to deliver projects that make a measurable impact.
                </p>
                <ul className={styles.checkList}>
                  {howWeWork.map((item) => (
                    <li key={item} className={styles.checkItem}>
                      <CheckCircle2 className={styles.checkIcon} size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardAccent} />
                <h3 className={styles.infoCardTitle}>
                  Our Role in Development Finance
                </h3>
                <p className={styles.infoCardText}>
                  Sub-Saharan Africa faces a significant gap between its infrastructure needs and
                  access to capital. Great Business Platforms bridges this gap by combining deep
                  corporate finance expertise with technology-enabled advisory platforms.
                </p>
                <p className={styles.infoCardText}>
                  We work at the intersection of public policy and private capital to structure and
                  mobilise the financing needed for transformational projects that drive economic
                  development across the continent.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════ PARTNER WITH US ══════════ */}
      <section className={styles.partnerSection}>
        <div className={styles.partnerNoise} />
        <div className={styles.container}>
          <Reveal className={styles.partnerHead}>
            <h2 className={styles.partnerTitle}>Partner With Us</h2>
            <div className={styles.partnerLine} />
            <p className={styles.partnerSub}>
              We work with a diverse range of stakeholders committed to driving infrastructure
              development across Sub-Saharan Africa.
            </p>
          </Reveal>

          <div className={styles.partnerGrid}>
            {partners.map((item, i) => (
              <Reveal key={item} delay={i * 100}>
                <div className={styles.partnerCard}>
                  <span className={styles.partnerNum}>0{i + 1}</span>
                  <p className={styles.partnerLabel}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className={styles.partnerCta}>
              <Link href="/contact" className={styles.btnGoldLg}>Get in Touch</Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}