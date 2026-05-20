import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ImageWithFallback = ({ src, alt, fallback, className, loading = "lazy" }: { src: string, alt: string, fallback: string, className?: string, loading?: "lazy" | "eager" }) => {
  const [error, setError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  
  useEffect(() => {
    setError(false);
    setFallbackError(false);
  }, [src]);

  if (error && fallbackError) {
    return <div className={`flex flex-col items-center justify-center bg-stone-100 text-stone-400 text-sm ${className}`}><span className="opacity-50 break-words px-2 text-center">{alt}</span></div>;
  }

  return (
    <img 
      src={error ? fallback : src} 
      alt={alt} 
      className={className}
      onError={() => {
        if (!error) setError(true);
        else setFallbackError(true);
      }}
      loading={loading}
    />
  );
};
import { 
  Menu, X, MapPin, Phone, Clock, Leaf, 
  Utensils, PartyPopper, ChefHat, Candy,
  ChevronLeft, ChevronRight, CalendarDays, Users, Send, CheckCircle2, ChevronDown,
  Minus, Plus, ShoppingCart, Trash2, Youtube, Facebook, Instagram, Twitter, Star, Mail, MessageCircle
} from 'lucide-react';

// Removed WhatsApp integration as requested


const ImageCarousel = ({ images, fallbacks, alt, className, imageClassName, onImageClick }: { images: string[], fallbacks: string[], alt: string, className?: string, imageClassName?: string, onImageClick?: (src: string) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className={`relative w-full h-full group/carousel flex bg-stone-100 overflow-hidden ${onImageClick ? 'cursor-pointer' : ''} ${className || ''}`}
      onClick={(e) => {
        // Prevent click if we just dragged or something, but simple onClick is fine.
        onImageClick && onImageClick(images[currentIndex])
      }}
    >
      <div 
        className="flex w-full h-full transition-transform duration-300 ease-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center">
            <ImageWithFallback 
              src={src} 
              fallback={fallbacks[idx % (fallbacks.length || 1)]} 
              alt={`${alt} ${idx + 1}`} 
              className={`w-full h-full transition-transform duration-700 group-hover/carousel:scale-[1.03] ${imageClassName || 'object-cover'}`} 
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button 
            type="button"
            onClick={prevImage}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 md:p-4 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover/carousel:opacity-100 transition-opacity z-[100] shadow-lg pointer-events-auto"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button 
            type="button"
            onClick={nextImage}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 md:p-4 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover/carousel:opacity-100 transition-opacity z-[100] shadow-lg pointer-events-auto"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/60 w-2.5 hover:bg-white/90'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const navItems = ['Home', 'Menu', 'Signature Gallery', 'Services', 'Our Heritage', 'Contact Us'];

export const fullMenu = [
  {
  

    id: "breakfast",
    name: "Breakfast",
    icon: "🍽️",
    image: "/breakfast.jpg",
    items: [
      { name: "Idli Vada" }, { name: "Rava Idli" }, { name: "Pongal" }, { name: "Khara Bath" },
      { name: "Kesari Bath" }, { name: "Chow Chow Bath" }, { name: "Rice Bath" },
      { name: "Bisibele Bath" }, { name: "Maddur Vada" }, { name: "Pakoda" },
      { name: "Buns" }, { name: "Poori Sagu" }
    ]
  },

  {
    id: "dosa",
    name: "Dosa Specials",
    icon: "🥞",
    image: "/dosa.jpg",
    items: [
      { name: "Ghee Masala Dosa" }, { name: "Benne Masala Dosa" },
      { name: "Pudi Ghee Masala Dosa" }, { name: "Open Ghee Benne Dosa" },
      { name: "Masala Dosa" }, { name: "Plain Dosa" },
      { name: "Set Dosa" }, { name: "Khali Dosa" },
      { name: "Rava Dosa" }, { name: "Onion Dosa" }
    ]
  },

  {
    id: "meals",
    name: "South Indian Meals",
    icon: "🍛",
    image: "/meals.jpg",
    items: [
      { name: "South Indian Meals" }
    ]
  },

  {
    id: "rice",
    name: "Rice Items",
    icon: "🍚",
    image: "/rice.jpg",
    items: [
      { name: "Curd Rice" }, { name: "Veg Biriyani" },
      { name: "Veg Fried Rice" }, { name: "Paneer Fried Rice" },
      { name: "Mushroom Fried Rice" }, { name: "Schezwan Fried Rice" },
      { name: "Jeera Rice" }, { name: "Ghee Rice" }
    ]
  },

  {
    id: "noodles",
    name: "Noodles",
    icon: "🍜",
    image: "/noodles.jpg",
    items: [
      { name: "Veg Noodles" },
      { name: "Paneer Noodles" },
      { name: "Mushroom Noodles" }
    ]
  },

  {
    id: "chinese",
    name: "Chinese",
    icon: "🌶️",
    image: "/chinese.jpg",
    items: [
      { name: "Gobi Manchurian" }, { name: "Baby Corn Manchurian" },
      { name: "Paneer Manchurian" }, { name: "Mushroom Manchurian" },
      { name: "Gobi Chilli" }, { name: "Baby Corn Chilli" },
      { name: "Paneer Chilli" }, { name: "Mushroom Chilli" },
      { name: "Gobi Pepper Dry" }, { name: "Baby Corn Pepper Dry" },
      { name: "Paneer Pepper Dry" }, { name: "Mushroom Pepper Dry" }
    ]
  },

  {
    id: "specials",
    name: "House Specials",
    icon: "🌟",
    image: "/specials.jpg",
    items: [
      { name: "Aalu Kabab" }, { name: "Mushroom Kabab" },
      { name: "Babycorn Kabab" }, { name: "Paneer Kabab" },
      { name: "Finger Chips" }, { name: "Akki Rotti" },
      { name: "Chapati Dal Curry" }, { name: "Parota Dal Curry" },
      { name: "Methi Chapati" }, { name: "Pudina Chapati" },
      { name: "Chole Bhatura" }
    ]
  },

  {
    id: "chats",
    name: "Chats",
    icon: "🌮",
    image: "/chats.jpg",
    items: [
      { name: "Masala Puri" },
      { name: "Pani Puri" },
      { name: "Bhel Puri" },
      { name: "Samosa" },
      { name: "Samosa Masala" },
      { name: "Alu Puri" },
      { name: "Dahi Puri" },
      { name: "Sev Puri" }
    ]
  },

  {
    id: "juices",
    name: "Juices & Milk Shakes",
    icon: "🥤",
    image: "/juices.jpg",
    items: [
      { name: "Lemon Mint Juice" }, { name: "Pineapple Juice" },
      { name: "Grapes Juice" }, { name: "Watermelon Juice" },
      { name: "Sweet Lime Juice" }, { name: "Orange Juice" },
      { name: "Muskmelon Juice" }, { name: "Pomogranate Juice" },
      { name: "Chikoo Milk Shake" }, { name: "Butter Fruit Milk Shake" },
      { name: "Apple Milk Shake" }, { name: "Lassi Shake" }
    ]
  },

  {
    id: "beverages",
    name: "Beverages",
    icon: "☕",
    image: "/beverages.jpg",
    items: [
      { name: "Coffee" },
      { name: "Tea" },
      { name: "Plain Milk" },
      { name: "Badam Milk" },
      { name: "Cold Badam Milk" }
    ]
  },

  {
    id: "sweets",
    name: "Sweets",
    icon: "🍮",
    image: "/sweets.jpg",
    items: [
      { name: "Carrot Halwa" },
      { name: "Jamoon" }
    ]
    }
  
];

const services = [
  {
    id: "dining",
    title: "Pure Veg Dining",
    subtitle: "Authentic & Hygienic",
    description: "Experience the true taste of tradition with our extensive menu of South Indian, North Indian, and Chinese delicacies. Served in a clean, welcoming, and family-friendly environment that feels just like home.",
    icon: Utensils,
    gallery: {
      srcs: ["/Pure Veg Dining.jpg", "/Pure Veg Dining1.jpg", "/Pure Veg Dining2.jpg"],
      fallbacks: [
        "https://images.unsplash.com/photo-1610192202657-36e7116cb9b0?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "catering",
    title: "Outdoor Catering",
    subtitle: "For Your Special Occasions",
    description: "Bring the Annapoorna experience to your events. From intimate family gatherings to grand corporate events, our professional catering team ensures every guest leaves with a smile and a satisfied palate.",
    icon: ChefHat,
    gallery: {
      srcs: ["/Outdoor Catering1.jpg", "/Outdoor Catering2.jpg"],
      fallbacks: [
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2000&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "partyhall",
    title: "Party Hall",
    subtitle: "Celebrate with Us",
    description: "Host your celebrations in our elegant and spacious party hall. Equipped with modern amenities, comfortable seating, and our dedicated service staff, it's the perfect venue for birthdays, anniversaries, and receptions.",
    icon: PartyPopper,
    gallery: {
      srcs: ["/partyhall.jpg", "/partyhall1.jpg", "/partyhall2.jpg"],
      fallbacks: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8892404eeb?q=80&w=2000&auto=format&fit=crop"
      ]
    }
  }
];

const signatureMenuImages = [
  '/gallery-1.jpg',
  '/gallery-2.jpg',
  '/gallery-3.jpg',
  '/gallery-4.jpg',
  '/gallery-5.jpg',
  '/gallery-6.jpg',
  '/gallery-7.jpg'
];

const TIMELINE_DATA = [
  {
    year: '1984',
    title: 'The Beginning of Annapoorna',
    content: [
      'In 1984, Shri H.V. Umesh established Annapoorna Bakery in the culturally rich locality of Malleswaram, Bangalore. With a simple vision to serve fresh and quality bakery products, the bakery quickly earned the love and trust of local families.',
      'Known for its authentic taste, freshness, and customer-first service, Annapoorna became a favorite neighborhood bakery built on honesty and consistency.'
    ],
    image: '/1984.jpg'
  },
  { 
    year: '1990', 
    title: 'Expansion Into Traditional Sweets', 
    content: [
      'With growing customer love and support, Annapoorna expanded into traditional Indian sweets in 1990. The addition of authentic sweets strengthened the brand’s reputation for quality and taste.',
      'What started as a bakery was now becoming a complete destination for bakery products and traditional Indian delicacies.'
    ], 
    image: '/1990.jpg' 
  },
  { 
    year: '2002', 
    title: 'Annapoorna Refreshments & Sweets', 
    content: [
      'In 2002, Annapoorna entered the hotel and restaurant business with the launch of Annapoorna Refreshments & Sweets in Vidyaranyapura, Bangalore.',
      'This marked a major milestone in the brand’s journey — transforming Annapoorna into a complete vegetarian dining destination serving South Indian specialties, North Indian dishes, sweets, bakery items, refreshments, and more under one roof.'
    ], 
    image: '/2002.jpg' 
  },
  { 
    year: '2026', 
    title: 'Annapoorna Pure Veg\n40+ Years of Trust & Tradition', 
    content: [
      'Today, Annapoorna proudly stands as a trusted vegetarian food destination serving generations of families with the same passion and commitment that started in 1984.',
      'From a humble bakery in Malleswaram to a complete dining experience in Bangalore, Annapoorna continues its legacy of quality, hygiene, hospitality, and authentic taste.'
    ], 
    image:  '/2026.jpg' 
  },
];

export function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const activeData = TIMELINE_DATA[activeIndex];

  // Trigger simple fade-in animation when index changes
  useEffect(() => {
    setAnimateKey(prev => prev + 1);
    
    // Scroll active item into view
    const activeItem = itemRefs.current[activeIndex];
    const container = scrollContainerRef.current;
    if (activeItem && container) {
      const containerWidth = container.clientWidth;
      const itemOffset = activeItem.offsetLeft;
      const itemWidth = activeItem.clientWidth;
      
      container.scrollTo({
        left: itemOffset - (containerWidth / 2) + (itemWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, TIMELINE_DATA.length - 1));
  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="relative w-full pb-16 pt-0 sm:pb-24 sm:pt-2 bg-[#fffdf8] overflow-hidden text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Top Controls & Decoration */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          {/* Left Decorative Mark */}
          <div className="flex items-center gap-2 sm:gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-brand-primary)" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <path d="M14 2L15.5 8.5L22 10L15.5 11.5L14 18L12.5 11.5L6 10L12.5 8.5L14 2Z" />
              <path d="M6 10L7 13L10 14L7 15L6 18L5 15L2 14L5 13L6 10Z" />
            </svg>
            <div className="h-px bg-brand-primary/30 w-16 sm:w-32" />
          </div>

          {/* Right Navigation */}
          <div className="flex gap-2 sm:gap-3">
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-[#0b4d30] hover:bg-brand-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={handleNext}
              disabled={activeIndex === TIMELINE_DATA.length - 1}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-[#0b4d30] hover:bg-brand-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Timeline Horizontal Line / Slider */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto hide-scrollbar pb-6 sm:pb-8"
        >
          <div className="flex items-center min-w-max px-4 sm:px-8">
            {TIMELINE_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <React.Fragment key={item.year}>
                  {/* Year Node */}
                  <div 
                    ref={(el) => { if (el) itemRefs.current[index] = el; }}
                    onClick={() => setActiveIndex(index)} 
                    className="cursor-pointer group flex items-center shrink-0"
                  >
                    <span 
                      className={`font-serif transition-colors duration-500 ${
                        isActive 
                          ? 'text-4xl sm:text-6xl lg:text-7xl text-[#0b4d30]' 
                          : 'text-2xl sm:text-4xl lg:text-5xl text-[#0b4d30]/40 group-hover:text-[#0b4d30]/60'
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Connecting Line (except after the last item) */}
                  {index < TIMELINE_DATA.length - 1 && (
                    <div className="flex items-center px-3 sm:px-5 lg:px-8 shrink-0">
                      <div className="w-16 sm:w-24 lg:w-32 h-[1px] bg-[#0b4d30]/25 relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[#0b4d30]/30 bg-[#fffdf8]" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div 
          key={animateKey} 
          className="mt-6 sm:mt-10 flex flex-col md:flex-row gap-4 sm:gap-10 items-start relative"
          style={{ animation: 'fadeInUp 0.6s ease-out forwards' }} 
        >
          {/* Left Text Content */}
          <div className="flex-1 w-full lg:max-w-3xl px-2">
            <h3 className="text-lg sm:text-2xl font-serif text-[#0b4d30] mb-3 sm:mb-5 font-medium whitespace-pre-line">
              {activeData.title}
            </h3>
            
            <div className="space-y-4 sm:space-y-6 text-stone-700 font-serif text-[14px] sm:text-[16px] leading-[1.8] sm:leading-[1.9] tracking-wide">
              {activeData.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Image Content */}
          <div className="w-full lg:flex-1 flex lg:justify-end px-2 mt-6 lg:mt-0">
             <div className="w-[85%] sm:w-[70%] lg:w-full aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem] bg-black/5 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm shrink-0 mx-auto lg:mr-0">
               {activeData.image ? (
                 <img src={activeData.image} alt={activeData.title} loading="lazy" className="w-full h-full object-cover" />
               ) : (
                 <div className="text-center p-6">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4 text-brand-primary/40">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                   </div>
                   <span className="font-sans text-xs sm:text-sm tracking-widest uppercase text-[#0b4d30]/50 font-medium">
                     Image Holder ({activeData.year})
                   </span>
                 </div>
               )}
             </div>
          </div>
        </div>

      </div>

      {/* Global Style for Keyframe Animation inside this component scope */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}

const FESTIVALS = [
  {
    id: 'new_year',
    name: 'New Year',
    type: 'fixed',
    month: 0, // Jan
    day: 1,
    showDaysBefore: 1,
    showDaysAfter: 1,
    message: "🎉 Happy New Year! Wishing you a prosperous and joyful year ahead.",
    gradient: "from-purple-600 to-indigo-800"
  },
  {
    id: 'sankranti',
    name: 'Makara Sankranti',
    type: 'fixed',
    month: 0, // Jan (0-indexed)
    day: 14,
    showDaysBefore: 1,
    showDaysAfter: 1,
    message: "🪁 Happy Makara Sankranti! Wishing you a harvest of joy and prosperity.",
    gradient: "from-orange-500 to-yellow-600"
  },
  {
    id: 'republic_day',
    name: 'Republic Day',
    type: 'fixed',
    month: 0, // Jan
    day: 26,
    showDaysBefore: 0,
    showDaysAfter: 0,
    message: "🇮🇳 Happy Republic Day! Jai Hind.",
    gradient: "from-orange-500 via-white to-green-600 !text-stone-800 drop-shadow-sm border-b border-stone-200"
  },
  {
    id: 'maha_shivaratri',
    name: 'Maha Shivaratri',
    type: 'lunar',
    dates: {
      2024: { month: 2, day: 8 },  // Mar 8
      2025: { month: 1, day: 26 }, // Feb 26
      2026: { month: 1, day: 15 }, // Feb 15
      2027: { month: 2, day: 6 },  // Mar 6
      2028: { month: 1, day: 24 }, // Feb 24
      2029: { month: 1, day: 12 }, // Feb 12
      2030: { month: 2, day: 3 }   // Mar 3
    },
    showDaysBefore: 1,
    showDaysAfter: 0,
    message: "🔱 Om Namah Shivaya! Wishing you a blessed Maha Shivaratri.",
    gradient: "from-slate-700 to-slate-900"
  },
  {
    id: 'ugadi',
    name: 'Ugadi',
    type: 'lunar',
    dates: {
      2024: { month: 3, day: 9 },  // Apr 9
      2025: { month: 2, day: 30 }, // Mar 30
      2026: { month: 2, day: 19 }, // Mar 19
      2027: { month: 3, day: 7 },  // Apr 7
      2028: { month: 2, day: 26 }, // Mar 26
      2029: { month: 3, day: 14 }, // Apr 14
      2030: { month: 3, day: 4 }   // Apr 4
    },
    showDaysBefore: 1,
    showDaysAfter: 1,
    message: "🌸 Happy Ugadi! Wishing you a joyous and prosperous new year from Annapoorna.",
    gradient: "from-emerald-600 to-green-800"
  },
  {
    id: 'sri_rama_navami',
    name: 'Sri Rama Navami',
    type: 'lunar',
    dates: {
      2024: { month: 3, day: 17 }, // Apr 17
      2025: { month: 3, day: 6 },  // Apr 6
      2026: { month: 2, day: 27 }, // Mar 27
      2027: { month: 3, day: 15 }, // Apr 15
      2028: { month: 3, day: 4 },  // Apr 4
      2029: { month: 3, day: 22 }, // Apr 22
      2030: { month: 3, day: 11 }  // Apr 11
    },
    showDaysBefore: 1,
    showDaysAfter: 0,
    message: "🏹 Happy Sri Rama Navami! May your life be filled with devotion and peace.",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    id: 'independence_day',
    name: 'Independence Day',
    type: 'fixed',
    month: 7, // Aug
    day: 15,
    showDaysBefore: 0,
    showDaysAfter: 0,
    message: "🇮🇳 Happy Independence Day! Proud to be Indian.",
    gradient: "from-orange-500 via-white to-green-600 !text-stone-800 drop-shadow-sm border-b border-stone-200"
  },
  {
    id: 'varamahalakshmi',
    name: 'Varamahalakshmi Vrata',
    type: 'lunar',
    dates: {
      2024: { month: 7, day: 16 }, // Aug 16
      2025: { month: 7, day: 8 },  // Aug 8
      2026: { month: 7, day: 28 }, // Aug 28
      2027: { month: 7, day: 20 }, // Aug 20
      2028: { month: 7, day: 4 },  // Aug 4
      2029: { month: 7, day: 24 }, // Aug 24
      2030: { month: 7, day: 9 }   // Aug 9
    },
    showDaysBefore: 1,
    showDaysAfter: 0,
    message: "🪷 Happy Varamahalakshmi Vrata! May Goddess Lakshmi bless your home with prosperity.",
    gradient: "from-pink-500 to-rose-700"
  },
  {
    id: 'krishna_janmashtami',
    name: 'Krishna Janmashtami',
    type: 'lunar',
    dates: {
      2024: { month: 7, day: 26 }, // Aug 26
      2025: { month: 7, day: 15 }, // Aug 15
      2026: { month: 8, day: 3 },  // Sep 3
      2027: { month: 7, day: 24 }, // Aug 24
      2028: { month: 7, day: 12 }, // Aug 12
      2029: { month: 7, day: 31 }, // Aug 31
      2030: { month: 7, day: 20 }  // Aug 20
    },
    showDaysBefore: 1,
    showDaysAfter: 0,
    message: "🦚 Happy Krishna Janmashtami! Wishing you joy, love, and divine blessings.",
    gradient: "from-blue-600 to-indigo-800"
  },
  {
    id: 'ganesh_chaturthi',
    name: 'Ganesh Chaturthi',
    type: 'lunar',
    dates: {
      2024: { month: 8, day: 7 },  // Sep 7
      2025: { month: 7, day: 27 }, // Aug 27
      2026: { month: 8, day: 14 }, // Sep 14
      2027: { month: 8, day: 4 },  // Sep 4
      2028: { month: 7, day: 23 }, // Aug 23
      2029: { month: 8, day: 11 }, // Sep 11
      2030: { month: 7, day: 31 }  // Aug 31
    },
    showDaysBefore: 2,
    showDaysAfter: 1,
    message: "🐘 Happy Ganesh Chaturthi! May Lord Ganesha remove all obstacles and bring you joy.",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 'ayudha_pooja_dasara',
    name: 'Dasara / Ayudha Pooja',
    type: 'lunar',
    dates: {
      2024: { month: 8, day: 11 }, // Oct 11/12
      2025: { month: 9, day: 1 },  // Oct 1
      2026: { month: 9, day: 20 }, // Oct 20
      2027: { month: 9, day: 9 },  // Oct 9
      2028: { month: 8, day: 28 }, // Sep 28
      2029: { month: 9, day: 17 }, // Oct 17
      2030: { month: 9, day: 6 }   // Oct 6
    },
    showDaysBefore: 2,
    showDaysAfter: 1,
    message: "🌺 Happy Navaratri & Dasara! Wishing you victory, peace, and prosperity.",
    gradient: "from-red-600 to-pink-700"
  },
  {
    id: 'deepavali',
    name: 'Deepavali',
    type: 'lunar',
    dates: {
      2024: { month: 9, day: 31 }, // Oct 31
      2025: { month: 9, day: 20 }, // Oct 20
      2026: { month: 10, day: 8 }, // Nov 8
      2027: { month: 9, day: 29 }, // Oct 29
      2028: { month: 9, day: 17 }, // Oct 17
      2029: { month: 10, day: 5 }, // Nov 5
      2030: { month: 9, day: 26 }  // Oct 26
    },
    showDaysBefore: 2,
    showDaysAfter: 1,
    message: "🪔 Happy Deepavali! Wishing you a festival of lights, love, and sweet moments.",
    gradient: "from-indigo-600 to-purple-800"
  },
  {
    id: 'kannada_rajyotsava',
    name: 'Kannada Rajyotsava',
    type: 'fixed',
    month: 10, // Nov (0-indexed)
    day: 1,
    showDaysBefore: 0, // ONLY exact day
    showDaysAfter: 0,
    message: "💛❤️ Happy Kannada Rajyotsava! Proud to serve native flavors of Karnataka since 1984.",
    gradient: "from-yellow-500 via-yellow-600 to-red-600"
  }
];

const getActiveFestival = () => {
  const today = new Date();
  // Strip time for accurate day difference comparison
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const currentYear = currentDate.getFullYear();

  for (const festival of FESTIVALS) {
    let targetDate: Date | null = null;

    if (festival.type === 'fixed') {
      targetDate = new Date(currentYear, festival.month!, festival.day!);
    } else if (festival.type === 'lunar' && festival.dates && festival.dates[currentYear]) {
      const { month, day } = festival.dates[currentYear];
      targetDate = new Date(currentYear, month, day);
    }

    if (targetDate) {
      // Calculate date difference in days
      const diffTime = currentDate.getTime() - targetDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // If current date is within the banner timeframe (e.g. 2 days before to 1 day after)
      if (diffDays >= -festival.showDaysBefore && diffDays <= festival.showDaysAfter) {
        return festival;
      }
    }
  }

  return undefined;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'book'>('home');
  const [activeCategory, setActiveCategory] = useState(fullMenu[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [highlightedItems, setHighlightedItems] = useState<string[]>([]);
  const [showFestivalBanner, setShowFestivalBanner] = useState(true);


  const activeFestival = getActiveFestival();


  const [bookFormData, setBookFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'catering',
    eventDate: '',
    guests: '',
    message: '',
    signupForOffers: false
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'submitting' | 'success'>(null);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = targetId;
    }
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Format the message for WhatsApp
    const eventTypeStr = bookFormData.eventType === 'partyhall' ? 'Party Hall' : bookFormData.eventType === 'both' ? 'Party Hall & Catering' : 'Catering';
    const message = `*New Booking Inquiry*
Name: ${bookFormData.name}
Phone: ${bookFormData.phone}
Email: ${bookFormData.email || 'N/A'}
Event Type: ${eventTypeStr}
Date: ${bookFormData.eventDate}
Guests: ${bookFormData.guests}
Message: ${bookFormData.message}
Opt-in Offers: ${bookFormData.signupForOffers ? 'Yes' : 'No'}
`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919019230429?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Update UI Status
    setFormStatus('success');
    setBookFormData({
      name: '', phone: '', email: '', eventType: 'catering', eventDate: '', guests: '', message: '', signupForOffers: false
    });
    setTimeout(() => setFormStatus(null), 8000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Format the message for WhatsApp
    const message = `*New Contact Inquiry*
Name: ${contactFormData.name}
Phone: ${contactFormData.phone}
Email: ${contactFormData.email || 'N/A'}
Message: ${contactFormData.message}
`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919019230429?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Update UI Status
    setFormStatus('success');
    setContactFormData({
      name: '', phone: '', email: '', message: ''
    });
    setTimeout(() => setFormStatus(null), 8000);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen antialiased text-stone-800">
      {/* Navigation */}
      <header className="fixed w-full z-50 flex flex-col">
        <AnimatePresence>
          {activeFestival && showFestivalBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`bg-gradient-to-r ${activeFestival.gradient} text-white px-4 py-2 sm:py-2.5 text-center text-[13px] sm:text-sm font-medium flex items-center justify-center relative shadow-md w-full`}
            >
              <span>{activeFestival.message}</span>
              <button 
                onClick={() => setShowFestivalBanner(false)} 
                className="absolute right-2 sm:right-6 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                aria-label="Close banner"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <nav className={`w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-5 border-b border-stone-200'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ImageWithFallback 
              src="/logo.jpg" 
              fallback="https://ui-avatars.com/api/?name=Annapoorna&background=025e37&color=f5ba45&rounded=true&bold=true&size=128"
              alt="Annapoorna Logo" 
              className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full border-2 border-brand-yellow shadow-md bg-white"
              loading="eager"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl text-brand-red tracking-wide leading-none">Annapoorna</span>
              <span className="text-[0.65rem] md:text-xs font-bold text-brand-green tracking-widest uppercase mt-0.5">Pure Veg Hotel</span>
            </div>
          </div>

          <div className="hidden md:flex gap-6 lg:gap-10 items-center justify-end w-full">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={item === 'Contact Us' ? '#contact' : item === 'Home' ? '#' : `#${item.toLowerCase().replace(/ /g, '-')}`} 
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  if (item === 'Contact Us') {
                    setCurrentPage('contact');
                    window.scrollTo(0, 0);
                  } else if (item === 'Home') {
                    setCurrentPage('home');
                    window.scrollTo(0, 0);
                  } else {
                    const targetId = item.toLowerCase().replace(/ /g, '-');
                    if (currentPage !== 'home') {
                      setCurrentPage('home');
                      setTimeout(() => scrollToSection(targetId), 100);
                    } else {
                      scrollToSection(targetId);
                    }
                  }
                }}
                className="text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-brand-red whitespace-nowrap transition-colors"
               >
                {item}
              </a>
            ))}
            
          </div>

          <div className="md:hidden flex items-center gap-4 ml-auto pl-4">
            <button className="text-stone-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white pt-36 px-6 md:hidden shadow-2xl"
        >
          <div className="flex flex-col gap-6 text-center">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={item === 'Contact Us' ? '#contact' : item === 'Home' ? '#' : `#${item.toLowerCase().replace(/ /g, '-')}`} 
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  if (item === 'Contact Us') {
                    setCurrentPage('contact');
                    window.scrollTo(0, 0);
                  } else if (item === 'Home') {
                    setCurrentPage('home');
                    window.scrollTo(0, 0);
                  } else {
                    const targetId = item.toLowerCase().replace(/ /g, '-');
                    if (currentPage !== 'home') {
                      setCurrentPage('home');
                      setTimeout(() => scrollToSection(targetId), 100);
                    } else {
                      scrollToSection(targetId);
                    }
                  }
                }}
                className="font-serif text-2xl font-bold text-stone-800 hover:text-red-800"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      <main>
        {currentPage === 'home' ? (
          <>
        {/* Hero Section */}
        {/* Hero Section */}
{/* Hero Section */}
<section
  id="home"
  className={`pb-12 md:pb-16 px-2 md:px-8 bg-stone-50 transition-all duration-300 ${activeFestival && showFestivalBanner ? 'pt-36 md:pt-44' : 'pt-28 md:pt-32'}`}
>
  <div className="max-w-7xl mx-auto">

    <div className="rounded-[16px] md:rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-stone-200 bg-white p-1 md:p-3">

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/newhero.jpg"
        className="w-[100%] h-auto rounded-[16px] md:rounded-[24px]"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

    </div>

  </div>
</section>
    
      
      {/* Our Legacy Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-gradient-to-br from-[#fdf6d0] via-[#fff3b0] to-[#f9e27d] relative overflow-hidden text-center z-0">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4b24c 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/40 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-200/30 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Heritage Text Badge */}
          <div className="flex flex-col items-center justify-center mb-12 lg:mb-16 -mt-12 md:-mt-24 relative z-20">
            <div className="mb-8 md:mb-10 flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden">
                <img src="/logo.jpg" alt="Annapoorna Logo" fetchPriority="high" loading="eager" className="w-full h-full object-cover scale-[1.35]" />
              </div>
            </div>
          </div>

          <div className="w-full bg-white/70 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-white/60 p-8 md:p-16 lg:p-20 text-center">
            
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#9b1c1c] mb-10 leading-tight drop-shadow-sm">
              A Legacy of <span className="text-stone-900 block mt-2">Authentic Taste Since 1984</span>
            </h3>

            <div className="space-y-8 text-lg md:text-xl lg:text-[1.35rem] leading-[1.8] text-stone-700 font-medium">
              <p>
                For over four decades, Annapoorna Pure Veg Hotel has been a beloved destination for authentic South Indian vegetarian cuisine, heartfelt hospitality, and unforgettable flavors.
                What began as a humble vision in 1984 has grown into a trusted name known for purity, consistency, and tradition.
              </p>

              <div className="flex justify-center items-center gap-4 py-2 opacity-60">
                <div className="w-16 h-0.5 bg-[#d4b24c]"></div>
                <div className="w-2 h-2 rounded-full bg-[#d4b24c]"></div>
                <div className="w-16 h-0.5 bg-[#d4b24c]"></div>
              </div>

              <p>
                From our iconic Benne Masala Dosa and crispy snacks to rich filter coffee and outdoor catering services, every dish at Annapoorna carries the warmth of home and the passion of generations.
                We believe food is not just about taste — it is about memories, family, culture, and connection.
              </p>

              <p className="text-stone-900 font-semibold pt-4">
                Today, Annapoorna continues to serve thousands of happy customers with the same dedication, quality, and traditional values that have defined us for 40 glorious years.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Menu Section */}
      <section id="menu" className="py-24 px-6 md:px-12 bg-white relative border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#6a1a21] mb-6">The Annapoorna Menu</h2>
            <div className="flex justify-center items-center gap-3 opacity-80 mb-6">
              <div className="w-16 h-[1.5px] bg-[#6a1a21]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6a1a21]"></div>
              <div className="w-16 h-[1.5px] bg-[#6a1a21]"></div>
            </div>
            <p className="text-lg text-stone-700 max-w-2xl mx-auto font-medium">Explore a World of Authentic Vegetarian Flavours.</p>
          </div>
          
            <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-16">
            {fullMenu.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex border items-center px-6 py-2.5 rounded-lg font-medium text-[13px] md:text-sm transition-all shadow-sm ${
                  activeCategory === category.id
                    ? 'bg-[#6a1a21] text-white border-[#6a1a21]'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-stone-50 rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Image side */}
            <div className="w-full md:w-[45%] h-64 md:h-auto relative">
               <ImageWithFallback
                 src={fullMenu.find(c => c.id === activeCategory)?.image || ""}
                 fallback="https://images.unsplash.com/photo-1610192202657-36e7116cb9b0?q=80&w=1000&auto=format&fit=crop"
                 alt={fullMenu.find(c => c.id === activeCategory)?.name || "Menu category"}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-10">
                 <h3 className="text-white font-serif text-3xl md:text-5xl font-bold drop-shadow-lg">
                   {fullMenu.find(c => c.id === activeCategory)?.name}
                 </h3>
               </div>
            </div>

            {/* Menu items side */}
            <div className="w-full md:w-[55%] p-8 md:p-12 overflow-y-auto max-h-[600px] bg-white custom-scrollbar">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                 {fullMenu.find(c => c.id === activeCategory)?.items.map((item, i) => {
                   const isHighlighted = highlightedItems.some(hi => hi.toLowerCase() === item.name.toLowerCase());
                   return (
                   <motion.div 
                     initial={{ opacity: 0, x: 10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.03 }}
                     key={i} 
                     className={`flex justify-between items-start border-b pb-3 last:border-0 sm:[&:nth-last-child(-n+2)]:border-0 group gap-4 rounded-lg px-2 -mx-2 transition-colors ${isHighlighted ? 'bg-[#fdf6d0] border-[#c49a3a]/30' : 'border-stone-100'}`}
                   >
                     <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${isHighlighted ? 'bg-[#0b4d30] animate-pulse' : 'bg-[#d4b24c]'}`}></div>
                        <span className={`font-semibold text-[15px] leading-snug ${isHighlighted ? 'text-[#0b4d30] font-bold' : 'text-stone-800'}`}>{item.name}</span>
                     </div>
                   </motion.div>
                 )})}
               </div>
               
               <div className="mt-12 pt-8 border-t border-stone-100 italic text-stone-400 text-sm flex items-center justify-center gap-2">
                 <Leaf className="w-4 h-4 text-brand-green" /> 100% Pure Vegetarian Preparation
               </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Signature Menu Gallery Section */}
      <section id="signature-gallery" className="py-24 px-4 md:px-12 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl text-[#6a1a21] font-bold">Signature Menu Gallery</h2>
            <div className="flex justify-center items-center gap-3 opacity-80 mb-4">
              <div className="w-16 h-[1.5px] bg-brand-yellow"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6a1a21]"></div>
              <div className="w-16 h-[1.5px] bg-brand-yellow"></div>
            </div>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto italic font-medium">A visual journey through our timeless vegetarian favourites since 1984.</p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto aspect-[3/4] sm:aspect-[2/3] md:aspect-[1/1.414] rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-stone-200 flex items-center justify-center">
            <ImageCarousel 
              images={signatureMenuImages} 
              fallbacks={signatureMenuImages.map((_, idx) => `https://ui-avatars.com/api/?name=Gallery+${idx+1}&background=random&color=fff&size=512`)} 
              alt="Signature Menu Gallery" 
              imageClassName="object-contain w-full h-full transform transition-transform duration-700"
              onImageClick={setLightboxImage}
            />
          </div>
        </div>
      </section>

      {/* Highlights / Features Section */}
      <section id="services" className="py-24 px-6 md:px-12 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h4 className="text-[#a57f2a] font-bold tracking-widest uppercase text-sm mb-2">Services</h4>
            <h2 className="font-serif text-4xl md:text-5xl text-[#6a1a21] font-bold">Experience Annapoorna</h2>
            <div className="flex justify-center items-center gap-3 opacity-80 mb-6">
              <div className="w-16 h-[1.5px] bg-[#6a1a21]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6a1a21]"></div>
              <div className="w-16 h-[1.5px] bg-[#6a1a21]"></div>
            </div>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-medium">More than just a restaurant, we provide a complete culinary ecosystem for you and your family.</p>
          </div>

          <div className="space-y-24">
            {services.map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group">
                   {/* Decorative background element */}
                   <div className={`absolute inset-0 bg-[#fdf6d0] rounded-2xl transform translate-y-4 ${idx % 2 !== 0 ? '-translate-x-4' : 'translate-x-4'} -z-10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-500`}></div>
                   
                   <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 flex items-center justify-center">
                      {service.gallery && service.gallery.srcs.length > 0 ? (
                         <ImageCarousel images={service.gallery.srcs} fallbacks={service.gallery.fallbacks} alt={service.title} />
                      ) : (
                         <div className="text-stone-300 flex flex-col items-center gap-2">
                           <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center">
                             <service.icon className="w-8 h-8 opacity-50" />
                           </div>
                           <span className="text-sm font-medium tracking-wide uppercase">Image Section</span>
                         </div>
                      )}
                      
                      {/* Gradient overlay for elegance */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                   </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6">
                  <div className="w-16 h-16 bg-[#fff3b0] rounded-2xl flex items-center justify-center text-[#6a1a21] shadow-sm transform -rotate-3">
                    <service.icon className="w-8 h-8 transform rotate-3" />
                  </div>
                  <div>
                    <h4 className="text-[#a57f2a] font-bold tracking-widest uppercase text-sm mb-2">{service.subtitle}</h4>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 leading-tight">{service.title}</h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-lg pb-4 border-b border-stone-100">
                    {service.description}
                  </p>
                  <ul className="space-y-3 font-medium text-stone-700 w-full mb-4">
                     {service.id === 'dining' && (
                       <>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Fast & Clean Service</li>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Family Friendly Environment</li>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Authentic Filter Coffee & Sweets</li>
                       </>
                     )}
                     {service.id === 'catering' && (
                       <>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Custom Menu Planning</li>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Professional Serving Staff</li>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Live Counters & Elegant Buffet setup</li>
                       </>
                     )}
                     {service.id === 'partyhall' && (
                       <>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Spacious Hall for Up to 250 Guests</li>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Beautiful Decor Support</li>
                         <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0" /> Dedicated Dining Area & Amenities</li>
                       </>
                     )}
                  </ul>
                  
                  {service.id !== 'dining' && (
                    <a 
                      href="#book"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('book');
                        window.scrollTo(0, 0);
                        if (service.id === 'catering') setBookFormData(prev => ({...prev, eventType: 'catering'}));
                        if (service.id === 'partyhall') setBookFormData(prev => ({...prev, eventType: 'partyhall'}));
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#6a1a21] text-white rounded-lg font-medium hover:bg-[#83262f] hover:-translate-y-1 transition-all shadow-md mt-4"
                    >
                      Inquire Now <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                  {service.id === 'dining' && (
                    <a href="#menu" className="inline-flex items-center gap-2 px-6 py-3 bg-[#6a1a21] text-white rounded-lg font-medium hover:bg-[#83262f] hover:-translate-y-1 transition-all shadow-md mt-4">
                      Explore Menu <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Founder Legacy Section */}
<section id="our-heritage" className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 flex items-center bg-[#fffdf8] overflow-hidden text-stone-800 border-t border-b border-stone-200">

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center relative z-10">

    {/* Decorative Divider */}
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
      <div className="h-px bg-[#c49a3a]/50 w-16 sm:w-32" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#c49a3a" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
      </svg>
      <div className="h-px bg-[#c49a3a]/50 w-16 sm:w-32" />
    </div>

    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-serif text-[#0b4d30] mb-4 sm:mb-6">
      The Origin of The Legacy
    </h2>

    {/* Sub Heading */}
    <p className="text-sm sm:text-lg lg:text-xl font-serif italic text-[#8b3a2f] mb-6 sm:mb-8 opacity-90 leading-snug">
      Rooted in Tradition. Built on Trust. Loved for Generations.
    </p>

    {/* Content */}
    <div className="space-y-4 sm:space-y-6 leading-relaxed font-sans text-sm sm:text-base lg:text-lg text-stone-700 max-w-3xl">

      <p>
        Annapoorna’s journey began in 1984, when Shri H.V. Umesh started a humble bakery in the traditional heart of Malleswaram, Bangalore. Built with passion, honesty, and a commitment to quality, the bakery quickly became loved for its authentic taste, freshness, and warm hospitality.
      </p>

      <p>
        What began as a small neighborhood bakery soon evolved into a trusted name serving generations of customers with dedication and care.
      </p>

    </div>

  </div>
</section>

   <TimelineSection />

      {/* Legacy Video Section */}
      <section className="py-16 md:py-24 bg-stone-50 px-4 md:px-8 border-t border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0b4d30] font-bold mb-4">Our Legacy in Motion</h2>
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
              <div className="h-px bg-[#c49a3a]/50 w-12 sm:w-24" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#c49a3a" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0">
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
              </svg>
              <div className="h-px bg-[#c49a3a]/50 w-12 sm:w-24" />
            </div>
            <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">Experience the journey, the passion, and the craft behind every dish we serve.</p>
          </div>
          <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] aspect-video bg-stone-900 border-4 sm:border-8 border-white">
            <video 
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="none"
              poster="/legacy-story-new.png"
            >
              <source src="/legacy-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Heritage Banner Section */}
      <section className="py-10 md:py-16 bg-white px-4 md:px-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-stone-200 bg-stone-50 p-2 md:p-4">
            <img
              src="/heritage-banner.png?v=2"
              alt="Annapoorna Heritage"
              loading="lazy"
              className="w-full h-auto object-cover rounded-[24px]"
            />
          </div>
        </div>
      </section>
          </>
        ) : currentPage === 'book' ? (
          <div className={`pb-24 px-6 md:px-12 bg-stone-50 min-h-[80vh] transition-all duration-300 ${activeFestival && showFestivalBanner ? 'pt-40 md:pt-48' : 'pt-32 md:pt-40'}`}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-bold">Book Your Event</h2>
                <p className="text-lg text-stone-600 flex items-center justify-center gap-2">
                  <span className="w-8 h-px bg-brand-yellow"></span>
                  Inquire about Outdoor Catering & Party Hall
                  <span className="w-8 h-px bg-brand-yellow"></span>
                </p>
              </div>
              
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-green/5 rounded-tr-full pointer-events-none"></div>
                
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-stone-900 mb-2">Request Ready!</h3>
                    <p className="text-stone-600 max-w-md">
                      If WhatsApp did not open automatically, please click below to send us your details.
                    </p>
                    <button 
                      onClick={() => setFormStatus(null)}
                      className="mt-8 px-6 py-2 border-2 border-stone-200 text-stone-600 rounded-lg hover:border-brand-green hover:text-brand-green transition-colors font-bold"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookSubmit} className="relative z-10 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="book-name" className="text-sm font-bold tracking-wide text-stone-700">Full Name *</label>
                        <input 
                          type="text" id="book-name" required
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                          placeholder="John Doe"
                          value={bookFormData.name} onChange={(e) => setBookFormData({...bookFormData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="book-phone" className="text-sm font-bold tracking-wide text-stone-700">Phone Number *</label>
                        <input 
                          type="tel" id="book-phone" required
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                          placeholder="+91 98765 43210"
                          value={bookFormData.phone} onChange={(e) => setBookFormData({...bookFormData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="book-email" className="text-sm font-bold tracking-wide text-stone-700">Email Address</label>
                        <input 
                          type="email" id="book-email"
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                          placeholder="john@example.com"
                          value={bookFormData.email} onChange={(e) => setBookFormData({...bookFormData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="book-eventType" className="text-sm font-bold tracking-wide text-stone-700">Service Required *</label>
                        <div className="relative">
                          <select 
                            id="book-eventType" required
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all appearance-none pr-10"
                            value={bookFormData.eventType} onChange={(e) => setBookFormData({...bookFormData, eventType: e.target.value})}
                          >
                            <option value="catering">Outdoor Catering</option>
                            <option value="partyhall">Party Hall Booking</option>
                            <option value="both">Both (Catering & Party Hall)</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-stone-500">
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="book-eventDate" className="text-sm font-bold tracking-wide text-stone-700">Preferred Event Date *</label>
                        <div className="relative">
                          <input 
                            type="date" id="book-eventDate" required
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all pl-12"
                            value={bookFormData.eventDate} onChange={(e) => setBookFormData({...bookFormData, eventDate: e.target.value})}
                          />
                          <CalendarDays className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="book-guests" className="text-sm font-bold tracking-wide text-stone-700">Expected Guests *</label>
                        <div className="relative">
                          <input 
                            type="number" id="book-guests" min="10" required
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all pl-12"
                            placeholder="e.g. 150"
                            value={bookFormData.guests} onChange={(e) => setBookFormData({...bookFormData, guests: e.target.value})}
                          />
                          <Users className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="book-message" className="text-sm font-bold tracking-wide text-stone-700">Additional Details (Optional)</label>
                      <textarea 
                        id="book-message" rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all resize-none"
                        placeholder="Tell us about the occasion, preferred menu, timings, etc."
                        value={bookFormData.message} onChange={(e) => setBookFormData({...bookFormData, message: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center gap-3 py-2">
                       <input 
                         type="checkbox" 
                         id="signupForOffers" 
                         className="w-5 h-5 text-brand-green rounded border-stone-300 focus:ring-brand-green"
                         checked={bookFormData.signupForOffers} 
                         onChange={(e) => setBookFormData({...bookFormData, signupForOffers: e.target.checked})}
                       />
                       <label htmlFor="signupForOffers" className="text-stone-700 text-sm md:text-base cursor-pointer">Yes, sign me up for special offers & updates from Annapoorna.</label>
                    </div>

                    <div className="pt-4 text-center">
                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="bg-brand-red hover:bg-red-800 disabled:bg-red-400 text-white px-10 py-4 rounded-xl text-lg font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 mx-auto w-full md:w-auto min-w-[240px]"
                      >
                        {formStatus === 'submitting' ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Send className="w-5 h-5" /> Submit Inquiry
                          </>
                        )}
                      </button>
                      <p className="text-xs text-stone-500 mt-4">We respect your privacy. Your details are safe with us.</p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : currentPage === 'contact' ? (
          <div className={`pb-24 px-6 md:px-12 bg-stone-50 min-h-[80vh] transition-all duration-300 ${activeFestival && showFestivalBanner ? 'pt-40 md:pt-48' : 'pt-32 md:pt-40'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-bold">Contact Us</h2>
                <p className="text-lg text-stone-600 flex items-center justify-center gap-2">
                  <span className="w-8 h-px bg-brand-yellow"></span>
                  Get In Touch
                  <span className="w-8 h-px bg-brand-yellow"></span>
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-6 text-lg font-medium text-stone-700 max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-brand-green" /> <a href="tel:9019230429" className="hover:text-brand-yellow transition-colors">9019230429</a></div>
                    <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-brand-green" /> <a href="tel:9448279829" className="hover:text-brand-yellow transition-colors">9448279829</a></div>
                    <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-brand-green" /> <a href="mailto:annapurna198469@gmail.com" className="hover:text-brand-yellow transition-colors">annapurna198469@gmail.com</a></div>
                  </div>
                  <div className="flex items-start md:items-center gap-3 text-left md:text-center mt-4">
                    <MapPin className="w-6 h-6 text-brand-green shrink-0 mt-1 md:mt-0" /> 
                    <a href="https://maps.app.goo.gl/Y13WbY1D4u6jFpWYA" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
                      27, NTI Layout Vidyaranyapura, Main Road, Vidyaranyapura, Bangalore 560097
                    </a>
                  </div>
                  <div className="flex flex-col items-center mt-8 space-y-4 w-full">
                    
 <a
  href="https://www.google.com/maps/place/Annapoorna+Sweets+and+Snacks/@13.0768533,77.5581791,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae230eb446981f:0x9ad5ec8888dcf256!8m2!3d13.0768533!4d77.5581791!16s%2Fg%2F11j9ch8h4s?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0b4d30] text-white px-8 py-3 rounded-full font-bold hover:bg-brand-green transition-colors shadow-lg inline-flex items-center gap-3"
>
  <MapPin className="w-5 h-5" />
  Get Directions
</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100 relative overflow-hidden">
                <div className="text-center mb-10 space-y-2">
                  <h3 className="font-serif text-3xl text-stone-900 font-bold">Send us a Message</h3>
                  <p className="text-stone-600">Have a question or feedback? We'd love to hear from you.</p>
                </div>
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-stone-900 mb-2">Message Ready!</h3>
                    <p className="text-stone-600 max-w-md">
                      If WhatsApp did not open automatically, please click below to send us your message.
                    </p>
                    <button 
                      onClick={() => setFormStatus(null)}
                      className="mt-8 px-6 py-2 border-2 border-stone-200 text-stone-600 rounded-lg hover:border-brand-green hover:text-brand-green transition-colors font-bold"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="relative z-10 space-y-6 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-sm font-bold tracking-wide text-stone-700">Full Name *</label>
                        <input 
                          type="text" id="contact-name" required
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                          placeholder="John Doe"
                          value={contactFormData.name} onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-phone" className="text-sm font-bold tracking-wide text-stone-700">Phone Number *</label>
                        <input 
                          type="tel" id="contact-phone" required
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                          placeholder="+91 98765 43210"
                          value={contactFormData.phone} onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-bold tracking-wide text-stone-700">Email Address</label>
                      <input 
                        type="email" id="contact-email"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                        placeholder="john@example.com"
                        value={contactFormData.email} onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-sm font-bold tracking-wide text-stone-700">Your Message *</label>
                      <textarea 
                        id="contact-message" rows={4} required
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                        placeholder="How can we help you today?"
                        value={contactFormData.message} onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <div className="pt-4 text-center">
                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="bg-brand-red hover:bg-red-800 disabled:bg-red-400 text-white px-10 py-4 rounded-xl text-lg font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 mx-auto w-full md:w-auto min-w-[240px]"
                      >
                        {formStatus === 'submitting' ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Send className="w-5 h-5" /> Send via WhatsApp
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-40 pb-24 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center bg-stone-50">
            <h2 className="font-serif text-6xl md:text-8xl font-bold text-[#0b4d30] mb-4 drop-shadow-sm">404</h2>
            <div className="w-16 h-1 bg-[#a57f2a] mb-8 mx-auto"></div>
            <h3 className="text-2xl md:text-3xl font-semibold text-stone-700 mb-4">Oops! Page not found</h3>
            <p className="text-stone-500 mb-10 max-w-md mx-auto text-lg hover:text-stone-600 transition-colors">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button 
              onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}
              className="bg-[#0b4d30] hover:bg-brand-green text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" /> Return to Homepage
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#FCFAEF] text-stone-700 relative border-t border-[#e2d5bd]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          
          {/* Centered Brand Section */}
          <div className="flex flex-col items-center justify-center text-center gap-6 mb-16">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-[#e2d5bd]">
              <img src="/logo.jpg" alt="Annapoorna Logo" loading="lazy" className="w-full h-full object-contain rounded-full" />
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-serif text-3xl md:text-5xl text-[#0b4d30] font-bold tracking-wide">
                Annapoorna <span className="text-[#a57f2a]">Pure Veg</span>
              </h2>
              <p className="text-sm md:text-base font-medium text-stone-500 tracking-widest uppercase mt-2">
                A Legacy of Authentic Taste Since 1984
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-4xl mx-auto border-t border-[#e2d5bd]/50 pt-12">
            {/* Quick Links */}
            <div className="flex flex-col gap-6 items-start">
              <h4 className="text-[#0b4d30] font-serif text-xl font-semibold tracking-wide">Quick Links</h4>
              <div className="flex flex-col gap-4 text-stone-600 font-medium">
                <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo(0,0); }} className="hover:text-[#a57f2a] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-[#a57f2a]" /> Home</a>
                <a href="#menu" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => scrollToSection('menu'), 100); }} className="hover:text-[#a57f2a] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-[#a57f2a]" /> Menu</a>
                <a href="#signature-gallery" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => scrollToSection('signature-gallery'), 100); }} className="hover:text-[#a57f2a] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-[#a57f2a]" /> Gallery</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => scrollToSection('services'), 100); }} className="hover:text-[#a57f2a] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-[#a57f2a]" /> Services</a>
                <a href="#our-heritage" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => scrollToSection('our-heritage'), 100); }} className="hover:text-[#a57f2a] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-[#a57f2a]" /> Our Heritage</a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-6 items-start">
              <h4 className="text-[#0b4d30] font-serif text-xl font-semibold tracking-wide">Contact Us</h4>
              <div className="flex flex-col gap-4 text-stone-600 text-sm md:text-base font-medium">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#a57f2a] shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    27, NTI Layout Vidyaranyapura<br />Main Road, Vidyaranyapura,<br />Bangalore 560097
                  </p>
                </div>
                <div className="flex items-center gap-4 group">
                  <Phone className="w-5 h-5 text-[#a57f2a] shrink-0 group-hover:animate-pulse" />
                  <div className="flex flex-col">
                    <a href="tel:9019230429" className="hover:text-[#0b4d30] transition-colors">9019230429</a>
                    <a href="tel:9448279829" className="hover:text-[#0b4d30] transition-colors">9448279829</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <Mail className="w-5 h-5 text-[#a57f2a] shrink-0 group-hover:animate-pulse" />
                  <a href="mailto:annapurna198469@gmail.com" className="hover:text-[#0b4d30] transition-colors break-all">annapurna198469@gmail.com</a>
                </div>
                <div className="flex items-center gap-4 group mt-2 pt-2 border-t border-[#e2d5bd]/50">
                  <Clock className="w-5 h-5 text-[#a57f2a] shrink-0 group-hover:animate-pulse" />
                  <p className="text-[#0b4d30] font-semibold tracking-wide">7.30 AM to 10:00 PM</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#e2d5bd] bg-[#fdf6d0]/50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-stone-500 font-medium tracking-wide text-center md:text-left">
            <div>
              &copy; {new Date().getFullYear()} Annapoorna Pure Veg. All rights reserved.
            </div>
            <div className="flex items-center gap-1 text-sm md:text-base">
              Design by <span className="text-[#0b4d30] font-bold ml-1 text-base md:text-lg">Krishna Manohar</span>
            </div>
          </div>
        </div>
      </footer>



      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/30 transition-colors z-[110]"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
              className="relative w-full h-full max-w-[98vw] max-h-[95vh] overflow-y-auto overflow-x-hidden rounded-xl scrollbar-hide text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                 src={lightboxImage} 
                 alt="Menu Gallery Item" 
                 className="inline-block align-middle w-full h-auto max-w-5xl mx-auto object-contain rounded-xl shadow-2xl" 
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
