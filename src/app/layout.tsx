import type { Metadata, Viewport } from "next";
import { assetPath } from "@/config/catalog.config";
import "@fontsource/cairo/arabic-400.css";
import "@fontsource/cairo/arabic-600.css";
import "@fontsource/cairo/arabic-700.css";
import "@fontsource/cairo/arabic-800.css";
import "@fontsource/cairo/latin-400.css";
import "@fontsource/cairo/latin-700.css";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "عنب كاندي | كتالوج تجريبي — 0MAR WEB STUDIO",
  description: "معاينة مستقلة مقترحة لكتالوج عنب كاندي: اكتشف المنتجات، ابحث بسهولة واجمع اختياراتك. تصميم 0MAR WEB STUDIO.",
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noimageindex: true } },
  icons: { icon: assetPath("/icon.svg") },
  openGraph: { title: "عنب كاندي — اكتشف مزاجك الحلو", description: "كتالوج تجريبي تفاعلي: بحث سريع وتصنيفات واضحة وقائمة على ذوقك. by 0MAR WEB STUDIO", type: "website", locale: "ar_PS", ...(siteUrl ? { images: [{ url: assetPath("/share.jpg"), width: 1200, height: 630, alt: "ENAB CANDY — Concept Demo by 0MAR WEB STUDIO" }] } : {}) },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fff9f5" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
