import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.bg} />
      <div className={styles.glow} />
      <div className={styles.noise} />

      {/* grid lines */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>

        {/* large ghost number */}
        <p className={styles.ghostNum} aria-hidden="true">404</p>

        <div className={styles.content}>
          <div className={styles.rule} />
          <span className={styles.eyebrow}>Page Not Found</span>
          <h1 className={styles.title}>
            We couldn't find<br />
            <em>that page.</em>
          </h1>
          <p className={styles.sub}>
            The page you're looking for doesn't exist or may have been moved.
            Head back home or explore what we do.
          </p>

          <div className={styles.actions}>
            <Link href="/"         className={styles.btnGold}>Return Home</Link>
            <Link href="/services" className={styles.btnGhost}>Our Services</Link>
            <Link href="/contact"  className={styles.btnGhost}>Contact Us</Link>
          </div>
        </div>

      </div>
    </main>
  );
}