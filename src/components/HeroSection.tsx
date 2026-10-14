import Image from "next/image";
import { ArrowDown, ArrowUpLeft, Search, Sparkles, Check } from "lucide-react";
import { assetPath } from "@/config/catalog.config";
export function HeroSection({ onSearch }: { onSearch: () => void }) {
  return <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="eyebrow"><span className="tiny-star">✳</span> لكل مزاج، إشي حلو</div>
      <h1 id="hero-title">كل إشي بتحبه…<br /><span>صار أسهل</span> تلاقيه!</h1>
      <p>تصفح المنتجات، دور على اللي بتحبه،<br className="desktop-break" /> واختار طلبك بكل سهولة.</p>
      <div className="hero-actions"><a href="#catalog" className="button button-primary">اكتشف المنتجات <ArrowDown size={18} /></a><button onClick={onSearch} className="button button-text">دور على منتج <Search size={17} /></button></div>
      <div className="hero-benefits"><span><Check size={14} /> بحث سريع</span><span><Check size={14} /> تصنيفات واضحة</span><span><Check size={14} /> قائمة على ذوقك</span></div>
    </div>
    <div className="hero-visual">
      <div className="hero-image-frame"><Image src={assetPath("/hero.webp")} alt="تشكيلة تجريبية من الجيلي الملون والحلوى الحامضة داخل مخروط ورقي" width={820} height={820} priority fetchPriority="high" className="hero-image" /></div>
      <span className="hero-burst" aria-hidden="true">✳</span>
      <div className="hero-sticker"><Sparkles size={17} /><span>اختار اللي<br /><b>بيحلّي يومك!</b></span></div>
      <div className="hero-product-note"><span className="note-dot" /><span>ألوان، نكهات، واختيارات كتير</span><ArrowUpLeft size={17} /></div>
      <span className="hero-art-label" dir="ltr">A LITTLE SWEET. A LOT OF HAPPY.</span>
    </div>
  </section>;
}
