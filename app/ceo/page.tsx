"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Cpu,
  Mic,
  Globe,
  Compass,
  ChevronDown,
  Quote,
} from "lucide-react";
import Image from "next/image";
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

const SECTIONS = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Background in Venture Finance and Strategy",
    text: "Sam Onigbanjo brings a foundation in venture finance from the Saïd Business School at the University of Oxford, complemented by deep experience in business strategy, corporate development, and investment structuring. This combination of academic rigour and practical financial expertise underpins his leadership of Great Business Platforms and its work across Sub-Saharan Africa.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "Technology and AI Experience",
    text: "With a strong background in technology and artificial intelligence, Sam integrates intelligent platforms and AI-enhanced processes into the advisory and capital mobilisation work of Great Business Platforms. This technology-enabled approach improves efficiency, strengthens analysis, and accelerates project preparation for infrastructure and development finance mandates.",
  },
  {
    icon: Mic,
    number: "03",
    title: "Speaker and Communicator",
    text: "Sam Onigbanjo is an experienced speaker and communicator, articulating complex development finance, infrastructure investment, and strategic capital themes to diverse audiences including government officials, institutional investors, development partners, and international stakeholders.",
  },
  {
    icon: Globe,
    number: "04",
    title: "Cross-Border and Development Focus",
    text: "With extensive cross-border experience spanning Africa and the diaspora, Sam is committed to bridging global capital with African development priorities. His work focuses on strengthening the connection between international investors, development finance institutions, and the governments and institutions driving infrastructure development across the continent.",
  },
  {
    icon: Compass,
    number: "05",
    title: "Leadership Philosophy",
    text: "Sam's leadership philosophy centres on creating long-term institutional value through disciplined financial thinking, strategic clarity, and purposeful execution. He believes that the most important infrastructure projects in Africa can attract global capital when they are properly structured, strategically positioned, and supported by credible, technology-enabled advisory.",
  },
];

const FAQS = [
  {
    q: "Who is Sam Onigbanjo?",
    a: "Sam Onigbanjo is the founder and CEO of Great Business Platforms, a technology-enabled corporate finance boutique specialising in development finance and infrastructure advisory in Sub-Saharan Africa.",
  },
  {
    q: "What is Sam Onigbanjo known for?",
    a: "Sam is known for his work in mobilising capital for transformational infrastructure projects in Africa, combining venture finance expertise, technology and AI-enabled advisory, and strategic development focus.",
  },
  {
    q: "What did Sam Onigbanjo study?",
    a: "Sam studied venture finance at the Saïd Business School, University of Oxford, building a foundation in corporate finance, investment structuring, and business strategy.",
  },
  {
    q: "What does Sam Onigbanjo do at Great Business Platforms?",
    a: "As CEO, Sam leads the firm's capital mobilisation, financial structuring, and strategic advisory work, supporting governments, institutions, and investors in financing infrastructure development across Sub-Saharan Africa.",
  },
];

export default function CEOPage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroNoise} />

        <div className={styles.heroInner}>
          <div className={styles.heroLayout}>
            {/* ── text side ── */}
            <div className={styles.heroText}>
              <div className={`${styles.heroBar} ${styles.a1}`} />
              <span className={`${styles.eyebrow} ${styles.a1}`}>
                Leadership
              </span>
              <h1 className={`${styles.heroName} ${styles.a2}`}>
                Sam
                <br />
                <em>Onigbanjo</em>
              </h1>
              <p className={`${styles.heroRole} ${styles.a3}`}>
                Chief Executive Officer
                <br />
                <span>Great Business Platforms</span>
              </p>
              <p className={`${styles.heroSub} ${styles.a4}`}>
                Founder and CEO of Great Business Platforms — a
                technology-enabled corporate finance boutique mobilising and
                structuring developmental finance for transformational
                infrastructure across Sub-Saharan Africa.
              </p>
              <div className={`${styles.heroActions} ${styles.a4}`}>
                <Link href="/contact" className={styles.btnGold}>
                  Get in Touch
                </Link>
                <Link href="/about" className={styles.btnGhost}>
                  About the Firm
                </Link>
              </div>
            </div>

            {/* ── avatar card ── */}
            <div className={`${styles.heroCard} ${styles.a3}`}>
              <div className={styles.avatarRing}>
                <div className={styles.avatarInner}>
                  <Image
                    src="/assets/profile.jpg"
                    alt="Sam Onigbanjo"
                    width={400}
                    height={400}
                    className={styles.avatarImg}
                  />
                </div>
              </div>
              <div className={styles.heroCardBody}>
                <p className={styles.heroCardName}>Sam Onigbanjo</p>
                <p className={styles.heroCardTitle}>CEO &amp; Founder</p>
                <div className={styles.heroCardDivider} />
                <ul className={styles.heroCredentials}>
                  <li>Saïd Business School, Oxford</li>
                  <li>Venture Finance</li>
                  <li>Sub-Saharan Africa</li>
                  <li>Development Finance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.heroScroll} ${styles.a4}`}>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ══ WHO IS SAM ══ */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <Reveal className={styles.introGrid}>
            <div className={styles.introLeft}>
              <div className={styles.goldBar} />
              <span className={styles.eyebrowDark}>Profile</span>
              <h2 className={styles.introTitle}>Who Is Sam Onigbanjo</h2>
            </div>
            <div className={styles.introRight}>
              <div className={styles.quoteWrap}>
                <Quote size={28} className={styles.quoteIcon} />
                <p className={styles.quoteText}>
                  His work sits at the intersection of corporate finance,
                  strategic advisory, and intelligent technology — combining
                  financial structuring capability with a deep commitment to
                  African development.
                </p>
              </div>
              <p className={styles.introBody}>
                Sam Onigbanjo is a business strategist, development finance
                practitioner, and technology-enabled advisory leader. As CEO of
                Great Business Platforms, he works with governments, public
                sector institutions, development finance institutions, and
                global investors to mobilise capital for nationally significant
                infrastructure projects across Sub-Saharan Africa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ DETAIL SECTIONS ══ */}
      {SECTIONS.map((sec, i) => (
        <section
          key={sec.number}
          className={`${styles.detailSection} ${i % 2 !== 0 ? styles.detailAlt : ""}`}
        >
          <div className={styles.container}>
            <Reveal className={styles.detailGrid}>
              {/* number + icon */}
              <div className={styles.detailSide}>
                <span className={styles.detailNum}>{sec.number}</span>
                <div className={styles.detailIconCircle}>
                  <sec.icon size={22} />
                </div>
              </div>

              {/* content */}
              <div className={styles.detailContent}>
                <h2 className={styles.detailTitle}>{sec.title}</h2>
                <div className={styles.detailRule} />
                <p className={styles.detailText}>{sec.text}</p>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ══ PHILOSOPHY PULL QUOTE ══ */}
      <section className={styles.pullSection}>
        <div className={styles.pullBg} />
        <div className={styles.pullNoise} />
        <div className={styles.container}>
          <Reveal className={styles.pullInner}>
            <Quote
              size={40}
              className={styles.pullQuoteIcon}
              aria-hidden="true"
            />
            <blockquote className={styles.pullQuote}>
              The most important infrastructure projects in Africa can attract
              global capital when they are properly structured, strategically
              positioned, and supported by credible, technology-enabled
              advisory.
            </blockquote>
            <cite className={styles.pullCite}>
              — Sam Onigbanjo, CEO, Great Business Platforms
            </cite>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrowDark}>FAQ</span>
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
            <h2 className={styles.ctaTitle}>Work With Us</h2>
            <p className={styles.ctaSub}>
              To discuss a project, partnership, or speaking engagement, reach
              out to the Great Business Platforms team.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.btnGoldLg}>
                Get in Touch
              </Link>
              <Link href="/services" className={styles.btnGhostLg}>
                Our Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
