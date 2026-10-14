import Image from "next/image";
import { ArrowUpLeft, ShoppingBag, Trash2, Smartphone, ShieldCheck } from "lucide-react";
import { assetPath } from "@/config/catalog.config";
import { productMap } from "@/data/products";
import type { ListItem } from "@/lib/list";
import { Modal } from "./Modal";
import { QuantityControl } from "./QuantityControl";
export function ShoppingList({ items, storageAvailable, onClose, onChange, onRemove, onClear, onPreview }: { items: ListItem[]; storageAvailable: boolean; onClose: () => void; onChange: (id: string, quantity: number) => void; onRemove: (id: string) => void; onClear: () => void; onPreview: () => void }) {
  const total = items.reduce((sum, item) => sum + item.quantity, 0);
  return <Modal title="قائمتك الحلوة" onClose={onClose} kind="list">{items.length ? <>
    <div className="list-subtitle"><span>{items.length} منتجات · {total} قطعة</span><button className="clear-list" onClick={onClear}><Trash2 size={14} />تفريغ القائمة</button></div>
    <div className="list-items">{items.map(item => { const product = productMap.get(item.id)!; return <div className="list-item" key={item.id}><Image src={assetPath(product.image)} width={84} height={84} alt={product.nameAr} /><div className="list-item-copy"><h3>{product.nameAr}</h3><span dir="ltr">{product.nameEn}</span><QuantityControl value={item.quantity} onChange={quantity => onChange(item.id, quantity)} name={product.nameAr} /></div><button className="icon-button remove-item" onClick={() => onRemove(item.id)} aria-label={`إزالة ${product.nameAr}`}><Trash2 size={17} /></button></div>; })}</div>
    <div className="list-summary"><span>مجموع القطع المختارة</span><strong>{total}<small>قطعة</small></strong></div>
    <button className="button button-primary preview-button" onClick={onPreview}><Smartphone size={20} />شوف كيف ممكن تطلب<ArrowUpLeft size={18} /></button><p className="list-footnote"><ShieldCheck size={15} />معاينة فقط — لا إرسال ولا دفع</p>
  </> : <div className="empty-list"><span className="empty-illustration"><ShoppingBag size={48} strokeWidth={1.3} /><span>✳</span></span><h3>لسه قائمتك فاضية 🍬</h3><p>اختار اللي عبالك، واجمعه هون.<br />قائمتك الحلوة بتبلّش بمنتج واحد.</p><button className="button button-primary" onClick={onClose}>اكتشف المنتجات <ArrowUpLeft size={17} /></button></div>}
    <div className="storage-note">{storageAvailable ? "اختياراتك محفوظة على هذا الجهاز فقط." : "حفظ القائمة غير متاح في هذا المتصفح؛ القائمة تعمل خلال هذه الزيارة."}</div>
  </Modal>;
}
