import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

/* ─── Fonts ─── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: {
    default: "Great Business Platforms | Infrastructure Finance in Africa",
    template: "%s | Great Business Platforms",
  },
  description:
    "A technology-enabled corporate finance boutique mobilising and structuring developmental finance for infrastructure and economic development across Sub-Saharan Africa.",
  keywords: [
    "infrastructure finance",
    "Sub-Saharan Africa",
    "development finance",
    "capital mobilisation",
    "corporate finance",
    "project finance",
  ],
  openGraph: {
    title: "Great Business Platforms",
    description:
      "Mobilising Capital for Transformational Infrastructure in Sub-Saharan Africa.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Business Platforms",
    description:
      "Mobilising Capital for Transformational Infrastructure in Sub-Saharan Africa.",
  },
};

/* ─── Root Layout ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}