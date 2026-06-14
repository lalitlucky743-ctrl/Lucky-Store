import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 59,
    seconds: 28
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
          if (m < 0) {
            m = 59;
            h -= 1;
            if (h < 0) {
              // Reset to arbitrary fresh value on expiry for interactive playfulness
              h = 5;
              m = 24;
              s = 15;
            }
          }
        }

        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUnit = (val: number) => val.toString().padStart(2, '0');

  return (
    <section className="mt-8 px-5">
      <motion.div 
        id="flash-sale-card"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-brand-primary text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 overflow-hidden soft-card-shadow"
      >
        <div className="z-10 text-center sm:text-left select-none">
          <h3 className="font-bold text-xl text-white mb-1 font-sans">
            Flash Sale
          </h3>
          <p className="text-gray-400 text-sm font-sans">
            Limited time offers ending in:
          </p>
        </div>

        <div id="countdown-wrapper" className="z-10 flex gap-3 items-center">
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-xl font-bold text-lg text-white font-sans">
              {formatUnit(timeLeft.hours)}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest mt-1.5 opacity-60 font-sans">
              Hrs
            </span>
          </div>
          
          <div className="text-white/80 font-bold text-xl mb-5">:</div>

          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-xl font-bold text-lg text-white font-sans">
              {formatUnit(timeLeft.minutes)}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest mt-1.5 opacity-60 font-sans">
              Min
            </span>
          </div>

          <div className="text-white/80 font-bold text-xl mb-5">:</div>

          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-xl font-bold text-lg text-white font-sans">
              {formatUnit(timeLeft.seconds)}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest mt-1.5 opacity-60 font-sans">
              Sec
            </span>
          </div>
        </div>

        {/* Ambient premium glowing accents */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-15 pointer-events-none" />
      </motion.div>
    </section>
  );
}
