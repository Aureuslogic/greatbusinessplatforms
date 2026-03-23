"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import styles from "./styles.module.css";

/* ─── Reveal hook ─── */
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

/* ─── Form state ─── */
type FormStatus = "idle" | "loading" | "success" | "error";

const INTERESTS = [
  "Capital Mobilisation",
  "Financial Structuring",
  "Strategic Advisory",
  "Energy Infrastructure",
  "Water Infrastructure",
  "Strategic Capital Projects",
  "General Enquiry",
];

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    role: "",
    message: "",
  });

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    /* Simulate async submission — wire up your API here */
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  return (
    <main className={styles.main}>
      {/* ══ HERO BAND ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <span className={`${styles.eyebrow} ${styles.heroAnimate1}`}>
            Get In Touch
          </span>
          <h1 className={`${styles.heroTitle} ${styles.heroAnimate2}`}>
            Let's Build Something
            <br />
            <em>Transformational</em>
          </h1>
          <div className={`${styles.heroRule} ${styles.heroAnimate3}`} />
          <p className={`${styles.heroSub} ${styles.heroAnimate3}`}>
            Whether you represent a government, development finance institution,
            or are an infrastructure investor — we'd like to hear from you.
          </p>
        </div>
      </section>

      {/* ══ BODY ══ */}
      <section className={styles.body}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* ── LEFT: info panel ── */}
            <Reveal className={styles.infoPanel}>
              <div className={styles.infoBlock}>
                <h2 className={styles.infoTitle}>How We Can Help</h2>
                <p className={styles.infoText}>
                  Great Business Platforms works with a select group of partners
                  on high-impact infrastructure projects. Tell us about your
                  project and we'll get back to you within two business days.
                </p>
              </div>

              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Email</p>
                    <a
                      href="mailto:aao@greatbusinessplatforms.com"
                      className={styles.contactValue}
                    >
                      aao@greatbusinessplatforms.com
                    </a>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Region</p>
                    <p className={styles.contactValue}>Sub-Saharan Africa</p>
                  </div>
                </div>
              </div>

              {/* decorative map grid */}
              <div className={styles.mapCard} aria-hidden="true">
                <div className={styles.mapGrid} />
                <div className={styles.mapDot}>
                  <span className={styles.mapPulse} />
                </div>
                <p className={styles.mapLabel}>Sub-Saharan Africa</p>
              </div>

              <div className={styles.infoNote}>
                <span className={styles.infoNoteDot} />
                <p>
                  We typically respond within <strong>2 business days</strong>.
                  For urgent enquiries please use email directly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
