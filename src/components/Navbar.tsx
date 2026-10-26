import React, { useState } from 'react';
import { Search, ShoppingBag, MapPin, Zap, ChevronDown, ShieldCheck, X } from 'lucide-react';
import { CATEGORIES } from '../data/mockProducts.ts';

interface NavbarProps {
  activePage: 'landing' | 'product' | 'checkout';
  onNavigate: (page: 'landing' | 'product' | 'checkout', productId?: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  const [deliveryLocation, setDeliveryLocation] = useState('New York, NY 10001');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(deliveryLocation);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activePage !== 'landing') {
      onNavigate('landing');
    }
  };

  const handleLocationSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempLocation.trim()) {
      setDeliveryLocation(tempLocation.trim());
    }
    setIsLocationModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md">
      {/* Prime Fast Track Announcement Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> VOLT PRIME
            </span>
            <span className="text-slate-500">|</span>
            <span>Free Next-Day Delivery on orders over $35</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">Use code <strong className="text-amber-300 font-mono">TECH20</strong> for 20% off</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 2-Year Direct Warranty
            </span>
            <button
              onClick={() => onNavigate('landing')}
              className="hover:text-white transition-colors"
            >
              Order Tracking
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-6">
        {/* Brand Wordmark & Location */}
        <div className="flex items-center gap-5 shrink-0">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-1.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-lg tracking-tight">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                VOLT
              </span>
              <span className="text-xs tracking-wider uppercase text-amber-400 ml-1 font-semibold">
                ELECTRONICS
              </span>
            </div>
          </button>

          {/* Delivery Location Selector */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden lg:flex items-center gap-2 text-left px-2.5 py-1.5 rounded hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors text-xs"
            title="Change delivery location"
          >
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-slate-400 leading-none">Deliver to</div>
              <div className="font-semibold text-white truncate max-w-[130px] leading-snug">
                {deliveryLocation}
              </div>
            </div>
          </button>
        </div>

        {/* Amazon-style Central Search with Category Dropdown */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl relative flex items-center">
          <div className="relative shrink-0 hidden sm:block">
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="h-10 px-3 bg-slate-800 hover:bg-slate-700 border-r border-slate-700 text-xs font-medium text-slate-200 rounded-l-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>{CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'All'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showCategoryDropdown && (
              <div className="absolute left-0 top-11 w-52 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setShowCategoryDropdown(false);
                      if (activePage !== 'landing') onNavigate('landing');
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      selectedCategory === cat.id ? 'text-amber-400 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-slate-500 font-mono text-[11px]">({cat.count})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 4K monitors, wireless headphones, laptops, cameras..."
              className="w-full h-10 px-3.5 bg-slate-800/90 text-sm text-white placeholder-slate-400 rounded-l-lg sm:rounded-l-none focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-700 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="submit"
            className="h-10 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-r-lg transition-colors flex items-center justify-center shrink-0"
            aria-label="Submit search"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Actions Zone */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Page Jump for Testing / Navigation */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-800/60 p-1 rounded-lg text-xs font-medium text-slate-400">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activePage === 'landing' ? 'bg-amber-500 text-slate-950 font-semibold' : 'hover:text-white'
              }`}
            >
              1. Storefront
            </button>
            <button
              onClick={() => onNavigate('product', 'volt-audio-pro')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activePage === 'product' ? 'bg-amber-500 text-slate-950 font-semibold' : 'hover:text-white'
              }`}
            >
              2. Product
            </button>
            <button
              onClick={() => onNavigate('checkout')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activePage === 'checkout' ? 'bg-amber-500 text-slate-950 font-semibold' : 'hover:text-white'
              }`}
            >
              3. Checkout
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/40 text-white transition-all group"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-900">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <span className="text-slate-400 block leading-none">Cart</span>
              <span className="font-bold text-white font-mono tabular-nums leading-snug">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Secondary Department Subnav Bar */}
      <nav className="bg-slate-950 border-t border-slate-800 px-4 sm:px-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-6 py-2 text-xs font-medium text-slate-300">
          <button
            onClick={() => {
              onSelectCategory('all');
              if (activePage !== 'landing') onNavigate('landing');
            }}
            className={`whitespace-nowrap hover:text-amber-400 transition-colors ${
              selectedCategory === 'all' && activePage === 'landing' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            All Departments
          </button>
          <button
            onClick={() => {
              onSelectCategory('audio');
              if (activePage !== 'landing') onNavigate('landing');
            }}
            className={`whitespace-nowrap hover:text-amber-400 transition-colors ${
              selectedCategory === 'audio' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Audio & Headphones
          </button>
          <button
            onClick={() => {
              onSelectCategory('computing');
              if (activePage !== 'landing') onNavigate('landing');
            }}
            className={`whitespace-nowrap hover:text-amber-400 transition-colors ${
              selectedCategory === 'computing' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Laptops & Computers
          </button>
          <button
            onClick={() => {
              onSelectCategory('wearables');
              if (activePage !== 'landing') onNavigate('landing');
            }}
            className={`whitespace-nowrap hover:text-amber-400 transition-colors ${
              selectedCategory === 'wearables' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Smart Watches & Health
          </button>
          <button
            onClick={() => {
              onSelectCategory('cameras');
              if (activePage !== 'landing') onNavigate('landing');
            }}
            className={`whitespace-nowrap hover:text-amber-400 transition-colors ${
              selectedCategory === 'cameras' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Cinema & Cameras
          </button>
          <button
            onClick={() => {
              onSelectCategory('gaming');
              if (activePage !== 'landing') onNavigate('landing');
            }}
            className={`whitespace-nowrap hover:text-amber-400 transition-colors ${
              selectedCategory === 'gaming' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Gaming & Consoles
          </button>

          <span className="text-slate-600 hidden md:inline">|</span>

          <span className="text-amber-400/90 font-semibold whitespace-nowrap hidden lg:flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-amber-400" /> Today's Lightning Deals Live
          </span>
        </div>
      </nav>

      {/* Change Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" /> Choose Your Delivery Location
              </h3>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Delivery options and speed vary based on your postal location. Enter your city or zip code to view accurate Prime arrival times.
            </p>
            <form onSubmit={handleLocationSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  City, State or ZIP Code
                </label>
                <input
                  type="text"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA 94107"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setTempLocation('Austin, TX 78701');
                  }}
                  className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  Austin 78701
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempLocation('Seattle, WA 98101');
                  }}
                  className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  Seattle 98101
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempLocation('Chicago, IL 60601');
                  }}
                  className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  Chicago 60601
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors"
                >
                  Update Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
