import Fuse from "fuse.js";
import { categories, products, type Product, type CategoryId } from "@/data/products";

export function normalizeSearch(value: string): string {
  return value.toLowerCase().normalize("NFKD")
    .replace(/[\u064b-\u065f\u0670\u0640\u0300-\u036f]/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

const index = products.map(product => ({
  product,
  name: normalizeSearch(`${product.nameAr} ${product.nameEn}`),
  keywords: [...product.searchKeywords, ...product.tags,
    ...(categories.find(category => category.id === product.category)?.synonyms || [])].map(normalizeSearch),
}));
const fuzzy = new Fuse(index, {
  keys: [{ name: "name", weight: 2 }, { name: "keywords", weight: 1 }],
  threshold: 0.24, ignoreLocation: true, minMatchCharLength: 3, includeScore: true,
});

export function searchProducts(query: string): Product[] {
  const normalized = normalizeSearch(query);
  if (!normalized) return products;
  const tokens = normalized.split(" ");
  const direct = index.filter(item => tokens.every(token =>
    item.name.includes(token) || item.keywords.some(keyword => keyword.includes(token))));
  if (direct.length) return direct.sort((a, b) =>
    Number(b.name.startsWith(normalized)) - Number(a.name.startsWith(normalized))).map(item => item.product);
  if (normalized.length < 4) return [];
  return fuzzy.search(normalized).map(result => result.item.product);
}

export type ProductFilter = "all" | "new" | "featured" | "available";
export type ProductSort = "default" | "az" | "za";
export function filterProducts(query: string, category: CategoryId | "all", filter: ProductFilter, sort: ProductSort): Product[] {
  const result = searchProducts(query).filter(product =>
    (category === "all" || product.category === category)
    && (filter !== "new" || product.isNew)
    && (filter !== "featured" || product.isFeatured)
    && (filter !== "available" || product.isAvailable));
  if (sort !== "default") result.sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar") * (sort === "az" ? 1 : -1));
  return result;
}

export function highlightParts(text: string, query: string): { text: string; match: boolean }[] {
  const normalized = normalizeSearch(query);
  if (!normalized || normalized.includes(" ")) return [{ text, match: false }];
  const units = [...text];
  let plain = "";
  const offsets: number[] = [];
  units.forEach((unit, i) => {
    for (const character of normalizeSearch(unit)) { plain += character; offsets.push(i); }
    if (unit === " ") { plain += " "; offsets.push(i); }
  });
  const start = plain.indexOf(normalized);
  if (start < 0) return [{ text, match: false }];
  const from = offsets[start], to = offsets[start + normalized.length - 1] + 1;
  return [{ text: units.slice(0, from).join(""), match: false }, { text: units.slice(from, to).join(""), match: true }, { text: units.slice(to).join(""), match: false }];
}
