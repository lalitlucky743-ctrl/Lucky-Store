import React, { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: (id: string, e: MouseEvent) => void;
  onSelect: (product: Product) => void;
  index: number;
}

export default function ProductCard({
  product,
  isFavorite,
  onFavoriteToggle,
  onSelect,
  index
}: ProductCardProps) {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl overflow-hidden soft-card-shadow active-scale flex flex-col cursor-pointer hover:shadow-md transition-shadow group h-full"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Favorite Icon Button */}
        <button
          id={`btn-favorite-${product.id}`}
          onClick={(e) => onFavoriteToggle(product.id, e)}
          className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm p-2 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active-scale duration-150 border border-gray-100"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite 
                ? 'text-brand-accent fill-brand-accent' 
                : 'text-brand-primary'
            }`} 
          />
        </button>

        {product.originalPrice && (
          <span 
            id={`badge-sale-${product.id}`}
            className="absolute bottom-3 left-3 bg-brand-accent text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
          >
            Sale
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow select-none">
        <h4 className="font-semibold text-sm text-brand-primary truncate leading-snug">
          {product.name}
        </h4>
        <div className="flex justify-between items-baseline mt-1">
          <span className="font-bold text-base text-brand-primary">
            ₹{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-brand-secondary line-through ml-1.5 font-medium">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
