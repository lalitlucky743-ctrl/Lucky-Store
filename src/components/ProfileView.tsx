import React, { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { User, ClipboardList, Heart, Sparkles, LogOut, CheckCircle, Gift, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProfileViewProps {
  favorites: string[];
  onProductSelect: (p: Product) => void;
  onFavoriteToggle: (id: string, e: MouseEvent) => void;
  onCategorySelect: (category: 'Apparel' | 'Tech' | 'Home' | 'Beauty' | null) => void;
  onTabChange: (tab: 'home' | 'shop' | 'cart' | 'profile') => void;
}

type ProfileTab = 'overview' | 'wishlist' | 'orders' | 'quiz';

export default function ProfileView({
  favorites,
  onProductSelect,
  onFavoriteToggle,
  onCategorySelect,
  onTabChange
}: ProfileViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<ProfileTab>('overview');
  
  // Style Quiz answers state
  const [styleAnswer, setStyleAnswer] = useState<string>('');
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Filter wishlist items
  const wishlistItems = PRODUCTS.filter(p => favorites.includes(p.id));

  // Mock static orders data
  const pastOrders = [
    {
      id: 'SS-904128',
      date: 'June 01, 2026',
      total: 309.00,
      items: 'Essential Wool Coat (1), Velocity Runners (1)',
      status: 'Delivered'
    },
    {
      id: 'SS-819234',
      date: 'May 14, 2026',
      total: 155.00,
      items: 'Artisan Frames (1)',
      status: 'Delivered'
    }
  ];

  const handleQuizSubmit = (vibe: string) => {
    setStyleAnswer(vibe);
    setSubmittedQuiz(true);
  };

  return (
    <div className="px-5 pb-24">
      {/* User profile upper card */}
      <div id="profile-top-card" className="flex items-center gap-4 py-6 select-none bg-white rounded-2xl p-4 soft-card-shadow border border-gray-100/50 mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xl tracking-wide shadow-sm shrink-0">
          LK
        </div>
        <div>
          <h2 className="text-lg font-bold text-brand-primary">Lalit Kumar</h2>
          <p className="text-xs text-brand-secondary">lalitlucky743@gmail.com</p>
          <div className="flex gap-2.5 mt-1.5 font-bold">
            <span className="text-[10px] text-brand-accent bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Gold Tier Member
            </span>
          </div>
        </div>
      </div>

      {/* Profile quick mini tabs */}
      <div className="flex gap-1.5 border-b border-gray-100 pb-3 mb-6 overflow-x-auto hide-scrollbar select-none">
        {(
          [
            { id: 'overview', label: 'Dashboard', icon: User },
            { id: 'wishlist', label: `Wishlist (${wishlistItems.length})`, icon: Heart },
            { id: 'orders', label: 'Past Orders', icon: ClipboardList },
            { id: 'quiz', label: 'AI Style Quiz', icon: Sparkles }
          ] as const
        ).map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isActive 
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm' 
                  : 'bg-white text-brand-secondary border-gray-100 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* DASHBOARD OVERVIEW SUB-TAB */}
      {activeSubTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 select-none">
          {/* Style recommendation block */}
          <div className="bg-gradient-to-br from-brand-primary to-slate-800 text-white rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="font-bold text-base mb-1">Tailored for You</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4 max-w-[220px]">
                {submittedQuiz 
                  ? `Your active style blueprint is matching our luxury ${styleAnswer || 'Minimalist'} inventory.`
                  : 'Complete our short Style Quiz to unlock personalized fashion blueprints curated by our design house.'
                }
              </p>
              <button
                onClick={() => setActiveSubTab('quiz')}
                className="bg-white text-brand-primary hover:bg-gray-50 transition-colors text-xs font-bold px-4 py-2 rounded-full cursor-pointer"
              >
                {submittedQuiz ? 'Recalibrate blueprint' : 'Unlock blueprint'}
              </button>
            </div>
            <Sparkles className="absolute right-4 bottom-4 w-16 h-16 text-brand-accent/20 rotate-12" />
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-brand-secondary">Points Balance</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-extrabold text-brand-primary">1,240</span>
                <span className="text-xs text-brand-accent font-bold">PTS</span>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-between" id="quick-voucher-redeem" onClick={() => onTabChange('shop')}>
              <span className="text-[10px] uppercase tracking-wider font-bold text-brand-secondary">Voucher reward</span>
              <div className="flex items-center gap-1.5 mt-2 cursor-pointer hover:text-brand-accent">
                <span className="text-xs font-bold text-brand-primary">CODE: WELCOME</span>
                <ChevronRight className="w-3.5 h-3.5 text-brand-accent" />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-2" />

          {/* Settings / General quick settings lists */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50 text-sm">
            <div className="p-4 flex justify-between items-center hover:bg-gray-50/50 cursor-pointer text-brand-primary font-medium" onClick={() => setActiveSubTab('orders')}>
              <span>Track recent shipments</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="p-4 flex justify-between items-center hover:bg-gray-50/50 cursor-pointer text-brand-primary font-medium" onClick={() => setActiveSubTab('wishlist')}>
              <span>Access favorite pieces</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="p-4 flex justify-between items-center hover:bg-gray-50/50 cursor-pointer text-brand-primary font-medium">
              <span>Customer service concierge</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </motion.div>
      )}

      {/* WISHLIST FAVORITES SUB-TAB */}
      {activeSubTab === 'wishlist' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="select-none">
          {wishlistItems.length > 0 ? (
            <div id="wishlist-flow-grid" className="grid grid-cols-2 gap-4">
              {wishlistItems.map((product, idx) => (
                <div
                  key={product.id}
                  onClick={() => onProductSelect(product)}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm active-scale cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <button
                      onClick={(e) => onFavoriteToggle(product.id, e)}
                      className="absolute top-2 right-2 bg-white/95 p-1.5 rounded-full shadow-sm text-brand-accent"
                    >
                      <Heart className="w-4 h-4 fill-brand-accent" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-xs text-brand-primary truncate">{product.name}</h4>
                    <span className="font-bold text-xs text-brand-primary mt-1 block">₹{product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center select-none">
              <Heart className="w-12 h-12 text-gray-200 mx-auto" />
              <p className="text-sm font-semibold text-brand-secondary mt-4 mb-2">No saved pieces</p>
              <p className="text-xs text-brand-secondary/70 mb-4">Tap the heart toggle on any product across our store.</p>
              <button
                onClick={() => onTabChange('shop')}
                className="bg-brand-primary text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Go Exploring
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* ORDERS HISTORY SUB-TAB */}
      {activeSubTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {pastOrders.map(ord => (
            <div key={ord.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm select-none">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-extrabold text-brand-accent bg-rose-50 px-2 py-0.5 rounded-full uppercase">
                  {ord.status}
                </span>
                <span className="text-xs text-brand-secondary font-medium">{ord.date}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-bold text-brand-primary">{ord.id}</span>
                <span className="text-sm font-extrabold text-brand-primary">₹{ord.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-brand-secondary mt-1.5 border-t border-gray-50 pt-2 font-medium">
                {ord.items}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* AI STYLE QUIZ SUB-TAB */}
      {activeSubTab === 'quiz' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="select-none">
          {submittedQuiz ? (
            <div className="text-center bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-brand-primary mb-1">Vibe Calibrated!</h3>
              <p className="text-sm text-brand-secondary mb-4 leading-relaxed">
                Your style preference has been successfully configured as <strong className="text-brand-accent capitalize">{styleAnswer}</strong>. We have updated our search indexing models for you.
              </p>
              
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setSubmittedQuiz(false)}
                  className="border border-gray-200 text-brand-primary rounded-xl px-5 py-2.5 text-xs font-bold cursor-pointer hover:bg-gray-100/50"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => {
                    // Navigate to Apparel or correct filter
                    onCategorySelect('Apparel');
                    onTabChange('shop');
                  }}
                  className="bg-brand-primary text-white rounded-xl px-5 py-2.5 text-xs font-bold cursor-pointer"
                >
                  View Pieces
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-base text-brand-primary mb-1 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-brand-accent animate-spin-slow" /> Discover Your Core Vibe
              </h3>
              <p className="text-xs text-brand-secondary mb-6 leading-relaxed">
                Select the mood that most closely reflects your physical space, art preference, and lifestyle patterns.
              </p>

              <div className="space-y-3">
                {(
                  [
                    { vibe: 'Minimalist', desc: 'Empty negative spaces, neutral tones, architectural tailoring' },
                    { vibe: 'Nordic Warmth', desc: 'Linen fibers, textured oak woods, organic shapes' },
                    { vibe: 'Tech Minimal', desc: 'Anodized titanium, pristine black-and-whites, modern lifestyle' },
                    { vibe: 'Clean Editorial', desc: 'Bold lines, high weight-contrast fonts, leather pairings' }
                  ] as const
                ).map(opt => (
                  <button
                    key={opt.vibe}
                    onClick={() => handleQuizSubmit(opt.vibe)}
                    className="w-full text-left bg-gray-50 border border-gray-100 hover:border-brand-accent/50 p-4 rounded-xl cursor-pointer transition-all duration-200 flex justify-between items-center group active-scale"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-brand-primary group-hover:text-brand-accent transition-colors">
                        {opt.vibe}
                      </h4>
                      <p className="text-[11px] text-brand-secondary mt-0.5 leading-snug">{opt.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-accent transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
