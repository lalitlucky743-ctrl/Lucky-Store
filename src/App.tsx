import React, { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, SlidersHorizontal, Star } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';

// Component imports
import Header from './components/Header';
import Banner from './components/Banner';
import Categories from './components/Categories';
import FlashSale from './components/FlashSale';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ShopView from './components/ShopView';
import CartView from './components/CartView';
import ProfileView from './components/ProfileView';
import Navigation from './components/Navigation';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'cart' | 'profile'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Cart State (Persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopsoftly_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites State (Persisted)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('shopsoftly_favs');
    return saved ? JSON.parse(saved) : [];
  });

  // Active Category selection state (to bridge Home -> Shop seamless flows)
  const [selectedCategory, setSelectedCategory] = useState<'Apparel' | 'Tech' | 'Home' | 'Beauty' | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('shopsoftly_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shopsoftly_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Actions
  const handleFavoriteToggle = (id: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    setCartItems(prev => {
      // Find matching item in cart
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      }
    });
  };

  const handleQuantityChange = (productId: string, qty: number, size?: string, color?: string) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId, size, color);
      return;
    }
    setCartItems(prev => prev.map(item => 
      (item.product.id === productId && item.selectedSize === size && item.selectedColor === color) 
        ? { ...item, quantity: qty }
        : item
    ));
  };

  const handleRemoveFromCart = (productId: string, size?: string, color?: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
    ));
  };

  const handleClearCart = () => setCartItems([]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  // Navigates smoothly from home page elements directly into shop filters
  const handleCategoryFromHome = (cat: 'Apparel' | 'Tech' | 'Home' | 'Beauty' | null) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filters trending products for the Home view
  const trendingNowProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] flex flex-col font-sans select-none antialiased">
      
      {/* Dynamic Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={totalCartItems}
      />

      {/* Primary Page Canvas Content wrapper */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              id="home-view"
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pb-28"
            >
              {/* Season Editorial Hero Banner */}
              <Banner onExploreClick={() => setActiveTab('shop')} />

              {/* Categories horizontally scrollable circles */}
              <Categories
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategoryFromHome}
              />

              {/* Countdown Flash Sale section */}
              <FlashSale />

              {/* Centered Trending Now Grid panel matching mockup */}
              <section className="mt-10 px-5">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-xl text-brand-primary tracking-tight font-sans">
                    Trending Now
                  </h3>
                  <button 
                    id="btn-trending-sort-toggle"
                    onClick={() => setActiveTab('shop')}
                    className="text-brand-secondary hover:text-brand-primary p-2 -mr-2 transition-colors active-scale"
                    aria-label="View all items"
                  >
                    <SlidersHorizontal className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {trendingNowProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                      onFavoriteToggle={handleFavoriteToggle}
                      onSelect={handleProductSelect}
                      index={idx}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'shop' && (
            <motion.div
              id="shop-view"
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShopView
                onProductSelect={handleProductSelect}
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </motion.div>
          )}

          {activeTab === 'cart' && (
            <motion.div
              id="cart-view"
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CartView
                cartItems={cartItems}
                onUpdateQuantity={handleQuantityChange}
                onRemoveItem={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onNavigateHome={() => setActiveTab('home')}
              />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              id="profile-view"
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProfileView
                favorites={favorites}
                onProductSelect={handleProductSelect}
                onFavoriteToggle={handleFavoriteToggle}
                onCategorySelect={setSelectedCategory}
                onTabChange={setActiveTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Product Detail Bottom Sliding Sheet Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          // Prevent setting state on unmounted model by deferring cleanup
          setTimeout(() => setSelectedProduct(null), 300);
        }}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onFavoriteToggle={(id) => handleFavoriteToggle(id)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Bottom Nav Tabs Bar matching mockup layout */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartItemsCount={totalCartItems}
      />
    </div>
  );
}
