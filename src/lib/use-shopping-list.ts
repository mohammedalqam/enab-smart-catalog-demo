"use client";
import { useEffect, useState } from "react";
import { catalogConfig } from "@/config/catalog.config";
import { productMap } from "@/data/products";
import { MAX_QUANTITY, sanitizeList, type ListItem } from "@/lib/list";

export function useShoppingList() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    try { setItems(sanitizeList(JSON.parse(localStorage.getItem(catalogConfig.storageKey) || "[]"))); }
    catch { /* A damaged value is ignored; the current session still works. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(catalogConfig.storageKey, JSON.stringify(items)); }
    catch { setStorageAvailable(false); }
  }, [items, ready]);
  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key !== catalogConfig.storageKey) return;
      try { setItems(sanitizeList(JSON.parse(event.newValue || "[]"))); } catch { /* Ignore malformed cross-tab data. */ }
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  return {
    items, storageAvailable,
    total: items.reduce((sum, item) => sum + item.quantity, 0),
    add(id: string, quantity = 1) {
      if (!productMap.get(id)?.isAvailable || !Number.isFinite(quantity) || quantity < 1) return;
      setItems(current => {
        const existing = current.find(item => item.id === id);
        return existing ? current.map(item => item.id === id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + Math.floor(quantity)) } : item)
          : [...current, { id, quantity: Math.min(MAX_QUANTITY, Math.floor(quantity)) }];
      });
    },
    change(id: string, quantity: number) {
      if (!Number.isFinite(quantity)) return;
      setItems(current => quantity <= 0 ? current.filter(item => item.id !== id)
        : current.map(item => item.id === id ? { ...item, quantity: Math.min(MAX_QUANTITY, Math.floor(quantity)) } : item));
    },
    remove(id: string) { setItems(current => current.filter(item => item.id !== id)); },
    clear() { setItems([]); },
  };
}
