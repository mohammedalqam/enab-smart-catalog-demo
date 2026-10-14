import test from "node:test";
import assert from "node:assert/strict";
import { categories, products } from "../src/data/products";
import { filterProducts, highlightParts, normalizeSearch, searchProducts } from "../src/lib/search";
import { makeOrderPreview, sanitizeList } from "../src/lib/list";

test("exactly 30 unique products with the required category distribution", () => {
  assert.equal(products.length, 30);
  assert.equal(new Set(products.map(product => product.id)).size, 30);
  assert.equal(new Set(products.map(product => product.nameAr)).size, 30);
  assert.equal(new Set(products.map(product => product.image)).size, 30);
  assert.deepEqual(categories.map(category => products.filter(product => product.category === category.id).length), [6, 6, 5, 4, 4, 3, 2]);
  products.forEach(product => { assert.ok(product.nameAr && product.nameEn && product.descriptionAr && product.image); assert.equal(product.price, undefined); });
});
test("Arabic normalization removes marks, tatweel and alef variants", () => {
  assert.equal(normalizeSearch("أَشْرِطَة قــوس"), normalizeSearch("اشرطة قوس"));
  assert.equal(normalizeSearch("إآأا"), "اااا");
});
test("Arabic name and partial name searches find their products", () => {
  assert.ok(searchProducts("حلقات الخوخ").some(product => product.id === "p10"));
  assert.ok(searchProducts("مارش").some(product => product.id === "p11"));
  assert.ok(searchProducts("أشْرِطَة").some(product => product.id === "p08"));
});
test("English names and partial searches work", () => {
  assert.ok(searchProducts("gummy bears").some(product => product.id === "p07"));
  assert.ok(searchProducts("mango").some(product => product.id === "p19"));
  assert.ok(searchProducts("vanil").some(product => product.id === "p23"));
});
test("Arabic and English synonyms match relevant products", () => {
  for (const query of ["شوكلاطة", "شوكولاته", "chocolate"]) assert.ok(searchProducts(query).some(product => product.id === "p01"));
  assert.ok(searchProducts("فشار").some(product => product.id === "p15"));
  assert.ok(searchProducts("chips").some(product => product.id === "p13"));
  const sour = searchProducts("حلوى حامضة");
  assert.ok(sour.length > 0); assert.ok(sour.every(product => ["p08", "p10"].includes(product.id)));
});
test("small typos work without unrelated short-query matches", () => {
  assert.ok(searchProducts("choclate").some(product => product.id === "p01"));
  assert.ok(searchProducts("marshmellow").some(product => product.id === "p11"));
  assert.deepEqual(searchProducts("zz"), []);
  assert.deepEqual(searchProducts("غسالة ملابس"), []);
});
test("category, query, filter and sorting combine correctly", () => {
  assert.equal(filterProducts("", "chocolate", "all", "default").length, 6);
  assert.equal(filterProducts("", "all", "available", "default").length, 28);
  const filtered = filterProducts("حامض", "candy", "new", "az");
  assert.ok(filtered.length > 0); assert.ok(filtered.every(product => product.category === "candy" && product.isNew));
  const az = filterProducts("", "all", "all", "az").map(product => product.id);
  const za = filterProducts("", "all", "all", "za").map(product => product.id);
  assert.deepEqual(az, za.reverse());
  assert.equal(filterProducts("mango", "chocolate", "all", "default").length, 0);
});
test("highlighting keeps original display text intact", () => {
  const value = "أشرطة قوس قزح";
  const parts = highlightParts(value, "اشرطة");
  assert.equal(parts.map(part => part.text).join(""), value);
  assert.equal(parts.filter(part => part.match)[0].text, "أشرطة");
});
test("damaged storage, unknown products and unavailable items are ignored", () => {
  assert.deepEqual(sanitizeList(null), []);
  assert.deepEqual(sanitizeList({ items: [] }), []);
  assert.deepEqual(sanitizeList([{ id: "unknown", quantity: 2 }, { id: "p05", quantity: 1 }, { id: "p01", quantity: -1 }, { id: "p02", quantity: "2" }]), []);
  assert.deepEqual(sanitizeList([{ id: "p01", quantity: 2.9 }, { id: "p02", quantity: 999 }, { id: "p01", quantity: 3 }]), [{ id: "p01", quantity: 3 }, { id: "p02", quantity: 99 }]);
});
test("order preview includes quantities and explicit non-sending notice", () => {
  const result = makeOrderPreview([{ id: "p01", quantity: 2 }, { id: "p07", quantity: 3 }]);
  assert.ok(result.includes("شوكولاتة بالحليب × 2"));
  assert.ok(result.includes("دببة الجيلي × 3"));
  assert.ok(result.includes("لم يتم إرسال أي طلب"));
  assert.ok(!result.includes("wa.me") && !result.includes("https://"));
});
