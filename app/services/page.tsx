"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  FileText,
  Users,
  Cpu,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
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

const SERVICES = [
  {
    icon: TrendingUp,
    number: "01",
    title: "Capital Mobilisation in Africa",
    subtitle: "Connecting projects with the right capital",
    text: "We connect transformational infrastructure and development projects with global investors, development finance institutions, and strategic capital sources. Our capital mobilisation work spans project identification, investor engagement, transaction structuring, and investment positioning — ensuring that high-impact projects in Sub-Saharan Africa gain access to the funding they need to move from vision to execution.",
    bullets: [
      "Project identification & scoping",
      "Investor engagement & outreach",
      "Transaction structuring",
      "Investment positioning",
    ],
  },
  {
    icon: FileText,
    number: "02",
    title: "Financial Structuring for Infrastructure Projects",
    subtitle: "Bankable frameworks for complex projects",
    text: "We design robust financial frameworks for complex infrastructure and development projects, building detailed financial models and capital structures that meet the requirements of international investors, development finance institutions, and multilateral lending organisations. Our financial structuring capability helps clients present projects that are credible, bankable, and investment-ready.",
    bullets: [
      "Detailed financial modelling",
      "Capital structure design",
      "DFI & multilateral alignment",
      "Investment-readiness assessment",
    ],
  },
  {
    icon: Users,
    number: "03",
    title: "Strategic Advisory for Governments and Institutions",
    subtitle: "From policy ambition to funded infrastructure",
    text: "We provide governments, public sector institutions, and development agencies with strategic counsel on project positioning, stakeholder engagement, institutional readiness, and investment strategy. Our advisory helps clients align national development priorities with the expectations of global capital, strengthening the pathway from policy ambition to funded infrastructure.",
    bullets: [
      "Project positioning strategy",
      "Stakeholder engagement",
      "Institutional readiness",
      "Investment strategy",
    ],
  },
  {
    icon: Cpu,
    number: "04",
    title: "Technology-Enabled Advisory",
    subtitle: "AI-enhanced speed and analytical depth",
    text: "Great Business Platforms integrates intelligent technology platforms and AI-enhanced processes into every aspect of its advisory and capital mobilisation work. This technology-enabled approach improves the speed and quality of analysis, strengthens financial modelling, accelerates project preparation, and provides clients with a more efficient and data-informed advisory experience.",
    bullets: [
      "AI-enhanced analysis",
      "Intelligent project platforms",
      "Accelerated preparation",
      "Data-informed advisory",
    ],
  },
];

const FAQS = [
  {
    q: "What services does Great Business Platforms provide?",
    a: "We provide capital mobilisation, financial structuring, strategic advisory, and technology-enabled advisory services for infrastructure and economic development projects across Sub-Saharan Africa.",
  },
  {
    q: "How does Great Business Platforms support governments?",
    a: "We help governments and public sector institutions prepare, position, and finance high-impact infrastructure projects by providing strategic counsel, financial structuring, and capital mobilisation support.",
  },
  {
    q: "What is capital mobilisation?",
    a: "Capital mobilisation is the process of identifying, engaging, and securing investment from global investors, development finance institutions, and other capital sources to fund infrastructure and development projects.",
  },
  {
    q: "What is financial structuring?",
    a: "Financial structuring involves designing the financial framework of a project — including capital structure, financial models, risk allocation, and investment terms — to meet the requirements of investors and lending institutions.",
  },
];

export default function ServicesPage() {
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
            What We Offer
          </span>
          <h1 className={`${styles.heroTitle} ${styles.a2}`}>
            Our <em>Services</em>
          </h1>
          <p className={`${styles.heroSub} ${styles.a3}`}>
            Great Business Platforms delivers capital mobilisation, financial
            structuring, strategic advisory, and technology-enabled advisory
            services to support infrastructure and economic development across
            Sub-Saharan Africa.
          </p>

          {/* quick-nav pills */}
          <div className={`${styles.quickNav} ${styles.a4}`}>
            {SERVICES.map((s) => (
              <a
                key={s.number}
                href={`#service-${s.number}`}
                className={styles.quickPill}
              >
                <span className={styles.quickNum}>{s.number}</span>
                {s.icon && <s.icon size={13} />}
              </a>
            ))}
          </div>
        </div>
        <div className={`${styles.heroScroll} ${styles.a4}`}>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ══ SERVICE BLOCKS ══ */}
      {SERVICES.map((svc, i) => (
        <section
          key={svc.number}
          id={`service-${svc.number}`}
          className={`${styles.serviceSection} ${i % 2 !== 0 ? styles.serviceSectionAlt : ""}`}
        >
          <div className={styles.container}>
            <Reveal className={styles.serviceGrid}>
              {/* number / icon side */}
              <div className={styles.serviceSide}>
                <div className={styles.serviceNumWrap}>
                  <span className={styles.serviceNum}>{svc.number}</span>
                  <div className={styles.serviceIconCircle}>
                    <svc.icon size={22} />
                  </div>
                </div>
                <ul className={styles.bulletList}>
                  {svc.bullets.map((b) => (
                    <li key={b} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* content side */}
              <div className={styles.serviceContent}>
                <span className={styles.serviceSubtitle}>{svc.subtitle}</span>
                <h2 className={styles.serviceTitle}>{svc.title}</h2>
                <div className={styles.serviceRule} />
                <p className={styles.serviceText}>{svc.text}</p>
                <Link href="/contact" className={styles.serviceLink}>
                  Discuss this service <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ══ WHY OUR SERVICES MATTER ══ */}
      <section className={styles.whySection}>
        <div className={styles.whyBg} />
        <div className={styles.whyNoise} />
        <div className={styles.container}>
          <Reveal className={styles.whyInner}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrowLight}>Impact</span>
            <h2 className={styles.whyTitle}>Why Our Services Matter</h2>
            <div className={styles.whyBody}>
              <p>
                Sub-Saharan Africa's infrastructure financing gap is one of the
                most pressing challenges facing the continent's economic
                development. Many transformational projects fail to reach
                funding not because they lack merit, but because they lack the
                financial structuring, strategic positioning, and project
                readiness that global capital demands.
              </p>
              <p>
                Our services address this gap directly — helping governments and
                institutions translate national priorities into investment-ready
                propositions, and connecting those propositions with the right
                capital at the right time.
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
            <h2 className={styles.ctaTitle}>Ready to Partner With Us?</h2>
            <p className={styles.ctaSub}>
              Whether you represent a government, a development finance
              institution, or are a global infrastructure investor — let's talk.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.btnGold}>
                Get in Touch
              </Link>
              <Link href="/about" className={styles.btnGhost}>
                About Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
