import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

interface CategoriesProps {
  onCategorySelect: (category: 'Apparel' | 'Tech' | 'Home' | 'Beauty' | null) => void;
  selectedCategory: 'Apparel' | 'Tech' | 'Home' | 'Beauty' | null;
}

export default function Categories({ onCategorySelect, selectedCategory }: CategoriesProps) {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center px-5 mb-4">
        <h3 className="font-bold text-xl text-brand-primary tracking-tight font-sans">
          Categories
        </h3>
        <button 
          id="btn-categories-see-all"
          onClick={() => onCategorySelect(null)}
          className={`font-semibold text-sm transition-colors ${
            selectedCategory === null ? 'text-brand-accent' : 'text-brand-secondary hover:text-brand-primary'
          }`}
        >
          See all
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto px-5 hide-scrollbar scroll-smooth snap-x">
        {CATEGORIES.map((cat, idx) => {
          const isActive = selectedCategory === cat.name;
          return (
            <motion.div
              id={`category-item-${cat.name.toLowerCase()}`}
              key={cat.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              onClick={() => onCategorySelect(isActive ? null : cat.name)}
              className="flex-shrink-0 snap-start flex flex-col items-center gap-2 cursor-pointer active-scale select-none"
            >
              <div 
                className={`w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden p-0.5 ${
                  isActive 
                    ? 'ring-2 ring-brand-accent scale-105 shadow-md' 
                    : 'ring-1 ring-gray-100 hover:ring-brand-accent/50 hover:shadow-sm'
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className={`text-xs font-semibold tracking-wide transition-colors ${
                isActive ? 'text-brand-accent font-bold' : 'text-brand-primary'
              }`}>
                {cat.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
