"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getCategory,
  getProduct,
  type Category,
  type Product,
  type ProductSize,
} from "./products";

// Cart state lives in localStorage so it is shared by every page (and every tab).
// It is exposed through useSyncExternalStore: the server and the first client render both
// see an empty cart, then React switches to the stored one without a hydration mismatch.
//
// A line key is the product slug, or "slug~sizeId" for a specific size (e.g. "medovyk~1kg").
// (v1 used "category:flavor" keys; it is simply ignored.)

const STORAGE_KEY = "krendel-cart-v2";
export const MAX_QTY = 20;

/** The first size is the base unit (same as the product price), so it uses the plain slug:
 *  adding a "шматочок" from the landing card, a category card or the product page lands on one line. */
export const lineKey = (slug: string, sizeId?: string) => {
  const base = getProduct(slug)?.sizes?.[0]?.id;
  return sizeId && sizeId !== base ? `${slug}~${sizeId}` : slug;
};

/** Resolve a key to its product and (optional) size; null if it no longer exists. */
function resolve(key: string): { product: Product; size?: ProductSize } | null {
  const [slug, sizeId] = key.split("~");
  const product = getProduct(slug);
  if (!product) return null;
  if (!sizeId || sizeId === product.sizes?.[0]?.id) return { product };
  const size = product.sizes?.find((s) => s.id === sizeId);
  return size ? { product, size } : null;
}

const listeners = new Set<() => void>();
let memory = "{}"; // fallback when localStorage is blocked (private mode etc.)

function read(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "{}";
  } catch {
    return memory;
  }
}

function write(next: string) {
  memory = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable: keep it in memory for this session */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => "{}";

/** key -> quantity. Unknown products/sizes or malformed values are dropped. */
function parse(raw: string): Record<string, number> {
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, number> = {};
    for (const [key, value] of Object.entries(data)) {
      const qty = Math.floor(Number(value));
      if (resolve(key) && Number.isFinite(qty) && qty > 0) {
        const [slug, sizeId] = key.split("~");
        const k = lineKey(slug, sizeId);
        out[k] = Math.min((out[k] ?? 0) + qty, MAX_QTY);
      }
    }
    return out;
  } catch {
    return {};
  }
}

export type CartLine = {
  key: string;
  product: Product;
  category: Category;
  size?: ProductSize;
  /** "шматочок", "шт.", "1 кг" … */
  unitLabel: string;
  qty: number;
  unitPrice: number;
  price: number;
};

export type CartToast = {
  id: number;
  /** "Додано в кошик" or a cap warning */
  title: string;
  name: string;
  /** secondary line: category (and size) */
  detail: string;
  /** pathname where it was created; the toast is only shown there */
  path: string;
};

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** Add `qty` pieces of a product (optionally a specific size). */
  add: (slug: string, opts?: { sizeId?: string; qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  toast: CartToast | null;
  dismissToast: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, read, getServerSnapshot);
  const counts = useMemo(() => parse(raw), [raw]);
  const [toast, setToast] = useState<CartToast | null>(null);
  const toastId = useRef(0);
  const pathname = usePathname();

  const setQty = useCallback((key: string, qty: number) => {
    const next = parse(read());
    if (qty <= 0) delete next[key];
    else next[key] = Math.min(Math.floor(qty), MAX_QTY);
    write(JSON.stringify(next));
  }, []);

  const add = useCallback(
    (slug: string, opts?: { sizeId?: string; qty?: number }) => {
      const key = lineKey(slug, opts?.sizeId);
      const found = resolve(key);
      if (!found) return;
      const qty = Math.max(1, Math.floor(opts?.qty ?? 1));
      const current = parse(read());
      const before = current[key] ?? 0;
      const after = Math.min(before + qty, MAX_QTY);
      const added = after - before;
      if (added > 0) {
        current[key] = after;
        write(JSON.stringify(current));
      }
      const category = getCategory(found.product.category)?.name ?? "";
      const where = found.size ? `${category} · ${found.size.label}` : category;
      toastId.current += 1;
      setToast({
        id: toastId.current,
        title: added > 0 ? "Додано в кошик" : "У кошику вже максимум",
        name:
          added > 1 ? `${found.product.name} × ${added}` : found.product.name,
        detail:
          added < qty
            ? `${where} · не більше ${MAX_QTY} шт. в одному рядку`
            : where,
        path: pathname,
      });
    },
    [pathname],
  );

  const remove = useCallback((key: string) => setQty(key, 0), [setQty]);
  const clear = useCallback(() => write("{}"), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo<CartValue>(() => {
    const lines: CartLine[] = [];
    for (const [key, qty] of Object.entries(counts)) {
      const found = resolve(key);
      const category = found && getCategory(found.product.category);
      if (!found || !category) continue;
      const unitPrice = found.size?.price ?? found.product.price;
      lines.push({
        key,
        product: found.product,
        category,
        size: found.size,
        unitLabel: found.size?.label ?? found.product.unit,
        qty,
        unitPrice,
        price: unitPrice * qty,
      });
    }
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.price, 0),
      add,
      setQty,
      remove,
      clear,
      toast,
      dismissToast,
    };
  }, [counts, add, setQty, remove, clear, toast, dismissToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
