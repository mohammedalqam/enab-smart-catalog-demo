"use client";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, ArrowUpLeft } from "lucide-react";
import { Brand } from "./Brand";
export function Header({ total, onSearch, onList }: { total: number; onSearch: () => void; onList: () => void }) {
  const [compact, setCompact] = useState(false);
  useEffect(() => { const handle = () => setCompact(window.scrollY > 36); handle(); window.addEventListener("scroll", handle, { passive: true }); return () => window.removeEventListener("scroll", handle); }, []);
  return <>
    <div className="demo-strip"><span>نموذج تجريبي مقترح لعنب كاندي</span><span className="demo-credit">تصميم <b dir="ltr" className="studio-name">0MAR WEB STUDIO</b></span></div>
    <header className={`site-header ${compact ? "compact" : ""}`}>
      <div className="container header-inner">
        <a href="#" className="brand-link" aria-label="عنب كاندي، أعلى الصفحة"><Brand /></a>
        <nav aria-label="التنقل الرئيسي" className="header-nav"><a href="#catalog">الكتالوج</a><a href="#featured">اختياراتنا</a><a href="#new">الجديد <span className="nav-dot" /></a></nav>
        <div className="header-actions">
          <button className="icon-button header-search" onClick={onSearch} aria-label="الانتقال للبحث"><Search size={21} /></button>
          <button className="list-button" onClick={onList} aria-label={`فتح قائمة الاختيارات، ${total} قطعة`}><ShoppingBag size={20} /><span className="list-label">قائمتي</span><span className="list-count" aria-hidden="true">{total}</span></button>
        </div>
      </div>
    </header>
    <a className="skip-link" href="#catalog">انتقل إلى الكتالوج <ArrowUpLeft size={15} /></a>
  </>;
}
