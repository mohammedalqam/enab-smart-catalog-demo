import { productMap } from "@/data/products";
export type ListItem = { id: string; quantity: number };
export const MAX_QUANTITY = 99;
export function sanitizeList(value: unknown): ListItem[] {
  if (!Array.isArray(value)) return [];
  const result = new Map<string, number>();
  value.slice(0, 100).forEach(item => {
    if (!item || typeof item !== "object" || typeof item.id !== "string") return;
    const product = productMap.get(item.id);
    if (!product?.isAvailable || typeof item.quantity !== "number" || !Number.isFinite(item.quantity) || item.quantity < 1) return;
    result.set(item.id, Math.min(MAX_QUANTITY, Math.floor(item.quantity)));
  });
  return Array.from(result, ([id, quantity]) => ({ id, quantity }));
}
export function makeOrderPreview(items: ListItem[]): string {
  return ["مرحبًا عنب كاندي 🍬", "", "حابب أستفسر عن المنتجات التالية:", "",
    ...items.map((item, index) => `${index + 1}. ${productMap.get(item.id)?.nameAr} × ${item.quantity}`),
    "", "هذه قائمة تجريبية للتوضيح فقط. لم يتم إرسال أي طلب."].join("\n");
}
