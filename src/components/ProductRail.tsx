"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import type { ListItem } from "@/lib/list";
import { ProductCard } from "./ProductCard";
export function ProductRail({ id, title, subtitle, label, products, items, onAdd, onView }: { id: string; title: string; subtitle: string; label: string; products: Product[]; items: ListItem[]; onAdd: (id: string) => void; onView: (product: Product) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  function move(amount: number) { const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; rail.current?.scrollBy({ left: amount, behavior: reduced ? "auto" : "smooth" }); }
  return <section id={id} className="product-section container" aria-labelledby={`${id}-heading`}><div className="section-heading"><div><div className="eyebrow">{label}</div><h2 id={`${id}-heading`}>{title}</h2><p>{subtitle}</p></div><div className="rail-controls"><button className="icon-button" onClick={() => move(280)} aria-label={`المنتجات السابقة في ${title}`}><ArrowRight size={19} /></button><button className="icon-button" onClick={() => move(-280)} aria-label={`المنتجات التالية في ${title}`}><ArrowLeft size={19} /></button></div></div><div className="product-rail" ref={rail}>{products.map(product => <ProductCard key={product.id} product={product} compact quantity={items.find(item => item.id === product.id)?.quantity} onAdd={onAdd} onView={onView} />)}</div></section>;
}
