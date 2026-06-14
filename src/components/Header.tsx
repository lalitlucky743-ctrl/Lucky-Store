import React from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'shop' | 'cart' | 'profile';
  onTabChange: (tab: 'home' | 'shop' | 'cart' | 'profile') => void;
  cartCount: number;
}

export default function Header({ activeTab, onTabChange, cartCount }: HeaderProps) {
  const tabs: { id: 'home' | 'shop' | 'cart' | 'profile'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'cart', label: 'Cart' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 flex flex-col justify-center px-5 py-3 md:py-4 transition-all duration-300">
      {/* Top Row: Brand, Search & Cart */}
      <div className="flex justify-between items-center w-full">
        <button 
          id="btn-header-search"
          onClick={() => onTabChange('shop')}
          className="text-brand-primary p-2 -ml-2 rounded-full hover:bg-gray-50 active-scale duration-200 cursor-pointer"
          aria-label="Search items"
        >
          <Search className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <h1 
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-primary font-sans select-none cursor-pointer"
          onClick={() => onTabChange('home')}
        >
          Lucky Store
        </h1>
        
        <button 
          id="btn-header-cart"
          onClick={() => onTabChange('cart')}
          className="text-brand-primary p-2 -mr-2 rounded-full hover:bg-gray-50 active-scale duration-200 relative cursor-pointer"
          aria-label="View shopping cart"
        >
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
          {cartCount > 0 && (
            <span 
              id="badge-cart-count"
              className="absolute top-1 right-1 bg-brand-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Dynamic Navigation row matching user's requested layout */}
      <div className="flex justify-center mt-3.5 w-full border-t border-gray-50 pt-2.5">
        <nav className="flex gap-7 relative select-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`header-nav-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`relative pb-1.5 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-brand-primary' : 'text-brand-secondary/80 hover:text-brand-primary'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
