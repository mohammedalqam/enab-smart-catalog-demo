import { access, readdir, stat } from "node:fs/promises";
const files = (await readdir("public/products")).filter(file => file.endsWith(".webp"));
if (files.length !== 30) throw new Error(`Expected 30 WebP products, found ${files.length}`);
for (let i = 1; i <= 30; i++) {
  const path = `public/products/p${String(i).padStart(2, "0")}.webp`;
  const file = await stat(path);
  if (file.size < 1000) throw new Error(`Empty or damaged asset: ${path}`);
}
await access("public/hero.webp"); await access("public/share.jpg");
console.log("PASS: 30 local product assets, hero and sharing image are present.");
