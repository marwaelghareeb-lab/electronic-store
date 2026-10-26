import React from 'react';
import { ChevronUp, Zap, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onBackToTop: () => void;
  onNavigate: (page: 'landing' | 'product' | 'checkout', productId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop, onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-12">
      {/* Back to top button */}
      <button
        onClick={onBackToTop}
        className="w-full py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold transition-colors flex items-center justify-center gap-1.5 border-b border-slate-800"
      >
        <ChevronUp className="w-4 h-4" />
        <span>Back to top</span>
      </button>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Get to Know Us</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-amber-400 transition-colors">
                  About Volt Electronics
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Engineering & Lab Facilities</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Acoustic Testing Chambers</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Sustainability & E-Waste Recycling</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Careers at Volt</span>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Shop with Us</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-amber-400 transition-colors">
                  Today's Lightning Deals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product', 'volt-audio-pro')} className="hover:text-amber-400 transition-colors">
                  Aura Studio Headphones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product', 'volt-laptop-titan')} className="hover:text-amber-400 transition-colors">
                  Titan Arc 15 Pro Laptops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product', 'volt-gaming-box')} className="hover:text-amber-400 transition-colors">
                  Aura Play One Gaming
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('checkout')} className="hover:text-amber-400 transition-colors">
                  Your Cart & Checkout
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Volt Payment & Prime</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white cursor-pointer">Volt Business Accounts</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Prime Next-Day Delivery Terms</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Apple Pay & 1-Click Buy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Gift Cards & Promotional Codes</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Price Match Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Let Us Help You</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white cursor-pointer">24/7 Tech Concierge Support</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Shipping Rates & Speed Policies</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">30-Day Hassle-Free Returns</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Manufacturer Warranty Claims</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Product Safety & Recalls</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Region & Brand Lockup */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-black">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="font-bold text-white tracking-tight">VOLT ELECTRONICS</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Prime E-Commerce Platform</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>English (United States)</span>
            </div>
            <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-mono">
              USD ($)
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-slate-500 text-[11px] space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Conditions of Use</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Privacy Notice</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Consumer Health Data Privacy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Interest-Based Ads</span>
          </div>
          <p>© 2026 Volt Electronics Store, Inc. or its affiliates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
