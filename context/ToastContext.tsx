"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onRemove();
    }, toast.duration ?? 4000);
    return () => clearTimeout(timerRef.current);
  }, [toast, onRemove]);

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={18} className="text-emerald-bright shrink-0" />,
    error:   <AlertCircle size={18} className="text-error shrink-0" />,
    info:    <Info        size={18} className="text-info shrink-0" />,
    warning: <AlertCircle size={18} className="text-warning shrink-0" />,
  };

  const borders: Record<ToastType, string> = {
    success: "border-l-emerald-bright",
    error:   "border-l-error",
    info:    "border-l-info",
    warning: "border-l-warning",
  };

  return (
    <div className={`toast border-l-2 ${borders[toast.type]}`}>
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ivory">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-smoke mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="text-smoke hover:text-ivory transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
