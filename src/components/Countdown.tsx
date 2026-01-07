"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Heart, Star, Sparkles } from "lucide-react";

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const startDate = new Date("2022-06-28T07:05:00");

    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      if (diff < 0) {
        setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate years, months, days more accurately
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = now.getHours() - startDate.getHours();
      const minutes = now.getMinutes() - startDate.getMinutes();
      const seconds = now.getSeconds() - startDate.getSeconds();

      // For the bottom part, we'll just show the remainder of the time in HH:MM:SS format
      // relative to the current day, or maybe just the full elapsed time?
      // User said "niche count down hovu joi ae", usually means HH:MM:SS
      
      const totalSeconds = Math.floor(diff / 1000);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      setTimeLeft({
        years,
        months,
        days,
        hours: h,
        minutes: m,
        seconds: s
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  const fallingItems = [
    { Icon: Heart, type: "icon", color: "text-pink-500" },
    { emoji: "🎉", type: "emoji" },
    { Icon: Star, type: "icon", color: "text-yellow-400" },
    { emoji: "🎊", type: "emoji" },
    { Icon: Sparkles, type: "icon", color: "text-indigo-400" },
    { emoji: "✨", type: "emoji" },
    { Icon: Heart, type: "icon", color: "text-red-500" },
    { emoji: "🥳", type: "emoji" },
    { Icon: Star, type: "icon", color: "text-purple-400" },
    { emoji: "🎈", type: "emoji" },
    { Icon: Sparkles, type: "icon", color: "text-blue-400" },
    { emoji: "🥂", type: "emoji" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl relative overflow-hidden group"
    >
      {/* Celebration elements falling from top */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const item = fallingItems[i % fallingItems.length];
          return (
            <motion.div
              key={i}
              initial={{ 
                y: -50, 
                x: `${Math.random() * 100}%`,
                opacity: 0,
                rotate: 0,
                scale: 0.5
              }}
              animate={{ 
                y: "600px",
                opacity: [0, 1, 1, 0],
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                x: `${(Math.random() * 100)}%`,
                scale: [0.5, 1, 1, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
              className="absolute"
            >
              {item.type === "icon" && item.Icon ? (
                <item.Icon className={`w-4 h-4 ${item.color} opacity-40`} />
              ) : (
                <span className="text-xl opacity-60 filter drop-shadow-sm">{item.emoji}</span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl">
            <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Journey Matrix</span>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black italic text-white leading-none">{timeLeft.years}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-indigo-400 mt-1">Years</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black italic text-white leading-none">{timeLeft.months}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-purple-400 mt-1">Months</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black italic text-white leading-none">{timeLeft.days}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-pink-400 mt-1">Days</span>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 my-6" />

        <div className="flex items-center gap-4">
          <div className="bg-white/[0.05] border border-white/5 rounded-2xl px-6 py-4 min-w-[80px]">
            <span className="text-2xl font-black italic text-white tabular-nums">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <p className="text-[7px] font-bold uppercase tracking-widest text-white/20 mt-1">Hours</p>
          </div>
          <span className="text-2xl font-black text-white/20">:</span>
          <div className="bg-white/[0.05] border border-white/5 rounded-2xl px-6 py-4 min-w-[80px]">
            <span className="text-2xl font-black italic text-white tabular-nums">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <p className="text-[7px] font-bold uppercase tracking-widest text-white/20 mt-1">Mins</p>
          </div>
          <span className="text-2xl font-black text-white/20">:</span>
          <div className="bg-white/[0.05] border border-white/5 rounded-2xl px-6 py-4 min-w-[80px]">
            <span className="text-2xl font-black italic text-white tabular-nums">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <p className="text-[7px] font-bold uppercase tracking-widest text-white/20 mt-1">Secs</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
