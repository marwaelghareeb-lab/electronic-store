import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/mockProducts.ts';
import { Product, CartItem, Order } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { ProductDetailPage } from './components/ProductDetailPage.tsx';
import { CheckoutPage } from './components/CheckoutPage.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { Footer } from './components/Footer.tsx';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Page Routing: 'landing' (Page 1) | 'product' (Page 2) | 'checkout' (Page 3)
  const [activePage, setActivePage] = useState<'landing' | 'product' | 'checkout'>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string>('volt-audio-pro');

  // Product Catalog
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Shopping Cart State (persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('volt_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('volt_cart_items', JSON.stringify(cartItems));
    } catch {
      // Ignore quota errors in sandbox
    }
  }, [cartItems]);

  // Attempt to fetch latest products from Express backend
  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Fallback to local PRODUCTS constant is already active
      });
  }, []);

  // Notifications helper
  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Cart Management
  const handleAddToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && !item.selectedColor && !item.selectedStorage
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        finalPrice: product.price
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    showToast(`Added "${product.shortTitle || product.title}" to cart`);
  };

  const handleAddCustomCartItem = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    showToast(`Added "${item.product.shortTitle || item.product.title}" to cart`);
  };

  const handleBuyNow = (item: CartItem) => {
    // Add item and immediately open Checkout (Page 3)
    setCartItems((prev) => [...prev, item]);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: newQty } : it))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  const handleOrderSuccess = (order: Order) => {
    // Clear cart upon successful checkout
    setCartItems([]);
    showToast(`Order ${order.orderNumber} placed successfully!`);
  };

  // Navigation Helper
  const navigateTo = (page: 'landing' | 'product' | 'checkout', productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProduct =
    products.find((p) => p.id === selectedProductId) || products[0] || PRODUCTS[0];

  const cartTotal = cartItems.reduce((acc, it) => {
    const warrantyCost = it.withWarranty ? 29.99 : 0;
    return acc + (it.finalPrice + warrantyCost) * it.quantity;
  }, 0);

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white p-0.5 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (activePage !== 'landing') setActivePage('landing');
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activePage !== 'landing') setActivePage('landing');
        }}
      />

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {activePage === 'landing' && (
          <LandingPage
            products={products}
            onSelectProduct={(id) => navigateTo('product', id)}
            onAddToCart={handleAddToCart}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
          />
        )}

        {activePage === 'product' && (
          <ProductDetailPage
            product={currentProduct}
            onAddToCart={handleAddCustomCartItem}
            onBuyNow={handleBuyNow}
            onBackToStore={() => navigateTo('landing')}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onOrderSuccess={handleOrderSuccess}
            onBackToStore={() => navigateTo('landing')}
          />
        )}
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          navigateTo('checkout');
        }}
        onViewProduct={(id) => {
          setIsCartOpen(false);
          navigateTo('product', id);
        }}
      />

      {/* Footer */}
      <Footer
        onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigate={navigateTo}
      />
    </div>
  );
}
