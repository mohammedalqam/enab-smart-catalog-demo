"use client";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export function Modal({ title, onClose, children, kind = "default" }: { title: string; onClose: () => void; children: ReactNode; kind?: "default" | "product" | "list" }) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const closeRef = useRef(onClose); closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.documentElement.style.overflow;
    dialog?.showModal(); document.documentElement.style.overflow = "hidden";
    return () => { dialog?.close(); document.documentElement.style.overflow = originalOverflow; if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className={`modal modal-${kind}`} aria-labelledby={id} onCancel={event => { event.preventDefault(); closeRef.current(); }} onClick={event => { if (event.target === event.currentTarget) closeRef.current(); }}>
    <div className="modal-shell"><div className="modal-header"><h2 id={id}>{title}</h2><button className="icon-button modal-close" onClick={onClose} aria-label="إغلاق النافذة" autoFocus><X size={22} /></button></div>{children}</div>
  </dialog>;
}
