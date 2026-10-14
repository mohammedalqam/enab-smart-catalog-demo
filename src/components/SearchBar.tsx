"use client";
import { Search, X, ArrowUpLeft } from "lucide-react";
import { useState, type RefObject } from "react";
export function SearchBar({ query, onChange, inputRef }: { query: string; onChange: (value: string) => void; inputRef: RefObject<HTMLInputElement | null> }) {
  const [focused, setFocused] = useState(false);
  const suggestions = ["شوكولاتة", "حلوى حامضة", "شيبس", "بسكويت"];
  return <div className="search-area" onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <label className="sr-only" htmlFor="product-search">ابحث باسم المنتج بالعربية أو الإنجليزية</label>
    <div className={`search-bar ${focused ? "is-focused" : ""}`}><Search size={25} className="search-leading" /><input id="product-search" ref={inputRef} type="search" autoComplete="off" placeholder="شو عبالك اليوم؟ دور على منتجك" value={query} onChange={event => onChange(event.target.value)} aria-controls="catalog-results" />
      {query ? <button className="icon-button" onClick={() => { onChange(""); inputRef.current?.focus(); }} aria-label="مسح البحث"><X size={19} /></button> : <kbd aria-hidden="true">/</kbd>}
    </div>
    {focused && !query && <div className="search-suggestions" aria-label="اقتراحات البحث"><span>جرّب تدور على</span>{suggestions.map(suggestion => <button key={suggestion} onClick={() => { onChange(suggestion); inputRef.current?.focus(); }}>{suggestion} <ArrowUpLeft size={13} /></button>)}</div>}
  </div>;
}
