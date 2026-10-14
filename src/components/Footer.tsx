import { ArrowUpLeft, Sparkles } from "lucide-react";
import { catalogConfig } from "@/config/catalog.config";
import { Brand } from "./Brand";
function InstagramMark() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>; }
export function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><div><Brand light /><p>كل منتجاتك المفضلة بمكان واحد 🍬</p></div><a className="instagram-link" href={catalogConfig.instagram} target="_blank" rel="noopener noreferrer"><InstagramMark />عنـب على إنستغرام<ArrowUpLeft size={17} /></a></div><div className="container footer-bottom"><p><Sparkles size={15} />معاينة مستقلة مقترحة، وليست الموقع الرسمي للمحل.</p><a href={catalogConfig.studioInstagram} target="_blank" rel="noopener noreferrer" className="studio-credit" dir="ltr">Concept Demo by <b className="studio-name">{catalogConfig.studioName}</b><ArrowUpLeft size={15} /></a></div></footer>;
}
