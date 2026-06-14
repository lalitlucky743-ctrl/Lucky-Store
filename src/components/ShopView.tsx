import React, { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';

interface ShopViewProps {
  onProductSelect: (p: Product) => void;
  favorites: string[];
  onFavoriteToggle: (id: string, e: MouseEvent) => void;
  selectedCategory: 'Apparel' | 'Tech' | 'Home' | 'Beauty' | null;
  onCategorySelect: (category: 'Apparel' | 'Tech' | 'Home' | 'Beauty' | null) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export default function ShopView({
  onProductSelect,
  favorites,
  onFavoriteToggle,
  selectedCategory,
  onCategorySelect
}: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0; // default
  });

  const categoriesList: ('Apparel' | 'Tech' | 'Home' | 'Beauty')[] = ['Apparel', 'Tech', 'Home', 'Beauty'];

  return (
    <div id="shop-view-wrapper" className="pb-24">
      {/* Real-time search bar search input */}
      <div className="px-5 mt-4">
        <div className="relative flex items-center">
          <span className="absolute left-4 text-brand-secondary pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            id="input-shop-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search premium pieces..."
            className="w-full bg-gray-50 border border-gray-100/90 rounded-xl pl-12 pr-11 py-3.5 text-sm font-medium text-brand-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-primary/50 focus:border-brand-primary/40 focus:bg-white transition-all shadow-sm"
          />
          <button 
            id="btn-shop-filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3.5 p-1.5 text-brand-secondary hover:text-brand-primary rounded-lg transition-colors active-skale"
            aria-label="Toggle sort options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide-out quick sort drawer option */}
      {showFilters && (
        <motion.div 
          id="shop-sort-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-5 mt-3 select-none"
        >
          <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 flex flex-wrap gap-4 justify-between items-center">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort Items
            </span>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { label: 'Default', value: 'default' },
                  { label: 'Price: Low to High', value: 'price-asc' },
                  { label: 'Price: High to Low', value: 'price-desc' },
                  { label: 'Rating', value: 'rating' }
                ] as const
              ).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortOption(opt.value)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    sortOption === opt.value 
                      ? 'bg-brand-primary text-white shadow-sm' 
                      : 'bg-white text-brand-secondary border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Horizontal categories list */}
      <div className="px-5 mt-6 mb-4 flex gap-2 overflow-x-auto hide-scrollbar select-none">
        <button
          id="pill-cat-all"
          onClick={() => onCategorySelect(null)}
          className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border shrink-0 cursor-pointer ${
            selectedCategory === null
              ? 'bg-brand-primary text-white border-brand-primary shadow-sm scale-102'
              : 'bg-white text-brand-secondary border-gray-200/80 hover:bg-gray-50'
          }`}
        >
          All Pieces
        </button>
        {categoriesList.map(cat => (
          <button
            id={`pill-cat-${cat.toLowerCase()}`}
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm scale-102'
                : 'bg-white text-brand-secondary border-gray-200/80 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter items results header */}
      <div className="px-5 mb-5 flex justify-between items-center select-none">
        <p className="text-xs font-semibold tracking-wide text-brand-secondary">
          Showing {filteredProducts.length} Premium Pieces
        </p>
      </div>

      {/* Main Grid display list */}
      {filteredProducts.length > 0 ? (
        <div id="shop-grid" className="grid grid-cols-2 gap-4 px-5">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onFavoriteToggle={onFavoriteToggle}
              onSelect={onProductSelect}
              index={idx}
            />
          ))}
        </div>
      ) : (
        <div id="shop-empty-state" className="px-5 py-12 text-center select-none">
          <p className="text-sm font-semibold text-brand-secondary mb-1">
            No premium matches found
          </p>
          <p className="text-xs text-brand-secondary/70">
            Try resetting any filter or searching style terms
          </p>
        </div>
      )}
    </div>
  );
}
