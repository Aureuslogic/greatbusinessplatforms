import Link from "next/link";
import { Linkedin, Mail, MapPin } from "lucide-react";
import styles from "./styles.module.css";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/ceo", label: "CEO" },
  { href: "/sectors", label: "Sectors" },
  { href: "/invest-in-africa", label: "Invest" },
  { href: "/contact", label: "Contact" },
];

const SERVICES = [
  { href: "/services#service-01", label: "Capital Mobilisation" },
  { href: "/services#service-02", label: "Financial Structuring" },
  { href: "/services#service-03", label: "Strategic Advisory" },
  { href: "/services#service-04", label: "Technology-Enabled Advisory" },
];

const SECTORS = [
  { href: "/sectors#energy", label: "Energy Infrastructure" },
  { href: "/sectors#capital", label: "Strategic Capital Projects" },
  { href: "/sectors#water", label: "Water Infrastructure" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerNoise} />

      {/* ── Top rule ── */}
      <div className={styles.topRule} />

      {/* ── Main grid ── */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>GBP</span>
              <span className={styles.logoDivider} />
              <span className={styles.logoText}>Great Business Platforms</span>
            </Link>
            <p className={styles.tagline}>
              Mobilising Capital for Transformational Infrastructure in
              Sub-Saharan Africa.
            </p>
            <div className={styles.socials}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="mailto:aao@greatbusinessplatforms.com"
                className={styles.socialIcon}
                aria-label="Email us"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linkList}>
              {SERVICES.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Sectors</h4>
            <ul className={styles.linkList}>
              {SECTORS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Get In Touch</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={14} className={styles.contactIcon} />
                <span>Sub-Saharan Africa</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={14} className={styles.contactIcon} />
                <a
                  href="mailto:aao@greatbusinessplatforms.com"
                  className={styles.footerLink}
                >
                  aao@greatbusinessplatforms.com
                </a>
              </li>
            </ul>
            <Link href="/contact" className={styles.ctaBtn}>
              Partner With Us
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              &copy; {year} Great Business Platforms. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy" className={styles.bottomLink}>
                Privacy Policy
              </Link>
              <span className={styles.bottomDot} />
              <Link href="/terms" className={styles.bottomLink}>
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
