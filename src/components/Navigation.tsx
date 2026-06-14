import { Home, Grid, ShoppingCart, User } from 'lucide-react';

interface NavigationProps {
  activeTab: 'home' | 'shop' | 'cart' | 'profile';
  onTabChange: (tab: 'home' | 'shop' | 'cart' | 'profile') => void;
  cartItemsCount: number;
}

export default function Navigation({ activeTab, onTabChange, cartItemsCount }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center py-3.5 px-4 shadow-lg select-none pb-safe">
      {/* Home Tab */}
      <button
        id="nav-tab-home"
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center text-center transition-all duration-200 active-scale cursor-pointer ${
          activeTab === 'home' 
            ? 'text-brand-primary font-bold scale-102' 
            : 'text-brand-secondary hover:text-brand-primary'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'fill-brand-primary text-brand-primary' : 'text-brand-secondary'}`} />
        <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Home</span>
      </button>

      {/* Shop Tab */}
      <button
        id="nav-tab-shop"
        onClick={() => onTabChange('shop')}
        className={`flex flex-col items-center justify-center text-center transition-all duration-200 active-scale cursor-pointer ${
          activeTab === 'shop' 
            ? 'text-brand-primary font-bold scale-102' 
            : 'text-brand-secondary hover:text-brand-primary'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Shop</span>
      </button>

      {/* Cart Tab */}
      <button
        id="nav-tab-cart"
        onClick={() => onTabChange('cart')}
        className={`flex flex-col items-center justify-center text-center transition-all duration-200 active-scale cursor-pointer relative ${
          activeTab === 'cart' 
            ? 'text-brand-primary font-bold scale-102' 
            : 'text-brand-secondary hover:text-brand-primary'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Cart</span>
        {cartItemsCount > 0 && (
          <span 
            id="nav-cart-badge"
            className="absolute -top-1 right-1 bg-brand-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
          >
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Profile Tab */}
      <button
        id="nav-tab-profile"
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center text-center transition-all duration-200 active-scale cursor-pointer ${
          activeTab === 'profile' 
            ? 'text-brand-primary font-bold scale-102' 
            : 'text-brand-secondary hover:text-brand-primary'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Profile</span>
      </button>
    </nav>
  );
}
