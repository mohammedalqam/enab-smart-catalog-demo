import { catalogConfig } from "@/config/catalog.config";
export function Brand({ light = false }: { light?: boolean }) {
  return <span className={`brand ${light ? "brand-light" : ""}`}>
    <svg className="brand-mark" viewBox="0 0 56 56" aria-hidden="true">
      <path d="m27 8 7 5 7-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <g fill="currentColor"><circle cx="20" cy="21" r="7" /><circle cx="36" cy="21" r="7" /><circle cx="28" cy="33" r="7" /><circle cx="28" cy="45" r="5" /></g>
    </svg>
    <span className="brand-word"><strong dir="ltr">{catalogConfig.storeNameEn}<span className="brand-dot">.</span></strong><span>{catalogConfig.storeNameAr}</span></span>
  </span>;
}
