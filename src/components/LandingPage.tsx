import React, { useState } from 'react';
import {
  Zap,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Product } from '../types.ts';

interface LandingPageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  selectedCategory,
  onSelectCategory,
  searchQuery
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  // Hero flagship product
  const heroProduct = products.find((p) => p.id === 'volt-audio-pro') || products[0];

  // Filter products based on search or category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Showcase Banner */}
      {selectedCategory === 'all' && !searchQuery && heroProduct && (
        <section className="relative border-b border-slate-800 bg-linear-to-b from-slate-900 to-slate-950 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Hero Copy & Value Prop */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" /> Deal of the Day
                  </span>
                  <span>·</span>
                  <span className="text-slate-400">Save $80.00 Today</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                  Aura SoundMax <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-200">
                    Studio ANC Headphones
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Engineered with 45mm beryllium drivers, 48dB hybrid noise cancellation, and lossless LDAC streaming for pure master-grade acoustic reproduction.
                </p>

                {/* Rating & Social Proof */}
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">4.9 / 5.0</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">3,120 Verified Reviews</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock
                  </span>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2 flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                    ${heroProduct.price.toFixed(2)}
                  </span>
                  <span className="text-slate-500 text-lg line-through font-mono tabular-nums">
                    ${heroProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                    19% OFF
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectProduct(heroProduct.id)}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={(e) => handleQuickAdd(e, heroProduct)}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2"
                  >
                    {addedId === heroProduct.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                        <span className="text-emerald-400">Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Quick Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> Free Next-Day Prime Delivery
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 2-Yr Direct Warranty
                  </span>
                </div>
              </div>

              {/* Right Column: Hero High-Res Imagery */}
              <div className="lg:col-span-6 relative">
                <div
                  onClick={() => onSelectProduct(heroProduct.id)}
                  className="cursor-pointer group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl"
                >
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.title}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-16/9 object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded text-slate-200 border border-slate-800">
                      Master Edition · Titanium Hardware
                    </span>
                    <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                      Explore Product <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust & Assurance Bar (Amazon-Style Assurance) */}
      <section className="border-b border-slate-800 bg-slate-900/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-white">Free Prime Delivery</div>
              <div className="text-slate-400 text-[11px]">Guaranteed next-day delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white">30-Day Hassle-Free Returns</div>
              <div className="text-slate-400 text-[11px]">No questions asked refunds</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="font-bold text-white">Official 2-Year Warranty</div>
              <div className="text-slate-400 text-[11px]">Full manufacturer parts coverage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-white">24/7 Tech Concierge</div>
              <div className="text-slate-400 text-[11px]">Direct hardware support team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Curated Hardware
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Electronics & Deals"}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'audio', label: 'Audio' },
              { id: 'computing', label: 'Laptops' },
              { id: 'wearables', label: 'Wearables' },
              { id: 'cameras', label: 'Cameras' },
              { id: 'gaming', label: 'Gaming' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl p-8 bg-slate-900/40">
            <h3 className="text-lg font-bold text-white mb-2">No matching products found</h3>
            <p className="text-xs text-slate-400 mb-6">
              Try searching for "headphones", "laptop", "smartwatch", or reset your category filter.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="group bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-4/3 bg-slate-950 overflow-hidden border-b border-slate-800/80">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                        #1 Best Seller
                      </span>
                    )}
                    {product.isAmazonChoice && (
                      <span className="bg-slate-950/90 border border-slate-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        Volt's Choice
                      </span>
                    )}
                  </div>

                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 right-3 bg-rose-600/90 text-white text-[11px] font-black px-2 py-0.5 rounded">
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                      <span className="font-semibold text-amber-400/90 uppercase tracking-wider text-[11px]">
                        {product.brand}
                      </span>
                      <span>·</span>
                      <span>{product.categoryLabel}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 line-clamp-2 transition-colors leading-snug mb-2">
                      {product.title}
                    </h3>

                    {/* Amazon-style Rating Stars */}
                    <div className="flex items-center gap-2 text-xs mb-3">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-white text-[11px] font-mono">
                        {product.rating}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 text-[11px]">
                        {product.reviewsCount.toLocaleString()}
                      </span>
                    </div>

                    {/* Prime & Stock indicators */}
                    <div className="text-[11px] space-y-1 mb-4">
                      {product.isPrime && (
                        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                          <Zap className="w-3 h-3 fill-amber-400" />
                          <span>⚡ Prime Next-Day Delivery</span>
                        </div>
                      )}
                      <div className="text-slate-400">
                        {product.stockCount < 10 ? (
                          <span className="text-rose-400 font-semibold">
                            Only {product.stockCount} left in stock - order soon
                          </span>
                        ) : (
                          <span className="text-emerald-400">In Stock</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-white font-mono tabular-nums">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">Free delivery on orders $35+</div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Verified Customer Feedback Section */}
      <section className="border-t border-slate-800 bg-slate-900/40 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
              Trusted by Over 250,000 Hardware Enthusiasts
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Read real customer impressions from audio engineers, software developers, and creators worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The Aura SoundMax ANC completely blew away my expectations. The beryllium drivers deliver crisp transients without fatiguing highs. Delivery arrived at 9am the very next morning."
              </p>
              <div className="text-[11px] pt-2 border-t border-slate-800 text-slate-400 flex items-center justify-between">
                <span className="font-bold text-white">David K.</span>
                <span className="text-emerald-400 font-semibold">Verified Buyer</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "I use the Titan Arc 15 Pro for 4K video rendering and Docker workloads. It stays cool under sustained loads and the 3.2K OLED panel has flawless color accuracy."
              </p>
              <div className="text-[11px] pt-2 border-t border-slate-800 text-slate-400 flex items-center justify-between">
                <span className="font-bold text-white">Samantha L.</span>
                <span className="text-emerald-400 font-semibold">Verified Buyer</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Seamless checkout experience, genuine factory warranty registered directly, and prompt customer service. Volt is now my go-to electronics retailer."
              </p>
              <div className="text-[11px] pt-2 border-t border-slate-800 text-slate-400 flex items-center justify-between">
                <span className="font-bold text-white">Ray Tanaka</span>
                <span className="text-emerald-400 font-semibold">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
