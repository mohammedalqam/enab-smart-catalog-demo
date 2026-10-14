import { categories, products, type CategoryId } from "@/data/products";
export function CategoryNavigation({ active, onChange }: { active: CategoryId | "all"; onChange: (value: CategoryId | "all") => void }) {
  return <div className="category-scroll" aria-label="تصنيفات المنتجات">
    <button className={`category-chip ${active === "all" ? "active" : ""}`} aria-pressed={active === "all"} onClick={() => onChange("all")}><span className="category-symbol">✳</span>الكل<span className="category-count">{products.length}</span></button>
    {categories.map(category => <button key={category.id} className={`category-chip ${active === category.id ? "active" : ""}`} aria-pressed={active === category.id} onClick={() => onChange(category.id)}><span className="category-symbol" aria-hidden="true">{category.emoji}</span>{category.name}<span className="category-count">{products.filter(product => product.category === category.id).length}</span></button>)}
  </div>;
}
