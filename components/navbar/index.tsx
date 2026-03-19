"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./styles.module.css";

const NAV_LINKS = [
  { href: "/",          label: "Home"     },
  { href: "/about",     label: "About"    },
  { href: "/services",  label: "Services" },
  { href: "/sectors",   label: "Sectors"  },
  { href: "/contact",   label: "Contact"  },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  /* close mobile menu on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
        role="banner"
      >
        <div className={styles.inner}>

          {/* ── Logo ── */}
          <Link href="/" className={styles.logo} aria-label="Great Business Platforms — Home">
            <span className={styles.logoMark}>GBP</span>
            <span className={styles.logoDivider} />
            <span className={styles.logoText}>Great Business Platforms</span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${pathname === href ? styles.navLinkActive : ""}`}
                  >
                    {label}
                    <span className={styles.navUnderline} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop CTA ── */}
          <Link href="/contact" className={styles.ctaBtn}>
            Partner With Us
          </Link>

          {/* ── Mobile toggle ── */}
          <button
            className={styles.menuBtn}
            onClick={() => setOpen((p) => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.drawerList}>
            {NAV_LINKS.map(({ href, label }, i) => (
              <li
                key={href}
                className={styles.drawerItem}
                style={{ transitionDelay: open ? `${i * 60 + 80}ms` : "0ms" }}
              >
                <Link
                  href={href}
                  className={`${styles.drawerLink} ${pathname === href ? styles.drawerLinkActive : ""}`}
                >
                  <span className={styles.drawerNum}>0{i + 1}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={styles.drawerCta}
            style={{ transitionDelay: open ? "380ms" : "0ms" }}
          >
            <Link href="/contact" className={styles.drawerCtaBtn}>
              Partner With Us
            </Link>
          </div>
        </nav>
      </div>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}