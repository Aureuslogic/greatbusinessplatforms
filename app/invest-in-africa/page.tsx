"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Zap,
  Truck,
  Droplets,
  Wifi,
  Search,
  LayoutList,
  ShieldCheck,
  Globe,
  Briefcase,
  Users,
  ChevronDown,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import styles from "./styles.module.css";

function useInView(threshold = 0.1) {
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

/* ════════════════════════════════
   FAQ accordion
════════════════════════════════ */
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

/* ════════════════════════════════
   Data
════════════════════════════════ */
const OPPORTUNITIES = [
  {
    icon: Building2,
    title: "Housing & Smart Cities",
    text: "Africa faces a significant housing deficit, making real estate development and smart city investment a priority sector. Urban population growth continues to drive demand for affordable and scalable housing solutions.",
    stat: "$1.4T",
    statLabel: "Housing demand deficit by 2030",
  },
  {
    icon: Zap,
    title: "Energy & Power Infrastructure",
    text: "Energy demand across Africa continues to outpace supply. Investment in renewable energy, power generation, and grid expansion offers strong long-term returns, particularly where projects are supported by structured off-take agreements.",
    stat: "600M+",
    statLabel: "People without reliable electricity",
  },
  {
    icon: Truck,
    title: "Transport & Logistics",
    text: "Efficient transport systems are critical for economic development. Investment in roads, rail, ports, and logistics networks unlocks trade and improves productivity across regions.",
    stat: "$130B",
    statLabel: "Annual transport investment gap",
  },
  {
    icon: Droplets,
    title: "Water & Sanitation",
    text: "Access to clean water remains a key challenge. Investment in water infrastructure and sanitation systems provides both social impact and stable, long-term returns.",
    stat: "400M+",
    statLabel: "Without safe drinking water in SSA",
  },
  {
    icon: Wifi,
    title: "Digital Infrastructure",
    text: "The expansion of mobile and internet usage is driving demand for data centres, broadband networks, and digital infrastructure platforms across Africa.",
    stat: "3×",
    statLabel: "Projected internet user growth by 2035",
  },
];

const HOW_WE_HELP = [
  {
    icon: Search,
    title: "Deal Sourcing",
    text: "We identify and evaluate investment opportunities across Sub-Saharan Africa's infrastructure sectors — giving investors access to projects that meet international investment criteria.",
  },
  {
    icon: LayoutList,
    title: "Financial Structuring",
    text: "We design bankable financial frameworks — including capital structures, financial models, and risk allocation — that align investor expectations with project realities on the ground.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Analysis",
    text: "We assess political, currency, execution, and market risks across every mandate, helping investors understand, price, and structure around the risks that matter.",
  },
];

const WHO_FOR = [
  {
    icon: Globe,
    title: "Diaspora Investors",
    text: "Individuals living outside Africa who want to invest in their home continent through structured, professionally managed infrastructure opportunities.",
    href: "/invest-in-africa/diaspora",
  },
  {
    icon: Briefcase,
    title: "Institutional Investors",
    text: "Pension funds, sovereign wealth funds, asset managers, and development finance institutions seeking high-growth infrastructure exposure in Sub-Saharan Africa.",
    href: "/contact",
  },
  {
    icon: Users,
    title: "High Net Worth Individuals",
    text: "Private investors looking to deploy capital into bankable infrastructure projects with meaningful social impact and long-term financial returns.",
    href: "/contact",
  },
];

const ARTICLES = [
  {
    num: "01",
    title:
      "Top 5 Infrastructure Investment Opportunities in Sub-Saharan Africa",
    desc: "Explore housing, energy, transport, water and digital — the sectors where demand significantly exceeds supply.",
    href: "/insights/top-infrastructure-investment-opportunities-africa",
    tag: "Investment",
  },
  {
    num: "02",
    title: "The Role of Diaspora Capital in African Infrastructure Development",
    desc: "How diaspora capital can transition from consumption-based remittances to structured infrastructure investment.",
    href: "/insights/diaspora-capital-african-infrastructure",
    tag: "Diaspora",
  },
  {
    num: "03",
    title: "How to Structure a Bankable Infrastructure Project in Africa",
    desc: "A project becomes investable when structured with clarity. Learn what makes an African infrastructure project bankable.",
    href: "/insights/how-to-structure-bankable-infrastructure-project-africa",
    tag: "Structuring",
  },
  {
    num: "04",
    title:
      "Key Risks in African Infrastructure Investment and How to Manage Them",
    desc: "Political, currency, execution, and market risk — and how to price and structure around each.",
    href: "/insights/risks-african-infrastructure-investment",
    tag: "Risk",
  },
  {
    num: "05",
    title:
      "How to Invest in Infrastructure Projects in Africa (Step-by-Step Guide)",
    desc: "A structured approach combining market insight, risk management, and financial discipline.",
    href: "/insights/how-to-invest-in-african-infrastructure",
    tag: "Guide",
  },
  {
    num: "06",
    title: "What Investors Look for in Infrastructure Investment Deals",
    desc: "The criteria — returns, risk, structure, and execution — that determine whether a deal gets funded.",
    href: "/insights/what-investors-look-for-infrastructure-deals",
    tag: "Investors",
  },
];

const FAQS = [
  {
    q: "What is infrastructure investment in Africa?",
    a: "Infrastructure investment refers to funding physical and digital systems such as housing, energy, transport, and water that support economic growth across African markets.",
  },
  {
    q: "Which sectors offer the highest returns in Africa?",
    a: "Housing, energy, and digital infrastructure are among the fastest-growing sectors due to strong demand and scalability.",
  },
  {
    q: "Who can invest in infrastructure projects in Africa?",
    a: "Institutional investors, diaspora investors, and high-net-worth individuals can all access African infrastructure investment through structured projects, advisory firms, and investment partnerships.",
  },
  {
    q: "How can I invest in African infrastructure?",
    a: "Through structured projects, advisory firms, and investment partnerships. Great Business Platforms can help you identify and access the right opportunities.",
  },
  {
    q: "Is investing in African infrastructure risky?",
    a: "Yes, but risks can be managed through proper structuring, regulatory alignment, and strong execution partnerships. Risk in infrastructure investment is not eliminated — it is identified, priced, and structured.",
  },
  {
    q: "What is diaspora investment in Africa?",
    a: "Diaspora investment refers to capital deployed by individuals living outside their country of origin into real estate, infrastructure, and business opportunities within Africa.",
  },
];

/* ════════════════════════════════
   Page
════════════════════════════════ */
export default function InvestInAfricaPage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroNoise} />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={`${styles.heroBar} ${styles.a1}`} />
          <span className={`${styles.eyebrow} ${styles.a1}`}>
            Investment Opportunity
          </span>
          <h1 className={`${styles.heroTitle} ${styles.a2}`}>
            How to Invest in Infrastructure
            <br />
            Projects in <em>Africa</em>
          </h1>
          <p className={`${styles.heroSub} ${styles.a3}`}>
            Sub-Saharan Africa is one of the most compelling frontiers for
            infrastructure investment — driven by rapid urbanisation, population
            growth, and surging demand for essential services. Great Business
            Platforms connects investors with structured, bankable opportunities
            across the continent.
          </p>

          {/* anchor pills */}
          <div className={`${styles.anchorRow} ${styles.a4}`}>
            {[
              "Opportunities",
              "How We Help",
              "Who This Is For",
              "Insights",
            ].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                className={styles.anchorPill}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className={`${styles.heroScroll} ${styles.a4}`}>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <Reveal className={styles.introGrid}>
            <div className={styles.introStat}>
              <span className={styles.introStatValue}>$100B+</span>
              <span className={styles.introStatLabel}>
                Annual infrastructure financing gap in Sub-Saharan Africa
              </span>
              <div className={styles.introStatSource}>
                Source: African Development Bank
              </div>
            </div>
            <div className={styles.introText}>
              <div className={styles.goldBar} />
              <span className={styles.eyebrowDark}>The Opportunity</span>
              <h2 className={styles.introTitle}>
                A Continent-Scale Investment Opportunity
              </h2>
              <p className={styles.introBody}>
                Sub-Saharan Africa is emerging as one of the most attractive
                regions for infrastructure investment. For investors seeking
                exposure to high-growth markets, the opportunity lies in sectors
                where demand significantly exceeds supply — and where better
                financial structuring can unlock the capital needed to close the
                gap.
              </p>
              <p className={styles.introBody}>
                The key to success in African infrastructure investment is not
                access to capital, but the ability to structure bankable
                projects that align investor expectations with local market
                realities.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ KEY OPPORTUNITIES ══ */}
      <section id="opportunities" className={styles.oppsSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrowDark}>Sectors</span>
            <h2 className={styles.sectionTitle}>
              Key Investment Opportunities
            </h2>
            <p className={styles.sectionSub}>
              Five sectors where infrastructure demand in Sub-Saharan Africa
              significantly exceeds current supply — creating compelling
              long-term investment cases.
            </p>
          </Reveal>

          <div className={styles.oppsGrid}>
            {OPPORTUNITIES.map(
              ({ icon: Icon, title, text, stat, statLabel }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <div className={styles.oppCard}>
                    <div className={styles.oppCardTop} />
                    <div className={styles.oppCardHead}>
                      <div className={styles.oppIcon}>
                        <Icon size={20} />
                      </div>
                      <div className={styles.oppStat}>
                        <span className={styles.oppStatValue}>{stat}</span>
                        <span className={styles.oppStatLabel}>{statLabel}</span>
                      </div>
                    </div>
                    <h3 className={styles.oppTitle}>{title}</h3>
                    <p className={styles.oppText}>{text}</p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══ HOW WE HELP INVESTORS ══ */}
      <section id="how-we-help" className={styles.helpSection}>
        <div className={styles.helpBg} />
        <div className={styles.helpNoise} />
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBarLight} />
            <span className={styles.eyebrowLight}>Our Role</span>
            <h2 className={styles.sectionTitleLight}>How We Help Investors</h2>
            <p className={styles.sectionSubLight}>
              Great Business Platforms provides end-to-end advisory support —
              from identifying the right opportunities to structuring them for
              investment.
            </p>
          </Reveal>

          <div className={styles.helpGrid}>
            {HOW_WE_HELP.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className={styles.helpCard}>
                  <div className={styles.helpIcon}>
                    <Icon size={22} />
                  </div>
                  <h3 className={styles.helpTitle}>{title}</h3>
                  <p className={styles.helpText}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* step-by-step strip */}
          <Reveal delay={400} className={styles.stepStrip}>
            <p className={styles.stepStripLabel}>The Investment Process</p>
            <div className={styles.steps}>
              {[
                "Identify Sectors",
                "Evaluate Opportunity",
                "Review Structure",
                "Analyse Risk",
                "Partner & Deploy",
              ].map((step, i) => (
                <div key={step} className={styles.step}>
                  <span className={styles.stepNum}>0{i + 1}</span>
                  <span className={styles.stepLabel}>{step}</span>
                  {i < 4 && (
                    <ArrowRight size={14} className={styles.stepArrow} />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ WHO THIS IS FOR ══ */}
      <section id="who-this-is-for" className={styles.whoSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrowDark}>Investors</span>
            <h2 className={styles.sectionTitle}>Who This Is For</h2>
            <p className={styles.sectionSub}>
              We work with a range of investor types — each with different
              mandates, timelines, and return expectations.
            </p>
          </Reveal>

          <div className={styles.whoGrid}>
            {WHO_FOR.map(({ icon: Icon, title, text, href }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className={styles.whoCard}>
                  <div className={styles.whoIcon}>
                    <Icon size={22} />
                  </div>
                  <h3 className={styles.whoTitle}>{title}</h3>
                  <p className={styles.whoText}>{text}</p>
                  <Link href={href} className={styles.whoLink}>
                    Learn more <ArrowRight size={13} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INSIGHTS / ARTICLES ══ */}
      <section id="insights" className={styles.insightsSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrowDark}>Insights</span>
            <h2 className={styles.sectionTitle}>Investment Intelligence</h2>
            <p className={styles.sectionSub}>
              Deep-dive guides and analysis for investors exploring African
              infrastructure opportunities.
            </p>
          </Reveal>

          <div className={styles.articlesGrid}>
            {ARTICLES.map(({ num, title, desc, href, tag }, i) => (
              <Reveal key={num} delay={i * 80}>
                <Link href={href} className={styles.articleCard}>
                  <div className={styles.articleHead}>
                    <span className={styles.articleNum}>{num}</span>
                    <span className={styles.articleTag}>{tag}</span>
                  </div>
                  <div className={styles.articleTop} />
                  <h3 className={styles.articleTitle}>{title}</h3>
                  <p className={styles.articleDesc}>{desc}</p>
                  <span className={styles.articleLink}>
                    Read article <ArrowRight size={13} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.goldBar} />
            <span className={styles.eyebrowDark}>Common Questions</span>
            <h2 className={styles.sectionTitle}>FAQ</h2>
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
            <TrendingUp size={32} className={styles.ctaIcon} />
            <div className={styles.ctaRule} />
            <h2 className={styles.ctaTitle}>Ready to Invest in Africa?</h2>
            <p className={styles.ctaSub}>
              Talk to our team about investment opportunities in African
              infrastructure. We'll help you identify, structure, and execute
              the right mandate.
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
