"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Zap, Landmark, Droplets, ChevronDown, ArrowRight } from "lucide-react";
import styles from "./styles.module.css";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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


function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}>
      <button
        className={styles.faqQ}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          size={18}
          className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`}
        />
      </button>
      <div className={styles.faqAnswer} aria-hidden={!open}>
        <p className={styles.faqAnswerText}>{a}</p>
      </div>
    </div>
  );
}

const SECTORS = [
  {
    icon: Zap,
    number: "01",
    id: "energy",
    label: "Energy",
    title: "Energy Infrastructure in Africa",
    subtitle: "Powering the continent's growth",
    text: "Energy is foundational to economic development. Great Business Platforms supports the development and financing of energy generation, transmission, and distribution projects across Sub-Saharan Africa — from renewable energy initiatives to grid modernisation and electrification programmes. We work with governments, utilities, and investors to structure projects that attract the capital needed to power economic growth and improve energy access for communities across the continent.",
    stats: [
      { value: "600M+", label: "People without electricity access in Africa" },
      { value: "$140B", label: "Annual energy investment gap in SSA" },
      { value: "3×", label: "Growth needed in installed capacity by 2040" },
    ],
  },
  {
    icon: Landmark,
    number: "02",
    id: "capital",
    label: "Capital Projects",
    title: "Strategic Capital Projects in Africa",
    subtitle: "Infrastructure that transforms nations",
    text: "Strategic capital projects — from transport corridors and industrial zones to digital infrastructure and special economic zones — are the backbone of long-term national development. Great Business Platforms advises on the structuring, positioning, and financing of nationally significant projects that drive economic transformation, attract foreign direct investment, and create the foundations for sustainable growth.",
    stats: [
      { value: "$68B", label: "Annual infrastructure financing gap in Africa" },
      {
        value: "4.5%",
        label: "Average GDP uplift from infrastructure investment",
      },
      { value: "1.5B+", label: "Population to be served by 2050" },
    ],
  },
  {
    icon: Droplets,
    number: "03",
    id: "water",
    label: "Water",
    title: "Water Infrastructure in Africa",
    subtitle: "Clean water, sustainable development",
    text: "Access to clean water and reliable water systems is critical to public health, agricultural productivity, and sustainable development. Great Business Platforms facilitates investment in water supply, treatment, and distribution infrastructure — working with governments and development partners to structure and finance projects that address one of Africa's most pressing development challenges.",
    stats: [
      { value: "400M+", label: "People lacking safe drinking water in SSA" },
      {
        value: "80%",
        label: "Of diseases in developing nations are water-related",
      },
      { value: "$30B", label: "Annual water infrastructure investment needed" },
    ],
  },
];

const FAQS = [
  {
    q: "What sectors does Great Business Platforms focus on?",
    a: "We focus on energy infrastructure, strategic capital projects, and water infrastructure — sectors essential to long-term national growth across Sub-Saharan Africa.",
  },
  {
    q: "Why does Great Business Platforms focus on these sectors?",
    a: "These sectors represent the highest-impact opportunities for developmental finance in Africa, where better financial structuring and capital mobilisation can make the greatest difference to national development.",
  },
  {
    q: "Does Great Business Platforms support energy infrastructure?",
    a: "Yes. We support the development and financing of energy generation, transmission, and distribution projects across Sub-Saharan Africa, working with governments, utilities, and global investors.",
  },
  {
    q: "Does Great Business Platforms support water infrastructure?",
    a: "Yes. We facilitate investment in water supply, treatment, and distribution infrastructure, helping governments and development partners finance projects that address critical water challenges across the continent.",
  },
];


export default function SectorsPage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroNoise} />
        <div className={styles.heroInner}>
          <div className={`${styles.heroBar} ${styles.a1}`} />
          <span className={`${styles.eyebrow} ${styles.a1}`}>
            Where We Work
          </span>
          <h1 className={`${styles.heroTitle} ${styles.a2}`}>
            Our Sector <em>Focus</em>
          </h1>
          <p className={`${styles.heroSub} ${styles.a3}`}>
            We focus on sectors essential to long-term national growth, economic
            resilience, and sustainable development across Sub-Saharan Africa.
          </p>

          {/* sector anchor cards */}
          <div className={`${styles.sectorAnchors} ${styles.a4}`}>
            {SECTORS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={styles.anchorCard}>
                <div className={styles.anchorIcon}>
                  <s.icon size={20} />
                </div>
                <span className={styles.anchorLabel}>{s.label}</span>
                <span className={styles.anchorNum}>{s.number}</span>
              </a>
            ))}
          </div>
        </div>
        <div className={`${styles.heroScroll} ${styles.a4}`}>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ══ SECTOR BLOCKS ══ */}
      {SECTORS.map((sec, i) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`${styles.sectorSection} ${i % 2 !== 0 ? styles.sectorAlt : ""}`}
        >
          <div className={styles.container}>
            <Reveal className={styles.sectorGrid}>
              {/* content */}
              <div className={styles.sectorContent}>
                <div className={styles.sectorMeta}>
                  <span className={styles.sectorNum}>{sec.number}</span>
                  <div className={styles.sectorIconCircle}>
                    <sec.icon size={22} />
                  </div>
                </div>
                <span className={styles.sectorSubtitle}>{sec.subtitle}</span>
                <h2 className={styles.sectorTitle}>{sec.title}</h2>
                <div className={styles.sectorRule} />
                <p className={styles.sectorText}>{sec.text}</p>
                <Link href="/contact" className={styles.sectorLink}>
                  Discuss this sector <ArrowRight size={14} />
                </Link>
              </div>

              {/* stats panel */}
              <div className={styles.statsPanel}>
                <div className={styles.statsPanelInner}>
                  <p className={styles.statsLabel}>Key Context</p>
                  {sec.stats.map((stat) => (
                    <div key={stat.label} className={styles.statItem}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statDesc}>{stat.label}</span>
                    </div>
                  ))}
                  <div className={styles.statsDivider} />
                  <p className={styles.statsFootnote}>
                    Sources: World Bank, African Development Bank, IEA
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ══ WHY THESE SECTORS MATTER ══ */}
      <section className={styles.whySection}>
        <div className={styles.whyBg} />
        <div className={styles.whyNoise} />
        <div className={styles.container}>
          <Reveal className={styles.whyInner}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrowLight}>Impact</span>
            <h2 className={styles.whyTitle}>Why These Sectors Matter</h2>
            <div className={styles.whyBody}>
              <p>
                Energy, water, and strategic capital projects are the sectors
                that define a nation's development trajectory. Without reliable
                energy, economies cannot grow. Without clean water, communities
                cannot thrive. Without strategic infrastructure, countries
                cannot compete.
              </p>
              <p>
                Great Business Platforms focuses exclusively on these sectors
                because they represent the highest-impact opportunities for
                developmental finance in Sub-Saharan Africa — and because they
                are the areas where better financial structuring, strategic
                advisory, and capital mobilisation can make the greatest
                difference.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrow}>FAQ</span>
            <h2 className={styles.sectionTitle}>Common Questions</h2>
          </Reveal>
          <Reveal delay={150} className={styles.faqList}>
            {FAQS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaNoise} />
        <div className={styles.container}>
          <Reveal className={styles.ctaInner}>
            <div className={styles.ctaRule} />
            <h2 className={styles.ctaTitle}>Sector Enquiries</h2>
            <p className={styles.ctaSub}>
              To discuss opportunities in energy, water, or strategic capital
              projects, get in touch with our team.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.btnGold}>
                Get in Touch
              </Link>
              <Link href="/services" className={styles.btnGhost}>
                Our Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
