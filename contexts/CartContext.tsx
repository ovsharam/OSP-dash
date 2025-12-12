"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CartItem, Product, ShippingOption } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, shipping?: ShippingOption) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const showAddToast = (product: Product, quantity: number, thresholdAmount: number) => {
    const lineTotal = product.price * quantity;
    const remaining = Math.max(0, thresholdAmount - lineTotal);
    const percent = thresholdAmount > 0 ? Math.min(100, Math.round((lineTotal / thresholdAmount) * 100)) : 100;

    toast.custom(
      (t) => (
        <div
          className={`pointer-events-auto w-96 rounded-lg border border-gray-200 bg-white shadow-lg transition-all ${
            t.visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">Added to cart</div>
          <div className="p-4 flex gap-3">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
              <img
                src={product.images?.[0] || "/placeholder-product.jpg"}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</div>
              <div className="text-sm text-gray-600">{product.vendor?.name}</div>
              <div className="text-sm text-gray-700">Qty: {quantity}</div>
              <div className="flex items-center justify-between text-sm text-gray-900 font-semibold">
                <span>${lineTotal.toFixed(2)}</span>
                {thresholdAmount > 0 && (
                  <span className="text-gray-700">
                    ${thresholdAmount.toFixed(0)} minimum · ${remaining.toFixed(0)} to go
                  </span>
                )}
              </div>
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-green-700 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      { position: "top-right", duration: 4000 }
    );
  };

  const addToCart = (product: Product, quantity = 1, shipping?: ShippingOption) => {
    const minimum = product.minOrderQuantity ?? (product.category === "Beverages" ? 24 : 1);
    const normalizedQuantity = Math.max(minimum, quantity);
    const thresholdAmount = (product.minOrderQuantity || minimum) * product.price;
    let toastQuantity = normalizedQuantity;

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        toastQuantity = Math.max(minimum, (existingItem.quantity || 0) + normalizedQuantity);
        return prevItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: toastQuantity,
                selectedShipping: shipping || item.selectedShipping,
              }
            : item
        );
      }

      toastQuantity = normalizedQuantity;
      return [...prevItems, { product, quantity: normalizedQuantity, selectedShipping: shipping }];
    });

    showAddToast(product, toastQuantity, thresholdAmount);
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.product.id !== productId);
      }

      return prevItems.map((item) => {
        if (item.product.id !== productId) return item;
        const minimum = item.product.minOrderQuantity || 1;
        return { ...item, quantity: Math.max(minimum, quantity) };
      });
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const shippingCost = item.selectedShipping?.price || 0;
      return total + item.product.price * item.quantity + shippingCost;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

