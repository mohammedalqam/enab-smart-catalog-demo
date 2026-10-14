import { SlidersHorizontal, RotateCcw } from "lucide-react";
import type { ProductFilter, ProductSort } from "@/lib/search";
export function ProductFilters({ filter, sort, onFilter, onSort, hasActive, onReset, count }: { filter: ProductFilter; sort: ProductSort; onFilter: (value: ProductFilter) => void; onSort: (value: ProductSort) => void; hasActive: boolean; onReset: () => void; count: number }) {
  const options: [ProductFilter, string][] = [["all", "كل المنتجات"], ["new", "الجديدة"], ["featured", "المميزة"], ["available", "المتوفر"]];
  return <div className="filter-row"><div className="filter-buttons" aria-label="فلترة المنتجات"><SlidersHorizontal className="filter-icon" size={17} />{options.map(([value, label]) => <button key={value} onClick={() => onFilter(value)} className={filter === value ? "selected" : ""} aria-pressed={filter === value}>{label}</button>)}</div>
    <div className="filter-tools"><span className="results-count" role="status" aria-live="polite">{hasActive ? `وجدنا ${count} منتجًا` : `${count} منتجًا لتكتشفه`}</span><label className="sr-only" htmlFor="sort">ترتيب المنتجات</label><select id="sort" value={sort} onChange={event => onSort(event.target.value as ProductSort)}><option value="default">الترتيب الافتراضي</option><option value="az">الاسم: أ ← ي</option><option value="za">الاسم: ي ← أ</option></select>{hasActive && <button className="reset-filters" onClick={onReset} aria-label="إعادة ضبط البحث والفلاتر"><RotateCcw size={15} /><span>إعادة ضبط</span></button>}</div>
  </div>;
}
