import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onViewProduct: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onViewProduct
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const warrantyCost = item.withWarranty ? 29.99 : 0;
    return acc + (item.finalPrice + warrantyCost) * item.quantity;
  }, 0);

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 text-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              Shopping Cart <span className="text-xs font-normal text-slate-400">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-slate-850 px-4 py-2.5 border-b border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            {remainingForFree <= 0 ? (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" /> You qualify for FREE Prime Delivery!
              </span>
            ) : (
              <span className="text-slate-300">
                Add <strong className="text-amber-400">${remainingForFree.toFixed(2)}</strong> more for <strong>FREE Prime Next-Day Delivery</strong>
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                remainingForFree <= 0 ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-16 h-16 text-slate-700 mb-4 stroke-1" />
              <p className="text-base font-semibold text-slate-200 mb-1">Your cart is empty</p>
              <p className="text-xs text-slate-400 mb-6 max-w-xs">
                Explore our catalog of flagship headphones, titanium laptops, smart wearables, and gaming consoles.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
              >
                Browse Today's Deals
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/60 border border-slate-750 rounded-xl p-3.5 flex gap-3.5 hover:border-slate-700 transition-colors"
              >
                {/* Thumbnail */}
                <button
                  onClick={() => {
                    onViewProduct(item.product.id);
                    onClose();
                  }}
                  className="w-20 h-20 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center p-1 group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </button>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <button
                      onClick={() => {
                        onViewProduct(item.product.id);
                        onClose();
                      }}
                      className="text-xs font-semibold text-white hover:text-amber-400 text-left line-clamp-2 transition-colors"
                    >
                      {item.product.shortTitle || item.product.title}
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-400 p-0.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 space-x-2 mb-2">
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    {item.selectedStorage && <span>· {item.selectedStorage}</span>}
                  </div>

                  {item.withWarranty && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 mb-2 font-medium">
                      <ShieldCheck className="w-3 h-3" /> 2-Yr Extended Care Plan (+$29.99)
                    </div>
                  )}

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/60">
                    <div className="flex items-center border border-slate-700 rounded-md bg-slate-900 overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-white font-mono tabular-nums">
                        ${((item.finalPrice + (item.withWarranty ? 29.99 : 0)) * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ${item.finalPrice.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-white tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Shipping</span>
                <span className="font-mono text-emerald-400">
                  {remainingForFree <= 0 ? 'FREE' : '$4.99'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taxes & Fees</span>
                <span className="text-[11px] text-slate-500">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Est. Total</span>
                <span className="font-mono text-amber-400 tabular-nums text-base">
                  ${(subtotal + (remainingForFree <= 0 ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <p className="text-[11px] text-center text-slate-500">
              🔒 256-bit Encrypted Checkout · 30-Day Money-Back Guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
