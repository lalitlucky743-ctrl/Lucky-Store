import { motion } from 'motion/react';

interface BannerProps {
  onExploreClick: () => void;
}

export default function Banner({ onExploreClick }: BannerProps) {
  return (
    <section className="px-5 mt-4">
      <motion.div 
        id="hero-banner"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full h-[440px] rounded-2xl overflow-hidden shadow-sm active-scale group cursor-pointer"
        onClick={onExploreClick}
      >
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPoOaX3w-cSAXiHKcC7R2nBlTrpvdvvT2KAWsJNVpPMw2OaS3QLsrknE5j81oS8TCaHRblmL2lo3mP4cLYuzadTCRi8bCJ5Q0H8W475Y5mQfZ7nffpQB7HHYJYWlPkOp4I75HvY9acxQb6ljJxDC2aSZJzlgDiQGMlkGuhiola78shazw00E74Z3OrVen3FjCn-AnYcm_C4OJF43vC-KKaVEHahne7NyhJBn9xvk88wKuNxermPnIk7PzzwTzwo_eUNyUN8ufcXEw" 
          alt="Season 2024 New Arrivals" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        
        {/* Left-bottom content */}
        <div className="absolute bottom-0 left-0 p-8 w-full select-none">
          <p className="text-white/80 font-semibold tracking-widest text-xs uppercase mb-1.5 font-sans">
            Season 2024
          </p>
          <h2 className="text-white text-4xl font-extrabold mb-5 leading-tight font-sans tracking-tight">
            New Arrivals
          </h2>
          <button 
            id="btn-explore-collection"
            onClick={(e) => {
              e.stopPropagation();
              onExploreClick();
            }}
            className="bg-white text-brand-primary px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-lg active-scale"
          >
            Explore Collection
          </button>
        </div>
      </motion.div>
    </section>
  );
}
