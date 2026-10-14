"use client";
import { useState } from "react";
import Image from "next/image";
import { Check, Plus, Sparkles } from "lucide-react";
import { assetPath } from "@/config/catalog.config";
import { categoryMap, type Product } from "@/data/products";
import { Modal } from "./Modal";
import { QuantityControl } from "./QuantityControl";
export function ProductQuickView({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (id: string, quantity: number) => void }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  return <Modal title="نظرة أقرب على المنتج" onClose={onClose} kind="product"><div className="quick-view"><div className="quick-image"><Image src={assetPath(product.image)} width={460} height={460} alt={product.nameAr} /></div><div className="quick-copy"><div className="eyebrow"><Sparkles size={15} />{categoryMap.get(product.category)?.name}</div><h3>{product.nameAr}</h3><p className="quick-english" dir="ltr">{product.nameEn}</p><p>{product.descriptionAr}</p><span className={`availability ${product.isAvailable ? "" : "unavailable"}`}><span />{product.isAvailable ? "متوفر في المثال التجريبي" : "غير متوفر في المثال التجريبي"}</span><div className="quick-quantity"><span>اختار الكمية</span><QuantityControl value={quantity} onChange={value => { setQuantity(value); setAdded(false); }} name={product.nameAr} /></div><button className="button button-primary quick-add" disabled={!product.isAvailable} onClick={() => { onAdd(product.id, quantity); setAdded(true); }}>{added ? <><Check size={19} />تمت الإضافة لقائمتك</> : <><Plus size={19} />أضف للقائمة</>}</button><p className="quick-disclaimer">منتج توضيحي. الاسم والصورة والتوفر لا يمثلون بيانات المحل الفعلية.</p></div></div></Modal>;
}
