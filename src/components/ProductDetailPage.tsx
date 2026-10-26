import React, { useState } from 'react';
import {
  Star,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Share2,
  Heart,
  HelpCircle,
  ThumbsUp,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { Product, CartItem } from '../types.ts';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
  onBackToStore: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onBackToStore
}) => {
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.colors?.[0] || 'Default'
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.variants?.storage?.[0] || 'Standard Edition'
  );
  const [withWarranty, setWithWarranty] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  // Additional price modifier for higher storage/bundle if applicable
  const storagePriceExtra =
    selectedStorage.includes('2TB') || selectedStorage.includes('Bundle') || selectedStorage.includes('64GB')
      ? 100
      : 0;
  const currentFinalPrice = product.price + storagePriceExtra;

  // Tomorrow's delivery date calculation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const createCartItem = (): CartItem => ({
    id: `${product.id}-${selectedColor}-${selectedStorage}-${Date.now()}`,
    product,
    quantity,
    selectedColor,
    selectedStorage,
    withWarranty,
    finalPrice: currentFinalPrice
  });

  const handleAddToCart = () => {
    const item = createCartItem();
    onAddToCart(item);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2200);
  };

  const handleBuyNow = () => {
    const item = createCartItem();
    onBuyNow(item);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={onBackToStore}
            className="hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Electronics
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="hover:text-amber-400 cursor-pointer">{product.categoryLabel}</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300 truncate max-w-xs sm:max-w-md">{product.shortTitle}</span>
        </nav>

        {/* 3-Column Amazon PDP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Image Gallery (4 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.isAmazonChoice && (
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-bold px-3 py-1 rounded">
                  Volt's Choice
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-500 bg-slate-900 p-0.5 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-xs text-slate-400 italic">
                Studio product photography · High-resolution optical rendering
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-amber-400">
                Guaranteed Assurance
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine Direct
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Free 30-Day Returns
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> 2-Yr Factory Warranty
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Secure Encryption
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Central Product Details & Specs (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Brand & Title */}
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                Brand: {product.brand}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Customer Rating Star Breakdown */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-white text-sm font-mono">{product.rating}</span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-400 hover:underline cursor-pointer">
                {product.reviewsCount.toLocaleString()} ratings
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Deal Price:</div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white font-mono tabular-nums">
                  ${currentFinalPrice.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-slate-500 text-sm line-through font-mono tabular-nums">
                    ${(product.originalPrice + storagePriceExtra).toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Applicable taxes calculated at checkout. Price Match Guarantee included.
              </p>
            </div>

            {/* Color Variant Selector */}
            {product.variants?.colors && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Color Finish: <span className="text-amber-400 font-normal">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedColor === color
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage / Configuration Selector */}
            {product.variants?.storage && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Configuration / Edition:{' '}
                  <span className="text-amber-400 font-normal">{selectedStorage}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.storage.map((storage) => (
                    <button
                      key={storage}
                      type="button"
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedStorage === storage
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features Bullet List */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                About this item
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {product.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0 leading-none mt-1">●</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Amazon Buy Box (3 cols on lg, Sticky) */}
          <div className="lg:col-span-3 sticky top-20">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div>
                <span className="text-2xl font-black text-white font-mono tabular-nums">
                  ${currentFinalPrice.toFixed(2)}
                </span>
                <div className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" /> FREE Prime Delivery
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Arrives <strong>{tomorrowFormatted}</strong>. Order within{' '}
                  <span className="text-amber-400 font-bold">2 hrs 14 mins</span>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" /> In Stock
                </div>
                <div className="text-[11px] text-slate-400">
                  Ships from and sold by <strong>Volt Direct Official</strong>.
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Quantity:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                >
                  {[1, 2, 3, 4, 5, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'unit' : 'units'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Protection Plan Addon */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={withWarranty}
                  onChange={(e) => setWithWarranty(e.target.checked)}
                  className="mt-0.5 rounded text-amber-500 focus:ring-amber-500 border-slate-700 bg-slate-900"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 2-Yr Volt Care Plan
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    +$29.99 for accidental damage & battery replacement
                  </div>
                </div>
              </label>

              {/* Primary Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isAddedSuccess ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3] text-slate-950" />
                      <span>Added to Shopping Cart!</span>
                    </>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white font-black rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Buy Now (Fast Checkout)</span>
                </button>
              </div>

              {/* Guarantee info */}
              <div className="space-y-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Secure 256-bit Transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Eligible for 30-Day Refund / Replacement</span>
                </div>
              </div>

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                  }`}
                />
                <span>{isWishlisted ? 'Added to Wishlist' : 'Add to Wish List'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Section: Technical Specifications & Customer Reviews */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex items-center gap-4 border-b border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold transition-colors ${
                activeTab === 'specs'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold transition-colors ${
                activeTab === 'reviews'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Reviews ({product.reviewsCount.toLocaleString()})
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden max-w-4xl">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950/60'}
                    >
                      <th className="py-3 px-4 font-semibold text-slate-300 w-1/3 border-b border-slate-800/60">
                        {key}
                      </th>
                      <td className="py-3 px-4 text-slate-400 font-mono border-b border-slate-800/60">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl">
              {/* Rating Histogram */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white">Customer Reviews</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-400 font-mono">
                    {product.rating}
                  </span>
                  <span className="text-xs text-slate-400">out of 5 stars</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {[
                    { star: '5 star', pct: '88%' },
                    { star: '4 star', pct: '9%' },
                    { star: '3 star', pct: '2%' },
                    { star: '2 star', pct: '1%' },
                    { star: '1 star', pct: '0%' }
                  ].map((row) => (
                    <div key={row.star} className="flex items-center gap-2 text-slate-400">
                      <span className="w-12 text-[11px] shrink-0">{row.star}</span>
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: row.pct }}
                        />
                      </div>
                      <span className="w-8 text-[11px] text-right font-mono">{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Feed */}
              <div className="lg:col-span-8 space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{rev.author}</span>
                        <span className="text-slate-500 text-[11px]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-slate-200">{rev.title}</span>
                      </div>
                      {rev.verified && (
                        <div className="text-[11px] text-amber-400 font-semibold">
                          Verified Purchase
                        </div>
                      )}
                      <p className="text-slate-300 leading-relaxed">{rev.content}</p>
                      <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{rev.helpfulCount} people found this helpful</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No written reviews yet for this model.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
