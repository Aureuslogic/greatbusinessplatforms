"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  FileText,
  Users,
  Zap,
  Landmark,
  Droplets,
  Cpu,
  Eye,
  Target,
  ChevronDown,
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

function SectionCard({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className={styles.card}>
        <div className={styles.cardTop} />
        <div className={styles.cardIcon}>
          <Icon size={22} />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{desc}</p>
      </div>
    </Reveal>
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

const WHAT_WE_DO = [
  {
    icon: TrendingUp,
    title: "Capital Mobilisation",
    desc: "Connecting infrastructure projects with global investors and development finance institutions to fund transformational development across Africa.",
  },
  {
    icon: FileText,
    title: "Financial Structuring",
    desc: "Designing financial frameworks that meet international investment standards for complex infrastructure and development projects.",
  },
  {
    icon: Users,
    title: "Strategic Advisory",
    desc: "Advising governments and institutions on project positioning, stakeholder engagement, and investment readiness.",
  },
];

const SECTORS = [
  {
    icon: Zap,
    title: "Energy Infrastructure",
    desc: "Energy generation, transmission, and distribution projects that drive economic growth across Sub-Saharan Africa.",
  },
  {
    icon: Landmark,
    title: "Strategic Capital Projects",
    desc: "Nationally significant infrastructure initiatives from transport corridors to industrial development zones.",
  },
  {
    icon: Droplets,
    title: "Water Infrastructure",
    desc: "Water supply, treatment, and distribution systems critical to public health and sustainable development.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Target,
    title: "Corporate Finance Expertise",
    desc: "Deep expertise in corporate finance, project finance, and capital markets, applied to infrastructure development in Sub-Saharan Africa.",
  },
  {
    icon: Eye,
    title: "Strategic Advisory for Public Value",
    desc: "Advisory that serves the public interest — helping governments and institutions position projects that deliver long-term economic and social value.",
  },
  {
    icon: Cpu,
    title: "Technology-Enabled Delivery",
    desc: "Intelligent platforms and AI-enhanced processes that improve efficiency, strengthen analysis, and accelerate project preparation.",
  },
];

const FAQS = [
  {
    q: "What is development finance in Africa?",
    a: "Development finance in Africa refers to funding used to support infrastructure projects such as housing, energy, transport, and water systems that drive economic growth and long-term development. It often involves a combination of public and private capital, including institutional investors and development finance institutions.",
  },
  {
    q: "How can I invest in infrastructure projects in Africa?",
    a: "Investors can access infrastructure investment opportunities in Africa through structured projects, advisory firms, and partnerships with governments or private developers. These investments are typically available to institutional investors, diaspora investors, and high-net-worth individuals.",
  },
  {
    q: "What are the best infrastructure investment opportunities in Africa?",
    a: "The most attractive infrastructure investment opportunities in Africa include housing and smart cities, energy and power infrastructure, transport and logistics, water and sanitation, and digital infrastructure. These sectors are driven by strong demand and long-term growth potential.",
  },
  {
    q: "What is project finance in infrastructure?",
    a: "Project finance is a method of funding infrastructure projects where repayment is primarily based on the cash flow generated by the project itself. It is commonly used in large-scale developments such as energy, transport, and real estate projects across Africa.",
  },
  {
    q: "Is investing in African infrastructure risky?",
    a: "Infrastructure investment in Africa carries risks such as political, currency, and execution risk. However, these risks can be managed through proper structuring, regulatory alignment, and partnerships with experienced advisors and local stakeholders.",
  },
  {
    q: "Who can invest in African infrastructure projects?",
    a: "African infrastructure projects are typically funded by institutional investors, private equity firms, development finance institutions, diaspora investors, and high-net-worth individuals seeking long-term investment opportunities.",
  },
  {
    q: "What role does diaspora capital play in African development?",
    a: "Diaspora capital plays a key role in African development by providing funding for infrastructure, housing, and business projects. When properly structured, diaspora investment can support economic growth while creating wealth opportunities for investors.",
  },
  {
    q: "How are infrastructure projects structured in Africa?",
    a: "Infrastructure projects in Africa are structured using a combination of equity investment, debt financing, and sometimes government or development finance support. The goal is to create a financially viable and bankable project that attracts investors.",
  },
  {
    q: "Why is infrastructure investment important in Africa?",
    a: "Infrastructure investment is critical in Africa because it supports economic growth, improves living standards, and enables trade and productivity. Investment in infrastructure also creates long-term revenue opportunities for investors.",
  },
  {
    q: "What do investors look for in infrastructure deals?",
    a: "Investors look for clear returns, strong project structure, defined risk management, credible sponsors, and alignment with market demand. Well-structured infrastructure projects are more likely to attract funding and deliver long-term value.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroNoise} />
        <div className={styles.heroInner}>
          <div className={`${styles.heroBar} ${styles.a1}`} />
          <h1 className={`${styles.heroTitle} ${styles.a2}`}>
            About Great
            <br />
            <em>Business Platforms</em>
          </h1>
          <p className={`${styles.heroSub} ${styles.a3}`}>
            Great Business Platforms is a UK-based development finance and
            infrastructure advisory firm focused on mobilising capital for
            transformational projects across Sub-Saharan Africa. We work with
            governments, developers, and investors to structure and fund
            infrastructure projects that deliver both financial returns and
            long-term economic impact.
          </p>
        </div>
        <div className={`${styles.heroScroll} ${styles.a4}`}>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ══ EXTENDED INTRO ══ */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.introGrid}>
              <div className={styles.introQuote}>
                <span className={styles.introQuoteMark}>"</span>
                <p>
                  Closing the gap between infrastructure ambition and global
                  capital.
                </p>
              </div>
              <p className={styles.introBody}>
                We specialise in helping clients prepare, position, and finance
                high-impact initiatives in sectors essential to long-term
                national growth — including energy infrastructure, strategic
                capital projects, and water infrastructure. By combining
                financial structuring, strategic advisory, capital mobilisation,
                and intelligent technology platforms, Great Business Platforms
                supports projects that strengthen public infrastructure, unlock
                investment, and improve economic resilience across Sub-Saharan
                Africa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section className={`${styles.cardSection} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrow}>Services</span>
            <h2 className={styles.sectionTitle}>
              What Great Business Platforms Does
            </h2>
          </Reveal>
          <div className={styles.cardGrid}>
            {WHAT_WE_DO.map(({ icon, title, desc }, i) => (
              <SectionCard
                key={title}
                icon={icon}
                title={title}
                desc={desc}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTORS ══ */}
      <section className={styles.cardSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrow}>Industries</span>
            <h2 className={styles.sectionTitle}>What Sectors We Focus On</h2>
          </Reveal>
          <div className={styles.cardGrid}>
            {SECTORS.map(({ icon, title, desc }, i) => (
              <SectionCard
                key={title}
                icon={icon}
                title={title}
                desc={desc}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY WE EXIST ══ */}
      <section className={`${styles.prose} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <Reveal className={styles.proseInner}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrow}>Purpose</span>
            <h2 className={styles.sectionTitle}>
              Why Great Business Platforms Exists
            </h2>
            <div className={styles.proseColumns}>
              <p>
                Sub-Saharan Africa faces a significant infrastructure financing
                gap. Many transformational projects — in energy, water,
                transport, and strategic capital — struggle to attract the
                investment they need, not because they lack economic merit but
                because they lack the financial structuring, strategic
                positioning, and investment readiness that global capital
                requires.
              </p>
              <p>
                Great Business Platforms exists to close that gap. We bring
                corporate finance expertise, strategic advisory capability, and
                technology-enabled delivery to help governments and institutions
                move important national projects from vision to execution.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ DIFFERENTIATORS ══ */}
      <section className={styles.cardSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrow}>Edge</span>
            <h2 className={styles.sectionTitle}>What Makes Us Different</h2>
          </Reveal>
          <div className={styles.cardGrid}>
            {DIFFERENTIATORS.map(({ icon, title, desc }, i) => (
              <SectionCard
                key={title}
                icon={icon}
                title={title}
                desc={desc}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ VISION ══ */}
      <section className={`${styles.visionSection}`}>
        <div className={styles.visionBg} />
        <div className={styles.visionNoise} />
        <div className={styles.container}>
          <Reveal className={styles.visionInner}>
            <div className={styles.goldBar} />
            <span className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
              Vision
            </span>
            <h2 className={styles.visionTitle}>Our Vision</h2>
            <div className={styles.visionBody}>
              <p>
                Great Business Platforms envisions a Sub-Saharan Africa where
                transformational infrastructure projects are investment-ready,
                strategically positioned, and fully funded — driving sustainable
                economic growth, improved public services, and stronger national
                resilience.
              </p>
              <p>
                Led by <strong>Sam Onigbanjo</strong>, with experience in
                venture finance at the Saïd Business School, University of
                Oxford, the firm draws on a foundation of business strategy,
                technology and AI-enabled advisory, cross-border Africa and
                diaspora engagement, and strategic growth and opportunity
                development.
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
            <span className={styles.eyebrow}>Common Questions</span>
            <h2 className={styles.sectionTitle}>FAQ</h2>
          </Reveal>
          <Reveal delay={150} className={styles.faqList}>
            {FAQS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT CTA ══ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaNoise} />
        <div className={styles.container}>
          <Reveal className={styles.ctaInner}>
            <div className={styles.ctaRule} />
            <h2 className={styles.ctaTitle}>Ready to Partner With Us?</h2>
            <p className={styles.ctaSub}>
              Whether you are a government, a development finance institution,
              or a global investor — we want to hear about your project.
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
