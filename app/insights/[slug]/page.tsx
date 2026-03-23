import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticle, getAllSlugs, articles } from "../data";
import styles from "./styles.module.css";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Props = {
  params: Promise<{ slug: string }>;
};

/* ─────────────────────────────────────────
   Static generation — pre-build all slugs
   Next.js calls this at build time to know
   which [slug] values exist.
───────────────────────────────────────── */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────
   Dynamic metadata per article
   params is a Promise in Next.js 15+
───────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDesc,
    alternates: {
      canonical: `https://greatbusinessplatforms.com/insights/${article.slug}`,
    },
  };
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default async function ArticlePage({ params }: Props) {
  /* await params — required in Next.js 15 */
  const { slug } = await params;
  const article = getArticle(slug);

  /* hard 404 for unknown slugs */
  if (!article) notFound();

  /* prev / next */
  const idx  = articles.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  /* related = 2 others */
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroNoise} />
        <div className={styles.heroInner}>
          <Link href="/invest-in-africa" className={styles.backLink}>
            <ArrowLeft size={14} /> Back to Invest in Africa
          </Link>
          <div className={styles.heroMeta}>
            <span className={styles.tag}>{article.tag}</span>
            <span className={styles.num}>{article.num} / 06</span>
          </div>
          <h1 className={styles.heroTitle}>{article.title}</h1>
          <p className={styles.heroIntro}>{article.intro}</p>
        </div>
      </section>

      {/* ══ ARTICLE BODY ══ */}
      <section className={styles.body}>
        <div className={styles.layout}>

          {/* ── main content ── */}
          <article className={styles.content}>

            {article.sections.map((sec, si) => (
              <div key={si} className={styles.section}>
                {sec.heading && (
                  <h2 className={styles.h2}>{sec.heading}</h2>
                )}
                {sec.body && (
                  <p className={styles.para}>{sec.body}</p>
                )}
                {sec.items && (
                  <div className={styles.items}>
                    {sec.items.map((item, ii) => (
                      <div key={ii} className={styles.item}>
                        <div className={styles.itemDot} />
                        <div>
                          <h3 className={styles.itemTitle}>{item.title}</h3>
                          <p className={styles.itemBody}>{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* strategic insight callout */}
            {article.insight && (
              <div className={styles.insight}>
                <div className={styles.insightBar} />
                <p className={styles.insightLabel}>Strategic Insight</p>
                <p className={styles.insightText}>{article.insight}</p>
              </div>
            )}

            {/* FAQ */}
            {article.faqs.length > 0 && (
              <div className={styles.faqBlock}>
                <h2 className={styles.h2}>Frequently Asked Questions</h2>
                {article.faqs.map((faq, fi) => (
                  <div key={fi} className={styles.faqItem}>
                    <h3 className={styles.faqQ}>{faq.q}</h3>
                    <p className={styles.faqA}>{faq.a}</p>
                  </div>
                ))}
              </div>
            )}

            {/* prev / next */}
            <nav className={styles.pagination} aria-label="Article navigation">
              {prev ? (
                <Link href={`/insights/${prev.slug}`} className={styles.pageLink}>
                  <ArrowLeft size={14} />
                  <span>
                    <em>Previous</em>
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/insights/${next.slug}`}
                  className={`${styles.pageLink} ${styles.pageLinkNext}`}
                >
                  <span>
                    <em>Next</em>
                    {next.title}
                  </span>
                  <ArrowRight size={14} />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>

          {/* ── sidebar ── */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <p className={styles.sideCardLabel}>All Articles</p>
              <ul className={styles.sideList}>
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/insights/${a.slug}`}
                      className={`${styles.sideLink} ${
                        a.slug === article.slug ? styles.sideLinkActive : ""
                      }`}
                    >
                      <span className={styles.sideLinkNum}>{a.num}</span>
                      <span>{a.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.sideCta}>
              <div className={styles.sideCtaAccent} />
              <p className={styles.sideCtaTitle}>Ready to Invest in Africa?</p>
              <p className={styles.sideCtaText}>
                Talk to our team about structured infrastructure investment
                opportunities.
              </p>
              <Link href="/contact" className={styles.sideCtaBtn}>
                Get in Touch
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ══ RELATED ARTICLES ══ */}
      <section className={styles.related}>
        <div className={styles.relatedInner}>
          <div className={styles.relatedHead}>
            <div className={styles.goldBar} />
            <h2 className={styles.relatedTitle}>Related Articles</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedCardTop} />
                <div className={styles.relatedCardHead}>
                  <span className={styles.relatedNum}>{a.num}</span>
                  <span className={styles.relatedTag}>{a.tag}</span>
                </div>
                <h3 className={styles.relatedCardTitle}>{a.title}</h3>
                <span className={styles.relatedLink}>
                  Read article <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}