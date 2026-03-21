"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./styles.module.css";

/* ─── Reveal hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
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
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          <span className={`${styles.eyebrow} ${styles.heroAnimate1}`}>Get In Touch</span>
          <h1 className={`${styles.heroTitle} ${styles.heroAnimate2}`}>
            Let's Build Something<br />
            <em>Transformational</em>
          </h1>
          <div className={`${styles.heroRule} ${styles.heroAnimate3}`} />
          <p className={`${styles.heroSub} ${styles.heroAnimate3}`}>
            Whether you represent a government, development finance institution, or
            are an infrastructure investor — we'd like to hear from you.
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
                  Great Business Platforms works with a select group of partners on
                  high-impact infrastructure projects. Tell us about your project and
                  we'll get back to you within two business days.
                </p>
              </div>

              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Email</p>
                    <a href="mailto:aao@greatbusinessplatforms.com" className={styles.contactValue}>
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

            {/* ── RIGHT: form ── */}
            <Reveal delay={180} className={styles.formPanel}>

              {status === "success" ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>
                    <CheckCircle size={36} />
                  </div>
                  <h3 className={styles.successTitle}>Message Received</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out. A member of our team will be in
                    touch within two business days.
                  </p>
                  <button
                    className={styles.successBtn}
                    onClick={() => { setStatus("idle"); setForm({ firstName:"", lastName:"", email:"", organisation:"", role:"", message:"" }); setSelected([]); }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>

                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>Send Us a Message</h2>
                    <p className={styles.formSub}>Fields marked <span className={styles.req}>*</span> are required.</p>
                  </div>

                  {/* name row */}
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="firstName">
                        First Name <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        autoComplete="given-name"
                        className={styles.input}
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="lastName">
                        Last Name <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        autoComplete="family-name"
                        className={styles.input}
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* email */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Email Address <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={styles.input}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@organisation.com"
                    />
                  </div>

                  {/* org + role row */}
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="organisation">
                        Organisation <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="organisation"
                        name="organisation"
                        type="text"
                        required
                        className={styles.input}
                        value={form.organisation}
                        onChange={handleChange}
                        placeholder="Ministry / Fund / Agency"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="role">
                        Your Role
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        className={styles.input}
                        value={form.role}
                        onChange={handleChange}
                        placeholder="e.g. Director, CFO"
                      />
                    </div>
                  </div>

                  {/* areas of interest */}
                  <div className={styles.field}>
                    <p className={styles.label}>Areas of Interest</p>
                    <div className={styles.tags}>
                      {INTERESTS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggle(item)}
                          className={`${styles.tag} ${selected.includes(item) ? styles.tagActive : ""}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* message */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">
                      Message <span className={styles.req}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className={styles.textarea}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, institution, or how you'd like to collaborate…"
                    />
                  </div>

                  {status === "error" && (
                    <div className={styles.errorBanner}>
                      <AlertCircle size={16} />
                      <span>Something went wrong. Please try again or email us directly.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={styles.submitBtn}
                  >
                    {status === "loading" ? (
                      <span className={styles.spinner} />
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </Reveal>

          </div>
        </div>
      </section>

    </main>
  );
}