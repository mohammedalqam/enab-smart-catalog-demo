import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/list";
export function QuantityControl({ value, onChange, name, minimum = 1 }: { value: number; onChange: (value: number) => void; name: string; minimum?: number }) {
  return <div className="quantity-control"><button onClick={() => onChange(value - 1)} disabled={value <= minimum} aria-label={`تقليل كمية ${name}`}><Minus size={16} /></button><output aria-label={`كمية ${name}`}>{value}</output><button onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label={`زيادة كمية ${name}`}><Plus size={16} /></button></div>;
}
