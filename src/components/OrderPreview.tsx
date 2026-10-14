"use client";
import { useRef, useState } from "react";
import { Check, Copy, MessageCircle, ShieldCheck } from "lucide-react";
import type { ListItem } from "@/lib/list";
import { makeOrderPreview } from "@/lib/list";
import { Modal } from "./Modal";
export function OrderPreview({ items, onClose }: { items: ListItem[]; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const text = makeOrderPreview(items);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setCopyError(false); }
    catch { textRef.current?.focus(); textRef.current?.select(); setCopyError(true); }
  }
  return <Modal title="هيك ممكن تكون قائمتك" onClose={onClose}><div className="order-preview"><div className="message-title"><span><MessageCircle size={24} /></span><div><strong>عنب كاندي</strong><small>تصوّر لقائمة الاستفسار</small></div><span className="demo-pill">معاينة</span></div><label className="sr-only" htmlFor="order-text">نص القائمة التجريبية</label><textarea id="order-text" ref={textRef} className="message-bubble" readOnly value={text} rows={Math.min(15, items.length + 7)} /><div className="order-notice"><ShieldCheck size={18} /><span>هذه تجربة توضيحية. لم يتم إرسال أي طلب.</span></div><button className="button button-primary" onClick={copy}>{copied ? <><Check size={18} />تم نسخ القائمة</> : <><Copy size={18} />نسخ القائمة</>}</button>{copyError && <p role="status" className="copy-help">حددنا النص لك؛ استخدم النسخ من متصفحك.</p>}<button className="button button-text" onClick={onClose}>إغلاق المعاينة</button></div></Modal>;
}
