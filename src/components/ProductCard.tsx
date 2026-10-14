import Image from "next/image";
import { Check, Plus, ArrowUpLeft } from "lucide-react";
import { assetPath } from "@/config/catalog.config";
import { categoryMap, type Product } from "@/data/products";
import { highlightParts } from "@/lib/search";
export function ProductCard({ product, quantity = 0, onAdd, onView, query = "", compact = false }: { product: Product; quantity?: number; onAdd: (id: string) => void; onView: (product: Product) => void; query?: string; compact?: boolean }) {
  const category = categoryMap.get(product.category);
  return <article className={`product-card ${compact ? "small-card" : ""}`} data-product={product.id}>
    <button className="product-view" onClick={() => onView(product)} aria-label={`عرض تفاصيل ${product.nameAr}`}>
      <div className="product-image-wrap"><Image src={assetPath(product.image)} alt={product.nameAr} width={460} height={460} loading="lazy" className="product-image" />{product.isNew && <span className="product-badge">جديد <span aria-hidden="true">✦</span></span>}<span className="view-hint" aria-hidden="true"><ArrowUpLeft size={17} /></span></div>
      <div className="product-copy"><span className="product-category">{category?.name}</span><h3>{highlightParts(product.nameAr, query).map((part, index) => part.match ? <mark key={index}>{part.text}</mark> : <span key={index}>{part.text}</span>)}</h3><span className="product-english" dir="ltr">{product.nameEn}</span><p>{product.descriptionAr}</p></div>
    </button>
    <div className="product-card-bottom"><button className={`add-button ${quantity ? "added" : ""}`} onClick={() => onAdd(product.id)} disabled={!product.isAvailable} aria-label={!product.isAvailable ? `${product.nameAr} غير متوفر في المثال` : `أضف ${product.nameAr} للقائمة`}>{product.isAvailable ? <>{quantity ? <><Check size={16} /><span>تمت الإضافة</span><b>{quantity}</b></> : <><Plus size={16} /><span>أضف للقائمة</span></>}</> : <span>غير متوفر بالمثال</span>}</button></div>
  </article>;
}
