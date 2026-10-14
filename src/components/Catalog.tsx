"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { ArrowUp, ArrowUpLeft, Check, Search, ShoppingBag, Sparkles } from "lucide-react";
import { catalogConfig } from "@/config/catalog.config";
import { productMap, products, type CategoryId, type Product } from "@/data/products";
import { filterProducts, type ProductFilter, type ProductSort } from "@/lib/search";
import { useShoppingList } from "@/lib/use-shopping-list";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { SearchBar } from "./SearchBar";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductFilters } from "./ProductFilters";
import { ProductCard } from "./ProductCard";
import { ProductQuickView } from "./ProductQuickView";
import { ShoppingList } from "./ShoppingList";
import { OrderPreview } from "./OrderPreview";
import { ProductRail } from "./ProductRail";
import { Footer } from "./Footer";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [filter, setFilter] = useState<ProductFilter>("all");
  const [sort, setSort] = useState<ProductSort>("default");
  const [viewed, setViewed] = useState<Product | null>(null);
  const [panel, setPanel] = useState<"list" | "preview" | null>(null);
  const [toast, setToast] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();
  const list = useShoppingList();
  const result = useMemo(() => filterProducts(query, category, filter, sort), [query, category, filter, sort]);
  const hasActive = !!query || category !== "all" || filter !== "all" || sort !== "default";
  const recentProducts = recentIds.map(id => productMap.get(id)).filter((product): product is Product => !!product);
  function focusSearch() { document.getElementById("catalog")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }); inputRef.current?.focus({ preventScroll: true }); }
  function reset() { setQuery(""); setCategory("all"); setFilter("all"); setSort("default"); }
  function add(id: string, quantity = 1) { list.add(id, quantity); setToast(`انضاف لقائمتك 🍬 — ${productMap.get(id)?.nameAr}`); }
  function view(product: Product) { setViewed(product); const next = [product.id, ...recentIds.filter(id => id !== product.id)].slice(0, 4); setRecentIds(next); try { localStorage.setItem(catalogConfig.recentStorageKey, JSON.stringify(next)); } catch { /* Recent views are optional. */ } }
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 2500); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => {
    try { const stored: unknown = JSON.parse(localStorage.getItem(catalogConfig.recentStorageKey) || "[]"); if (Array.isArray(stored)) setRecentIds([...new Set(stored.filter((id): id is string => typeof id === "string" && productMap.has(id)))].slice(0, 4)); } catch { /* Ignore damaged recent history. */ }
    function shortcut(event: KeyboardEvent) { const target = event.target as HTMLElement; if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) && !target.isContentEditable && !document.querySelector("dialog[open]")) { event.preventDefault(); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); inputRef.current?.focus({ preventScroll: true }); } }
    function scroll() { setScrolled(window.scrollY > 750); }
    window.addEventListener("keydown", shortcut); window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("keydown", shortcut); window.removeEventListener("scroll", scroll); };
  }, []);
  return <LazyMotion features={domAnimation} strict><Header total={list.total} onSearch={focusSearch} onList={() => setPanel("list")} /><main>
    <m.div initial={reducedMotion ? false : { opacity: 1, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}><HeroSection onSearch={focusSearch} /></m.div>
    <div className="flavor-ribbon" aria-hidden="true"><span>SWEET FINDS</span><span>✳</span><span>على ذوقك</span><span>✳</span><span>GOOD MOOD</span><span>✳</span><span>اختيارات بتحبها</span><span>✳</span><span>SWEET FINDS</span><span>✳</span></div>
    <section id="catalog" className="catalog-section container" aria-labelledby="catalog-title"><div className="catalog-heading"><div><div className="eyebrow">اكتشف مزاجك اليوم</div><h2 id="catalog-title">شو عبالك اليوم؟ <span aria-hidden="true">✳</span></h2></div><p>من أول بحث… للّقمة اللي بتحبها.</p></div>
      <SearchBar query={query} onChange={setQuery} inputRef={inputRef} />
      <CategoryNavigation active={category} onChange={setCategory} />
      <ProductFilters filter={filter} sort={sort} onFilter={setFilter} onSort={setSort} hasActive={hasActive} onReset={reset} count={result.length} />
      <div id="catalog-results" className="catalog-results" aria-busy="false">{result.length ? <div className="product-grid" data-testid="product-grid">{result.map(product => <ProductCard key={product.id} product={product} quantity={list.items.find(item => item.id === product.id)?.quantity} query={query} onAdd={add} onView={view} />)}</div> : <div className="empty-results"><span className="empty-search"><Search size={38} /><span aria-hidden="true">✳</span></span><h3>ما لقينا المنتج اللي بتدور عليه 🍭</h3><p>جرّب كلمة ثانية، أو شيل الفلاتر وشوف الكتالوج كله.</p><button className="button button-primary" onClick={reset}>عرض كل المنتجات<ArrowUpLeft size={18} /></button></div>}</div>
      <p className="demo-disclaimer">هذه معاينة تجريبية لتصميم الكتالوج. المنتجات والصور وحالة التوفر لأغراض التوضيح فقط، ولا تمثل مخزون المحل. لا توجد أسعار فعلية.</p>
    </section>
    <section className="list-promo container"><div className="promo-mark" aria-hidden="true">✳</div><div><div className="eyebrow">اختياراتك، بمكان واحد</div><h2>إنت اختار. إحنا بنرتّبلك القائمة.</h2><p>اجمع اللي بتحبه، عدّل الكمية، وشوف قائمة جاهزة للاستفسار.</p></div><button className="button button-dark" onClick={() => setPanel("list")}>شوف قائمتك<ShoppingBag size={18} /></button></section>
    <ProductRail id="featured" title="اختيارات ممكن تعجبك ✨" subtitle="ألوان ونكهات متنوعة من نفس الكتالوج التجريبي." label="شوية إلهام لمزاجك" products={products.filter(product => product.isFeatured)} items={list.items} onAdd={add} onView={view} />
    <ProductRail id="new" title="جديد الكتالوج" subtitle="علامة «جديد» توضيحية في هذه المعاينة." label="اكتشف إشي مختلف" products={products.filter(product => product.isNew)} items={list.items} onAdd={add} onView={view} />
    {recentProducts.length > 0 && <ProductRail id="recent" title="شفتها مؤخرًا" subtitle="ارجع للمنتجات اللي لفتت انتباهك." label="لسه عبالك؟" products={recentProducts} items={list.items} onAdd={add} onView={view} />}
    <div className="ending-note container"><Sparkles size={21} /><p>كتالوج أسهل. اختيارات أحلى.</p><span dir="ltr">DISCOVER FASTER. BROWSE BETTER.</span></div>
  </main><Footer />
    {viewed && <ProductQuickView key={viewed.id} product={viewed} onClose={() => setViewed(null)} onAdd={add} />}
    {panel === "list" && <ShoppingList items={list.items} storageAvailable={list.storageAvailable} onClose={() => setPanel(null)} onChange={list.change} onRemove={list.remove} onClear={list.clear} onPreview={() => setPanel("preview")} />}
    {panel === "preview" && <OrderPreview items={list.items} onClose={() => setPanel("list")} />}
    <div className={`toast ${toast ? "visible" : ""}`} role="status" aria-live="polite">{toast && <><Check size={18} /><span>{toast}</span></>}</div>
    {list.total > 0 && !panel && !viewed && <button className="mobile-list-bar" onClick={() => setPanel("list")}><span><ShoppingBag size={20} />قائمتك الحلوة <b>{list.total}</b></span><span>شوف القائمة <ArrowUpLeft size={17} /></span></button>}
    {scrolled && <button className={`scroll-top ${list.total ? "above-list" : ""}`} aria-label="العودة لأعلى الصفحة" onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}><ArrowUp size={19} /></button>}
  </LazyMotion>;
}
