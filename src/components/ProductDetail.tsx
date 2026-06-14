import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

export default function ProductDetail({
  product,
  isOpen,
  onClose,
  isFavorite,
  onFavoriteToggle,
  onAddToCart
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  // Set default selection on render
  if (product.sizes?.length && !selectedSize) {
    setSelectedSize(product.sizes[0]);
  }
  if (product.colors?.length && !selectedColor) {
    setSelectedColor(product.colors[0].name);
  }

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop Blur overlay */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal sheet content sliding from bottom */}
          <motion.div
            id="modal-sheet-content"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-white w-full max-w-lg rounded-t-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
          >
            {/* Top Indicator Handle bar */}
            <div className="mx-auto my-3 w-12 h-1 bg-gray-200 rounded-full flex-shrink-0" />
            
            {/* Close & Wishlist absolute buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <button
                id="btn-detail-favorite"
                onClick={() => onFavoriteToggle(product.id)}
                className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full flex items-center justify-center transition-colors active-scale"
                aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'text-brand-accent fill-brand-accent' : 'text-brand-primary'}`} />
              </button>
              <button
                id="btn-detail-close"
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full flex items-center justify-center transition-colors active-scale"
                aria-label="Close product detail"
              >
                <X className="w-5 h-5 text-brand-primary" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="overflow-y-auto px-6 pb-24 flex-grow hide-scrollbar">
              {/* Product Aspect Image */}
              <div id="detail-image-box" className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 mb-6 mt-2 shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Price */}
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold tracking-tight text-brand-primary leading-snug">
                  {product.name}
                </h2>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-brand-accent">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-brand-secondary line-through font-medium">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating & Reviews counter */}
              <div className="flex items-center gap-1.5 mb-5 select-none">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="text-sm font-bold text-brand-primary">
                  {product.rating}
                </span>
                <span className="text-xs text-brand-secondary">
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Description body */}
              <p className="text-brand-secondary text-sm leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Colors Option selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-3">
                    Select Color:{' '}
                    <span className="text-sm text-brand-secondary capitalize ml-1 font-normal">
                      {selectedColor}
                    </span>
                  </h3>
                  <div className="flex gap-2.5">
                    {product.colors.map(col => {
                      const isActive = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all border ${
                            isActive 
                              ? 'ring-2 ring-brand-primary ring-offset-2 scale-105 border-transparent' 
                              : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {isActive && (
                            <Check className={`w-4 h-4 ${
                              col.hex === '#f8fafc' || col.hex === '#e2e8f0' || col.hex === '#f1f5f9'
                                ? 'text-brand-primary' 
                                : 'text-white'
                            }`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes Option selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-3">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => {
                      const isActive = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                            isActive
                              ? 'bg-brand-primary text-white scale-102 shadow-sm'
                              : 'bg-gray-50 text-brand-primary border border-gray-200/80 hover:bg-gray-100'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bullet Features specifications */}
              <div className="mb-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-3">
                  Highlights
                </h3>
                <ul className="space-y-2 select-none">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-brand-secondary gap-2.5 leading-snug">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Add to Cart action block */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-sm border-t border-gray-100 flex items-center select-none z-20">
              <button
                id="btn-detail-add-to-cart"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide transition-all shadow-md active-scale cursor-pointer ${
                  isAdded 
                    ? 'bg-emerald-500 text-white shadow-emerald-200/30' 
                    : 'bg-brand-primary text-white hover:bg-opacity-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2 animate-bounce" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Bag - ₹{product.price.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
