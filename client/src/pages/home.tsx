import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import ProductFilters from '@/components/product-filters';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Button } from '@/components/ui/button';
import { Product, HomeSection, HomeSectionItem } from '@shared/schema';
import { Currency } from '@/lib/currency';
import { ProductFilters as IProductFilters } from '@shared/cart-schema';
import { ArrowRight, Star, Sparkles, Crown, Gem, Heart, Watch, Users, Baby, Palette, Wrench, Diamond, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ringsImage from '@assets/new_rings.png';

interface HomeSectionWithItems extends HomeSection {
  items: HomeSectionItemWithProduct[];
}

interface HomeSectionItemWithProduct extends HomeSectionItem {
  product: Product;
}
import pendantsImage from '@assets/new_pendants.png';
import earringsImage from '@assets/new_earrings.png';
import braceletsImage from '@assets/bracelets_hero.png';
import necklacesImage from '@assets/necklaces_hero.png';
import chainsImage from '@assets/chains_hero.png';
import banglesImage from '@assets/bangles_hero_new.png';
import ringsImageMosaic from '@assets/rings_luxury.png';
import watchesImage from '@assets/watches_luxury_new.png';
import mensJewelryImage from '@assets/mens_jewelry_luxury_new.png';
import childrenJewelryImage from '@assets/children_jewelry_luxury_new.png';
import customJewelryImage from '@assets/custom_jewelry_luxury_new.png';
import collectionsImage from '@assets/collections_luxury_new.png';
import goldCollectionImage from '@assets/gold_collection_luxury.png';
import silverCollectionImage from '@assets/silver_collection_luxury.png';
import diamondCollectionImage from '@assets/diamond_collection_luxury_new.png';
import mangalsutraImage from '@assets/mangalsutra_new.png';
import noseJewelryImage from '@assets/nosepins_new.png';
import ankletsImage from '@assets/anklets_new.png';
import broochesImage from '@assets/brooches_new.png';
import bridalCollectionsImage from '@assets/bridal_new.png';
import newArrivalsBackground from '@assets/image_1756713608055.png';
import newArrivalsBackgroundNew from '@assets/new_arrivals_bg.png';

// Separate component for auto-scrolling categories to avoid React hooks rule violations
function CategoriesScrollSection({ categories, handleViewAllClick }: { categories: any[]; handleViewAllClick: (key: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft) {
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by 200px
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };

    const interval = setInterval(autoScroll, 3000); // Auto-scroll every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-4 pb-0" data-testid="section-categories" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <div className="px-2 md:px-6 lg:px-8">
        {/* Horizontally Scrollable Categories */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-4 lg:gap-6 pb-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {categories.map((category, index) => (
            <div 
              key={category.key}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200"
              onClick={() => handleViewAllClick(category.key)}
              data-testid={`category-card-${category.key}`}
            >
              {/* Category Image */}
              <div 
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full shadow-lg overflow-hidden mb-1.5 md:mb-2 bg-gradient-to-br from-white to-gray-50"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              {/* Category Name */}
              <h3 
                className="text-[9px] md:text-xs lg:text-sm font-light text-center leading-tight text-gray-700 px-0.5 w-20 md:w-24 lg:w-28 min-h-[28px] md:min-h-[32px] flex items-center justify-center"
              >
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Shop by Budget Component
function ShopByBudgetSection({ selectedCurrency }: { selectedCurrency: Currency }) {
  const budgetRanges = [
    {
      id: 1,
      label: 'Under',
      amount: selectedCurrency === 'INR' ? '₹15,000' : 'BD 75',
      value: selectedCurrency === 'INR' ? 15000 : 75,
      description: 'Perfect starter pieces',
      gradient: 'from-rose-400 to-pink-500',
      size: 'small'
    },
    {
      id: 2,
      label: 'Under',
      amount: selectedCurrency === 'INR' ? '₹30,000' : 'BD 150',
      value: selectedCurrency === 'INR' ? 30000 : 150,
      description: 'Elegant everyday jewelry',
      gradient: 'from-amber-400 to-orange-500',
      size: 'medium'
    },
    {
      id: 3,
      label: 'Under',
      amount: selectedCurrency === 'INR' ? '₹60,000' : 'BD 300',
      value: selectedCurrency === 'INR' ? 60000 : 300,
      description: 'Luxury statement pieces',
      gradient: 'from-emerald-400 to-teal-500',
      size: 'large'
    }
  ];

  const handleBudgetClick = (maxPrice: number) => {
    const params = new URLSearchParams();
    params.set('maxPrice', maxPrice.toString());
    params.set('currency', selectedCurrency);
    window.location.href = `/collections?${params.toString()}`;
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-100/20 to-transparent rounded-full blur-3xl"></div>
        
        {/* Sparkle decorations */}
        <div className="absolute top-32 right-32">
          <Sparkles className="w-6 h-6 text-pink-300/50 animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-32">
          <Diamond className="w-4 h-4 text-rose-300/50 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-48 left-20">
          <Star className="w-5 h-5 text-pink-400/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full px-6 py-3 mb-8 shadow-lg"
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-pink-700 uppercase">Shop by</span>
            <TrendingUp className="w-4 h-4 text-pink-600" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light text-gray-800 mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Budget
            <span className="text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text block md:inline ml-0 md:ml-4">
              ✨
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg font-light text-gray-600 max-w-2xl mx-auto" 
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Discover exquisite jewelry pieces perfectly curated for your budget range
          </motion.p>
        </div>

        {/* Budget Cards in Hexagonal Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
          {budgetRanges.map((budget, index) => {
            const sizeClasses: Record<string, string> = {
              small: 'w-48 h-48 md:w-56 md:h-56',
              medium: 'w-56 h-56 md:w-72 md:h-72',
              large: 'w-52 h-52 md:w-64 md:h-64'
            };
            
            const textSizes: Record<string, string> = {
              small: 'text-lg md:text-xl',
              medium: 'text-xl md:text-2xl',
              large: 'text-lg md:text-xl'
            };

            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative cursor-pointer group ${index === 1 ? 'md:-mt-8' : index === 2 ? 'md:mt-4' : ''}`}
                onClick={() => handleBudgetClick(budget.value)}
                style={{ perspective: '1000px' }}
              >
                {/* Hexagonal Shape */}
                <div 
                  className={`${sizeClasses[budget.size] || sizeClasses['medium']} relative`}
                  style={{
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                  }}
                >
                  {/* Gradient Background */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${budget.gradient} transition-all duration-500 group-hover:scale-110 group-hover:brightness-110`}
                    style={{
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    }}
                  />
                  
                  {/* Overlay for better text contrast */}
                  <div 
                    className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"
                    style={{
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    }}
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                    <div className="space-y-2">
                      <div className={`font-light ${textSizes[budget.size] || textSizes['medium']}`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {budget.label}
                      </div>
                      <div className={`font-bold ${budget.size === 'medium' ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                        {budget.amount}
                      </div>
                      <div className="text-xs md:text-sm font-medium opacity-90 max-w-32">
                        {budget.description}
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <motion.div 
                      className="absolute bottom-6 right-6 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Floating shadow */}
                <div 
                  className={`absolute inset-0 ${sizeClasses[budget.size] || sizeClasses['medium']} bg-black/10 blur-xl -z-10 transition-all duration-500 group-hover:blur-2xl group-hover:scale-110`}
                  style={{
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    transform: 'translateY(20px)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Can't find what you're looking for? 
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => window.location.href = '/collections'}
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Separate component for festival auto-scrolling 1x4 grid layout
function FestivalScrollSection({ items, selectedCurrency, handleViewAllClick }: { items: any[]; selectedCurrency: Currency; handleViewAllClick: (category: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;

    const autoScroll = () => {
      // Don't auto-scroll if user is manually scrolling
      if (isUserScrolling) return;
      
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Enhanced mobile scrolling - scroll by single product width for smoother transition
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? scrollContainer.clientWidth / 4 : scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft - 10) { // Small buffer to handle rounding
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by calculated distance
        scrollContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      }
    };

    // Enhanced user scroll detection
    let scrollDetectionTimeout: NodeJS.Timeout;
    const handleUserScroll = () => {
      setIsUserScrolling(true);
      
      // Clear existing timeouts
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (scrollDetectionTimeout) {
        clearTimeout(scrollDetectionTimeout);
      }
      
      // Use shorter timeout for mobile to detect scroll end more accurately
      const isMobile = window.innerWidth < 768;
      const timeoutDelay = isMobile ? 1500 : 3000;
      
      scrollDetectionTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 150); // Quick detection of scroll end
      
      // Resume auto-scroll after longer delay
      userScrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, timeoutDelay);
    };

    // Enhanced touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setIsUserScrolling(true);
      // Prevent momentum scrolling interference
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Clear existing timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      
      // Resume auto-scroll after brief delay for mobile
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 2000);
    };

    // Enhanced mobile touch handling
    const handleTouchMove = () => {
      setIsUserScrolling(true);
    };

    // Auto-scroll interval - faster for mobile for better UX
    const isMobile = window.innerWidth < 768;
    const intervalDelay = isMobile ? 3000 : 4000;
    const interval = setInterval(autoScroll, intervalDelay);
    
    // Add event listeners with passive option for better mobile performance
    scrollContainer.addEventListener('scroll', handleUserScroll, { passive: true });
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      clearInterval(interval);
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      if (scrollDetectionTimeout) {
        clearTimeout(scrollDetectionTimeout);
      }
      scrollContainer.removeEventListener('scroll', handleUserScroll);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isUserScrolling]);

  return (
    <div className="relative z-10">
      {items.length > 0 ? (
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-3 pb-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {/* Create groups of 4 products */}
          {Array.from({ length: Math.ceil(items.length / 4) }, (_, groupIndex) => (
            <div key={groupIndex} className="flex-shrink-0 grid grid-cols-4 gap-2 md:gap-3 w-full">
              {items.slice(groupIndex * 4, (groupIndex + 1) * 4).map((item, index) => (
            <div 
              key={item.id}
                className="w-full group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleViewAllClick(item.product.category)}
            >
                <div className="bg-white/20 md:bg-white/95 backdrop-blur-sm rounded-lg p-1.5 md:p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 md:border-white/50 h-full">
                  {/* Product Image */}
                  <div className="aspect-square mb-1.5 overflow-hidden rounded-md bg-gradient-to-br from-purple-50 to-pink-50">
                    <img
                      src={item.product.images?.[0] || ringsImage}
                      alt={item.product.name}
                      className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 mb-1">
                      <span className="text-amber-500 text-xs">₹</span>
                      <span className="text-xs md:text-sm font-semibold text-gray-800">
                        {item.product.priceInr?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-600 font-medium line-clamp-2">
                      {item.product.name}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full bg-white/20 md:bg-white/95 backdrop-blur-sm rounded-lg p-1.5 md:p-2 shadow-lg border border-white/30 md:border-white/50">
              <div className="aspect-square mb-1.5 overflow-hidden rounded-md bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-gray-400 text-xs">No Image</div>
              </div>
              <div className="text-center">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Separate component for New Arrivals layout to avoid React hooks rule violations
function NewArrivalsSection({ section, selectedCurrency }: { section: HomeSectionWithItems; selectedCurrency: Currency }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft) {
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by 300px
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    const interval = setInterval(autoScroll, 2000); // Auto-scroll every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="py-12" 
      data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
      style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.title || 'New Arrivals'}
          </h2>
          <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.description || 'New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!'}
          </p>
        </div>
        
        {/* Promotional Image with Overlay Button */}
        <div className="mb-8 relative">
          <img 
            src={newArrivalsBackgroundNew} 
            alt="New Arrivals - Ganesh Chaturthi Offer" 
            className="w-full h-auto max-w-none rounded-lg shadow-lg"
            style={{ minHeight: 'auto', objectFit: 'contain' }}
          />
          
          {/* Overlay Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button 
              className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200 shadow-lg" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              onClick={() => window.location.href = '/collections?category=new-arrivals'}
            >
              View All New Arrivals <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('BHD');

  // Listen for product addition events to auto-refresh homepage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'homepage-refresh') {
        // Refetch data when a product is added
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle "View All" button clicks - navigate to collections page
  const handleViewAllClick = (material: string) => {
    const materialPath = material.toLowerCase();
    window.location.href = `/collections/${materialPath}`;
  };

  // Category carousel data
  const categories = [
    { name: 'Rings', image: ringsImage, key: 'rings' },
    { name: 'Earrings', image: earringsImage, key: 'earrings' },
    { name: 'Pendants', image: pendantsImage, key: 'pendants' },
    { name: 'Necklaces', image: braceletsImage, key: 'necklaces' },
    { name: 'Bangles & Bracelets', image: banglesImage, key: 'bangles' },
    { name: 'Chains', image: necklacesImage, key: 'chains' },
    { name: 'Bracelets', image: chainsImage, key: 'bracelets' },
    { name: 'Nosepins', image: noseJewelryImage, key: 'nose-jewelry' },
    { name: 'Watches', image: watchesImage, key: 'watches' },
    { name: "Men's Jewelry", image: mensJewelryImage, key: 'mens' },
    { name: "Children's Jewelry", image: childrenJewelryImage, key: 'children' },
    { name: 'Custom Jewelry', image: customJewelryImage, key: 'custom' },
    { name: 'Collections', image: collectionsImage, key: 'collections' },
    { name: 'Gold Collection', image: goldCollectionImage, key: 'gold' },
    { name: 'Silver Collection', image: silverCollectionImage, key: 'silver' },
    { name: 'Diamond Collection', image: diamondCollectionImage, key: 'diamond' },
    { name: 'Mangalsutra', image: mangalsutraImage, key: 'mangalsutra' },
    { name: 'Anklets & Toe Rings', image: ankletsImage, key: 'anklets' },
    { name: 'Brooches & Pins', image: broochesImage, key: 'brooches' },
    { name: 'Bridal Collections', image: bridalCollectionsImage, key: 'bridal-collections' }
  ];


  // Fetch all products for display
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Fetch custom home sections
  const { data: homeSections = [] } = useQuery<HomeSectionWithItems[]>({
    queryKey: ['/api/home-sections/public'],
    queryFn: async () => {
      const response = await fetch('/api/home-sections/public');
      if (!response.ok) throw new Error('Failed to fetch home sections');
      const data = await response.json();
      return data;
    },
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: true, // Refetch when user focuses the window
    refetchInterval: 2000, // Auto-refetch every 2 seconds to catch admin updates
  });

  // Simple filtering for home page (not used directly but keeps type consistency)
  const filteredProducts = useMemo(() => {
    return allProducts.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }, [allProducts]);

  // Category counts for display
  const getCategoryCount = (category: string) => {
    return allProducts.filter(product => {
      // Don't exclude new arrivals - they should be counted in their respective categories too
      // Map display category names to database category names (handle both cases)
      const categoryMapping: { [key: string]: string } = {
        'rings': 'rings',
        'necklaces': 'necklaces', 
        'pendants': 'pendants',
        'earrings': 'earrings',
        'bracelets': 'bracelets',
        'bangles': 'bangles',
        'watches': 'watches',
        'mens_jewellery': 'mens_jewellery',
        'mens': 'mens_jewellery',
        'children_jewellery': 'children_jewellery',
        'children': 'children_jewellery',
        'materials': 'materials',
        'collections': 'collections',
        'custom_jewellery': 'custom_jewellery',
        'custom': 'custom_jewellery',
        'new_arrivals': 'new_arrivals',
        'anklets': 'anklets & toe rings' // Handle compound category names
      };
      const mappedCategory = categoryMapping[category.toLowerCase()] || category.toLowerCase();
      return product.category.toLowerCase() === mappedCategory.toLowerCase();
    }).length;
  };

  const getMaterialCount = (material: string) => {
    return allProducts.filter(product => {
      // Don't exclude new arrivals - they should be counted in their material categories too
      // Use metalType field for broad material categorization instead of material field
      return product.metalType === material;
    }).length;
  };

  // Material-based collections
  const goldProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'GOLD' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  const silverProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'SILVER' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  const diamondProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'DIAMOND' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Platinum Products
  const platinumProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'PLATINUM' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Gemstone Products  
  const gemstoneProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'GEMSTONE' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Pearl Products
  const pearlProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'PEARL' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Gold Plated Silver Products
  const goldPlatedSilverProducts = useMemo(() => 
    allProducts.filter(product => 
      product.material?.includes('GOLD_PLATED_SILVER') && !product.isNewArrival
    ).slice(0, 8), 
    [allProducts]
  );

  // Other Products
  const otherProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'OTHER' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // New Arrivals - Products specifically marked as new arrivals
  const newArrivalProducts = useMemo(() => {    
    return allProducts
      .filter(product => product.isNewArrival) // Only products explicitly marked as new arrivals
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 9);
  }, [allProducts]);

  // Enhanced Layout classes for home sections with modern designs
  const getLayoutClasses = (layoutType: string, itemCount: number) => {
    switch (layoutType) {
      case 'featured':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'mixed':
        return 'grid-cols-3 md:grid-cols-3 lg:grid-cols-4';
      case 'split':
        return 'grid-cols-1 md:grid-cols-2 gap-0';
      case 'mosaic':
        return 'grid-cols-12 auto-rows-fr gap-6';
      case 'royal':
        return 'grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6';
      case 'zen':
        return 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 lg:gap-8';
      case 'luxury':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
      case 'magazine':
        return 'grid-cols-12 auto-rows-[200px] gap-4';
      case 'floating':
        return 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 lg:gap-4';
      default:
        return 'grid-cols-3 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  const getSizeClasses = (size: string, layoutType: string = 'default') => {
    if (layoutType === 'royal') {
      switch (size) {
        case 'small':
          return 'col-span-2 row-span-2';
        case 'medium':
          return 'col-span-3 row-span-3';
        case 'large':
          return 'col-span-4 row-span-4';
        case 'xlarge':
          return 'col-span-6 row-span-4';
        default:
          return 'col-span-2 row-span-2';
      }
    } else if (layoutType === 'zen') {
      switch (size) {
        case 'small':
          return 'col-span-1 row-span-1';
        case 'medium':
          return 'col-span-2 row-span-2';
        case 'large':
          return 'col-span-3 row-span-2';
        case 'xlarge':
          return 'col-span-4 row-span-3';
        default:
          return 'col-span-2 row-span-2';
      }
    } else if (layoutType === 'magazine') {
      switch (size) {
        case 'small':
          return 'col-span-3 row-span-1';
        case 'medium':
          return 'col-span-4 row-span-2';
        case 'large':
          return 'col-span-6 row-span-3';
        case 'xlarge':
          return 'col-span-8 row-span-2';
        default:
          return 'col-span-4 row-span-2';
      }
    } else {
      switch (size) {
        case 'small':
          return 'col-span-1';
        case 'large':
          return 'col-span-2 row-span-2';
        default:
          return 'col-span-1';
      }
    }
  };

  return (
    <div className="min-h-screen" data-testid="page-home" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />

      {/* Hero Section - Find Your Perfect Match */}
      <section className="py-8 md:py-12" data-testid="section-hero" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
        <div className="px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Find Your Perfect Match
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-6">
            Shop by Categories
          </p>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <CategoriesScrollSection categories={categories} handleViewAllClick={handleViewAllClick} />

      {/* Section Divider - hidden for festival sections */}
      {homeSections.length > 0 && !homeSections.some(s => s.layoutType === 'festival') && (
        <div className="w-full border-t border-gray-200 my-8"></div>
      )}

      {/* Custom Admin Sections */}
      {homeSections.length > 0 && homeSections.map((section) => {
        if (section.items.length === 0) return null;
        
        // Split layout rendering - Elegant Design matching reference image
        if (section.layoutType === 'split') {
          return (
            <section 
              key={section.id} 
              className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                backgroundImage: `url(${newArrivalsBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Section Header */}
              <div className="relative z-20 text-left mb-8 md:mb-16 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title || 'New Arrivals'}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="text-amber-600">✦</span>
                    <span>500+ New Items</span>
                  </div>
                </div>
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  {section.description || 'New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!'}
                </p>
              </div>
              
              {/* Split Layout Container */}
              <div className="relative z-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  
                  {/* Left Half - First Category */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-2xl md:rounded-3xl"
                    onClick={() => handleViewAllClick(section.items[0]?.product?.category || 'mangalsutra')}
                  >
                    {/* Content Container */}
                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                      {/* Category Image */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <img
                            src={section.items[0]?.product?.images?.[0] || mangalsutraImage}
                            alt={section.items[0]?.product?.name || 'Mangalsutra'}
                            className="max-w-full h-40 md:h-56 object-contain filter drop-shadow-lg transform transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                  {/* Right Half - Second Category */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-2xl md:rounded-3xl"
                    onClick={() => handleViewAllClick(section.items[1]?.product?.category || 'pendants')}
                  >
                    {/* Content Container */}
                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                      {/* Category Image */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <img
                            src={section.items[1]?.product?.images?.[0] || pendantsImage}
                            alt={section.items[1]?.product?.name || 'Pendants'}
                            className="max-w-full h-40 md:h-56 object-contain filter drop-shadow-lg transform transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                </div>
                
                {/* Bottom Section Titles - Compact and Small */}
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
                  {/* Left Category Title - Blue */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewAllClick(section.items[0]?.product?.category || 'mangalsutra')}
                  >
                    <div 
                      className="rounded-lg py-2 px-4"
                      style={{ 
                        background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2A5F94 100%)',
                      }}
                    >
                      <h3 className="text-sm md:text-base font-light text-white text-center tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.items[0]?.product?.category || 'Bracelets'}
                      </h3>
                    </div>
                  </div>

                  {/* Right Category Title - Dark */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewAllClick(section.items[1]?.product?.category || 'pendants')}
                  >
                    <div 
                      className="rounded-lg py-2 px-4"
                      style={{ 
                        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 50%, #171923 100%)',
                      }}
                    >
                      <h3 className="text-sm md:text-base font-light text-white text-center tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.items[1]?.product?.category || 'Nose Jewellery'}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Carousel layout rendering - Elegant horizontal sliding showcase
        if (section.layoutType === 'carousel') {
          return (
            <section 
              key={section.id} 
              className="py-16 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
              }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-light text-gray-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                  )}
                </div>
                
                {/* Horizontal Scrolling Carousel */}
                <div className="relative">
                  <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {section.items.map((item, index) => (
                      <div key={item.id} className="flex-none w-72 md:w-80">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-amber-400/20 rounded-2xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
                          <div className="relative bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Scroll Indicators */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {section.items.map((_, index) => (
                      <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Sophisticated Art Gallery Mosaic - Mosaic
        if (section.layoutType === 'mosaic') {
          return (
            <section 
              key={section.id} 
              className="py-24 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                background: `
                  linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #f8f8f8 100%)
                `
              }}
            >
              {/* Subtle Gallery Atmosphere */}
              <div className="absolute inset-0">
                {/* Gallery Lighting */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100/50 via-white/30 to-transparent"></div>
                
                {/* Refined Pattern */}
                <div className="absolute inset-0 opacity-[0.015]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(45deg, #000 1px, transparent 1px),
                      linear-gradient(-45deg, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Sophisticated Gallery Header */}
                <div className="text-center mb-24">
                  <div className="inline-block relative">
                    {/* Refined Header Decorations */}
                    <div className="mb-12">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
                        <div className="mx-4 w-2 h-2 bg-black rounded-full"></div>
                        <div className="w-12 h-px bg-black"></div>
                        <div className="mx-4 w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
                      </div>
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-light text-black mb-8 tracking-wide hover:tracking-wider transition-all duration-700 transform hover:scale-105" 
                        style={{ 
                          fontFamily: 'Playfair Display, serif',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}>
                      {section.title || 'Curated Collection'}
                    </h2>
                    
                    {/* Enhanced Decorative Elements */}
                    <div className="mb-12">
                      <div className="flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="mx-4 w-12 h-px bg-black"></div>
                        <div className="mx-4 w-2 h-2 bg-black rounded-full"></div>
                        <div className="mx-4 w-20 h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
                        <div className="mx-4 w-2 h-2 bg-black rounded-full"></div>
                        <div className="mx-4 w-12 h-px bg-black"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {section.description && (
                      <p className="text-lg text-gray-700 font-light max-w-3xl mx-auto leading-relaxed hover:text-gray-600 transition-colors duration-500">
                        {section.description}
                      </p>
                    )}
                    
                    {/* Subtle Date/Time Display */}
                    <div className="mt-8 text-xs text-gray-400 uppercase tracking-[0.3em] font-medium">
                      Gallery Curated · {new Date().getFullYear()}
                    </div>
                  </div>
                </div>
                
                {/* Premium Masonry Gallery Grid */}
                <div className="grid grid-cols-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 lg:gap-10 space-y-0 md:space-y-8 lg:space-y-10">
                  {section.items.slice(0, 4).map((item, index) => {
                    // Enhanced dynamic heights for sophisticated masonry effect
                    const heights = ['h-72', 'h-80', 'h-96', 'h-64', 'h-88', 'h-76', 'h-84', 'h-68'];
                    const height = heights[index % heights.length];
                    
                    // Enhanced styling variations
                    const variations = [
                      { shadow: 'shadow-lg', border: 'border-gray-200' },
                      { shadow: 'shadow-md', border: 'border-gray-150' },
                      { shadow: 'shadow-xl', border: 'border-gray-250' }
                    ];
                    const variation = variations[index % variations.length];
                    
                    return (
                      <div
                        key={item.id}
                        className={`break-inside-avoid mb-8 md:mb-10 group cursor-pointer transform transition-all duration-500 md:duration-700 hover:scale-[1.01] md:hover:scale-[1.02] active:scale-[0.98] md:active:scale-[1.02]`}
                        onClick={() => handleViewAllClick(item.product.category)}
                        onTouchStart={() => {}} // Enable touch interactions
                        style={{ 
                          animationDelay: `${index * 0.08}s`,
                          opacity: 0,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <article className={`bg-white rounded-lg md:rounded-xl ${variation.shadow} md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 md:duration-700 overflow-hidden border ${variation.border} hover:border-gray-300 active:border-gray-400 relative group-hover:transform group-hover:-translate-y-0.5 md:group-hover:-translate-y-1 hover:rotate-0.5 md:hover:rotate-1`}>
                          {/* Sophisticated Corner Accents - Hidden on mobile for performance */}
                          <div className="hidden md:block absolute top-0 right-0 w-0 h-0 border-l-[20px] md:border-l-[24px] border-l-transparent border-t-[20px] md:border-t-[24px] border-t-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:duration-500"></div>
                          <div className="hidden md:block absolute bottom-0 left-0 w-0 h-0 border-r-[20px] md:border-r-[24px] border-r-transparent border-b-[20px] md:border-b-[24px] border-b-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:duration-700"></div>
                          
                          {/* Mobile-optimized Image Container */}
                          <div className={`relative ${height} overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100`}>
                            {/* Subtle Pattern Overlay - Reduced on mobile */}
                            <div className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]">
                              <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, #000 1px, transparent 1px)`,
                                backgroundSize: '15px 15px'
                              }}></div>
                            </div>
                            
                            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                              <div className="transform transition-all duration-500 md:duration-700 group-hover:scale-105 md:group-hover:scale-110 group-hover:rotate-0.5 md:group-hover:rotate-1 filter group-hover:drop-shadow-md md:group-hover:drop-shadow-lg w-full max-w-[260px] md:max-w-[300px]">
                                <div className="scale-85 md:scale-95 origin-center">
                                  <ProductCard
                                    product={item.product}
                                    currency={selectedCurrency}
                                    showActions={false}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {/* Mobile-optimized Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/6 md:from-black/8 via-transparent to-white/3 md:to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 md:duration-500"></div>
                            
                            
                            {/* Touch-friendly Category Badge */}
                            <div className="absolute top-4 md:top-6 right-4 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 md:duration-500 transform translate-y-2 md:translate-y-3 group-hover:translate-y-0">
                              <div className="bg-black/80 md:bg-black/85 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 text-xs text-white font-semibold uppercase tracking-wider rounded-full border border-white/20 shadow-md md:shadow-lg">
                                {item.product.category}
                              </div>
                            </div>
                            
                            {/* Mobile-optimized Action Indicator */}
                            <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 md:duration-700 transform translate-x-3 md:translate-x-4 group-hover:translate-x-0">
                              <div className="w-10 md:w-12 h-10 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-all duration-200 md:duration-300 active:scale-95 md:hover:scale-110 border border-gray-200">
                                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 text-gray-700" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Mobile-Optimized Gallery Information */}
                          <div className="p-6 md:p-8 space-y-4 md:space-y-5">
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 md:w-8 h-px bg-black"></div>
                                <div className="text-xs text-gray-500 uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium">
                                  Collection
                                </div>
                              </div>
                              
                              <h3 className="text-xl md:text-2xl font-light text-black leading-tight mb-3 md:mb-4 group-hover:text-gray-700 transition-colors duration-200 md:duration-300" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                {item.product.name}
                              </h3>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-lg md:text-xl font-semibold text-black">
                                  {selectedCurrency === 'BHD' ? 'BD ' : '₹'}
                                  {selectedCurrency === 'BHD' 
                                    ? (parseFloat(item.product.priceBhd || '0')).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
                                    : (parseFloat(item.product.priceInr || '0')).toLocaleString('en-IN')
                                  }
                                </div>
                                
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 md:duration-500 transform translate-x-3 md:translate-x-4 group-hover:translate-x-0">
                                  <div className="w-9 md:w-10 h-9 md:h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white active:bg-gray-800 transition-all duration-200 md:duration-300 active:scale-95 md:hover:rotate-90 touch-manipulation">
                                    <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Mobile-Optimized Additional Details */}
                            {item.product.description && (
                              <div className="pt-4 md:pt-5 border-t border-gray-150">
                                <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:text-gray-700 transition-colors duration-200 md:duration-300">
                                  {item.product.description}
                                </p>
                              </div>
                            )}
                            
                            {/* Mobile-friendly Bottom Accent */}
                            <div className="absolute bottom-0 left-6 md:left-8 right-6 md:right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:duration-500"></div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                  {/* Show remaining items on larger screens */}
                  <div className="hidden md:contents">
                    {section.items.slice(4).map((item, index) => {
                      const originalIndex = index + 4;
                      const heights = ['h-72', 'h-80', 'h-96', 'h-64', 'h-88', 'h-76', 'h-84', 'h-68'];
                      const height = heights[originalIndex % heights.length];
                      
                      const variations = [
                        { shadow: 'shadow-lg', border: 'border-gray-200' },
                        { shadow: 'shadow-md', border: 'border-gray-150' },
                        { shadow: 'shadow-xl', border: 'border-gray-250' }
                      ];
                      const variation = variations[originalIndex % variations.length];
                      
                      return (
                        <div
                          key={item.id}
                          className={`break-inside-avoid mb-8 md:mb-10 group cursor-pointer transform transition-all duration-500 md:duration-700 hover:scale-[1.01] md:hover:scale-[1.02] active:scale-[0.98] md:active:scale-[1.02]`}
                          onClick={() => handleViewAllClick(item.product.category)}
                          onTouchStart={() => {}}
                          style={{ 
                            animationDelay: `${originalIndex * 0.08}s`,
                            opacity: 0,
                            animation: 'fadeInUp 0.6s ease-out forwards'
                          }}
                        >
                          <article className={`bg-white rounded-lg md:rounded-xl ${variation.shadow} md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 md:duration-700 overflow-hidden border ${variation.border} hover:border-gray-300 active:border-gray-400 relative group-hover:transform group-hover:-translate-y-0.5 md:group-hover:-translate-y-1 hover:rotate-0.5 md:hover:rotate-1`}>
                            <div className="hidden md:block absolute top-0 right-0 w-0 h-0 border-l-[20px] md:border-l-[24px] border-l-transparent border-t-[20px] md:border-t-[24px] border-t-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:duration-500"></div>
                            <div className="hidden md:block absolute bottom-0 left-0 w-0 h-0 border-r-[20px] md:border-r-[24px] border-r-transparent border-b-[20px] md:border-b-[24px] border-b-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:duration-700"></div>
                            
                            <div className={`relative ${height} overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100`}>
                              <div className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]">
                                <div className="absolute inset-0" style={{
                                  backgroundImage: `radial-gradient(circle at 25% 25%, #000 1px, transparent 1px)`,
                                  backgroundSize: '15px 15px'
                                }}></div>
                              </div>
                              
                              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                                <ProductCard
                                  product={item.product}
                                  currency={selectedCurrency}
                                  showActions={false}
                                />
                              </div>
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Enhanced Animation Styles */}
                <style>{`
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
                
                {/* Gallery Footer */}
                <div className="text-center mt-20 pt-12 border-t border-gray-200">
                  <button 
                    className="inline-flex items-center gap-3 bg-black text-white px-12 py-4 hover:bg-gray-800 transition-colors duration-300 font-medium tracking-wide"
                    onClick={() => window.location.href = '/collections'}
                  >
                    View Complete Collection
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>
          );
        }

        // Luxury layout rendering - Hero product with elegant arrangement
        if (section.layoutType === 'luxury') {
          const heroProduct = section.items[0];
          const otherProducts = section.items.slice(1);
          
          return (
            <section 
              key={section.id} 
              className="py-20" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
              }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                  )}
                </div>
                
                {heroProduct && (
                  <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Hero Product */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-yellow-400/20 rounded-3xl transform rotate-3"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-rose-300/20 to-pink-400/10 rounded-3xl transform -rotate-2"></div>
                      <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
                        <ProductCard
                          product={heroProduct.product}
                          currency={selectedCurrency}
                          showActions={false}
                        />
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Featured
                        </div>
                      </div>
                    </div>
                    
                    {/* Supporting Content */}
                    <div className="space-y-8">
                      <div className="text-center lg:text-left">
                        <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          Exquisite Craftsmanship
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Discover our premium collection featuring the finest materials and exceptional artistry.
                        </p>
                      </div>
                      
                      {/* Mini Gallery */}
                      <div className="grid grid-cols-2 gap-4">
                        {otherProducts.slice(0, 4).map((item) => (
                          <div key={item.id} className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        }

        // New Arrivals layout rendering - Horizontal auto-scrolling layout
        if (section.layoutType === 'new-arrivals') {
          return <NewArrivalsSection key={section.id} section={section} selectedCurrency={selectedCurrency} />;
        }

        // Curved Product Grid layout rendering - Elegant curved showcase
        if (section.layoutType === 'curved-grid') {
          return (
            <section 
              key={section.id} 
              className="py-20 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
              }}
            >
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-rose-200/20 to-transparent rounded-full blur-3xl"></div>
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-light text-gray-800 mb-6" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {section.title}
                  </motion.h2>
                  {section.description && (
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-lg font-light text-gray-600 max-w-2xl mx-auto" 
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {section.description}
                    </motion.p>
                  )}
                </div>
                
                {/* Curved Product Grid */}
                <div className="relative max-w-7xl mx-auto">
                  {/* Navigation Arrows */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-amber-600 transition-colors"
                      onClick={() => {
                        const container = document.querySelector(`[data-section-id="${section.id}"] .curved-scroll-container`);
                        if (container) {
                          container.scrollBy({ left: -300, behavior: 'smooth' });
                        }
                      }}
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                    </motion.button>
                  </div>
                  
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-amber-600 transition-colors"
                      onClick={() => {
                        const container = document.querySelector(`[data-section-id="${section.id}"] .curved-scroll-container`);
                        if (container) {
                          container.scrollBy({ left: 300, behavior: 'smooth' });
                        }
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Scrollable container with curved layout */}
                  <div 
                    className="curved-scroll-container overflow-x-auto scrollbar-hide pb-8"
                    data-section-id={section.id}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <div className="flex gap-6 min-w-max px-16">
                      {section.items.map((item, index) => {
                        // Create curved positioning
                        const totalItems = section.items.length;
                        const middleIndex = (totalItems - 1) / 2;
                        const distanceFromCenter = Math.abs(index - middleIndex);
                        const maxDistance = Math.floor(totalItems / 2);
                        const curveHeight = distanceFromCenter === 0 ? 0 : (distanceFromCenter / maxDistance) * 60;
                        
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50, rotateY: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ 
                              duration: 0.8, 
                              delay: index * 0.1,
                              type: "spring",
                              stiffness: 100
                            }}
                            whileHover={{ 
                              y: -10, 
                              rotateY: 5,
                              scale: 1.02,
                              transition: { duration: 0.3 }
                            }}
                            className="flex-none w-80 relative"
                            style={{
                              transform: `translateY(${curveHeight}px)`,
                              perspective: '1000px'
                            }}
                          >
                            {/* Card container with luxury styling */}
                            <div className="relative group">
                              {/* Floating backdrop */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-amber-100/30 rounded-3xl transform rotate-1 transition-all duration-500 group-hover:rotate-2 group-hover:scale-105 blur-sm"></div>
                              
                              {/* Main card */}
                              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-all duration-500 group-hover:shadow-3xl border border-white/50">
                                {/* Product image with sophisticated styling */}
                                <div className="relative mb-6 overflow-hidden rounded-2xl">
                                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                                    {item.product.images && item.product.images.length > 0 ? (
                                      <img 
                                        src={item.product.images[0]} 
                                        alt={item.product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Gem className="w-16 h-16 text-gray-300" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Hover overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Product details */}
                                <div className="text-center space-y-4">
                                  <h3 className="text-xl font-medium text-gray-800 line-clamp-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                    {item.product.name}
                                  </h3>
                                  
                                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                                      {item.product.category}
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                                      {selectedCurrency === 'INR' ? '₹' : 'BD '}
                                      {selectedCurrency === 'INR' ? 
                                        parseFloat(item.product.priceInr).toLocaleString('en-IN') :
                                        parseFloat(item.product.priceBhd).toLocaleString('en-BH', { minimumFractionDigits: 3 })
                                      }
                                    </div>
                                    
                                    {item.product.grossWeight && (
                                      <div className="text-sm text-gray-500">
                                        Weight: {parseFloat(item.product.grossWeight).toFixed(2)}g
                                      </div>
                                    )}
                                  </div>

                                  {/* Action button */}
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                    onClick={() => window.location.href = `/product/${item.product.id}`}
                                  >
                                    View Details
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f8f4f0] to-transparent pointer-events-none"></div>
                </div>
              </div>
            </section>
          );
        }

        // Magazine layout rendering - Luxury Editorial Design
        if (section.layoutType === 'magazine') {
          return (
            <section 
              key={section.id} 
              className="relative bg-gradient-to-br from-neutral-50 via-white to-stone-50/80 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Sophisticated Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, #000 1px, transparent 0), radial-gradient(circle at 75px 75px, #000 1px, transparent 0)`,
                  backgroundSize: '100px 100px'
                }}></div>
              </div>

              <div className="relative z-10">
                {/* Luxury Magazine Header */}
                <div className="py-20 md:py-32">
                  <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center mb-20">
                      {/* Elegant Brand Mark */}
                      <div className="mb-12">
                        <div className="relative inline-block">
                          <div className="absolute -top-4 -left-8 w-16 h-16 border border-amber-200 rounded-full opacity-30"></div>
                          <div className="absolute -bottom-4 -right-8 w-12 h-12 border border-amber-300 rounded-full opacity-20"></div>
                          <div className="relative bg-white/80 backdrop-blur-sm border border-amber-100 rounded-full px-8 py-4 shadow-lg">
                            <span className="text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase">
                              Palaniappa Exclusive
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dramatic Typography */}
                      <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-thin text-neutral-900 mb-4 tracking-tight leading-[0.85]" 
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          {section.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 mt-8">
                          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        </div>
                      </div>
                      
                      {section.description && (
                        <div className="max-w-4xl mx-auto">
                          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-600 leading-relaxed font-light italic tracking-wide"
                             style={{ fontFamily: 'Playfair Display, serif' }}>
                            "{section.description}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Luxury Editorial Grid */}
                <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
                  {/* Main Feature Story */}
                  {section.items[0] && (
                    <div className="mb-16">
                      <div className="relative group">
                        {/* Hero Article */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                          {/* Large Image Section */}
                          <div className="lg:col-span-3 relative overflow-hidden">
                            <div className="aspect-[4/3] lg:aspect-[3/2] relative">
                              <ProductCard
                                product={section.items[0].product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={section.items[0].customImageUrl}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                              
                              {/* Floating Feature Badge */}
                              <div className="absolute top-8 left-8">
                                <div className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg">
                                  <span className="text-sm font-semibold tracking-wide">COVER STORY</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-neutral-50/50">
                            <div className="mb-6">
                              <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2 block">
                                {section.items[0].product.category}
                              </span>
                              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-neutral-900 leading-tight mb-6" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                {section.items[0].product.name}
                              </h2>
                            </div>
                            
                            <p className="text-neutral-600 leading-relaxed text-lg mb-8 font-light">
                              {section.items[0].product.description || 'An extraordinary masterpiece that embodies the pinnacle of craftsmanship and design excellence.'}
                            </p>
                            
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <span className="text-3xl font-light text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  {selectedCurrency === 'INR' ? '₹' : 'BD'} {selectedCurrency === 'INR' ? section.items[0].product.priceInr?.toLocaleString() : Number(section.items[0].product.priceBhd)?.toFixed(3)}
                                </span>
                              </div>
                              <Button 
                                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 hover:shadow-xl group"
                              >
                                Discover More
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Secondary Articles Grid */}
                  {section.items.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                      {section.items.slice(1, 4).map((item, index) => (
                        <div key={item.id} className="group">
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-white/30 h-full">
                            <div className="aspect-[4/3] relative overflow-hidden">
                              <ProductCard
                                product={item.product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={item.customImageUrl}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                              
                              {/* Article Number */}
                              <div className="absolute top-4 right-4">
                                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-neutral-700">{index + 2}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <div className="mb-3">
                                <span className="text-xs font-bold tracking-[0.15em] text-amber-600 uppercase">
                                  {item.product.category}
                                </span>
                              </div>
                              <h3 className="text-xl lg:text-2xl font-light text-neutral-900 leading-tight mb-4" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                {item.product.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-light text-neutral-700">
                                  {selectedCurrency === 'INR' ? '₹' : 'BD'} {selectedCurrency === 'INR' ? item.product.priceInr?.toLocaleString() : Number(item.product.priceBhd)?.toFixed(3)}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-amber-600 hover:bg-amber-50 hover:text-amber-700 p-2 rounded-full"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Additional Items Grid */}
                  {section.items.length > 4 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                      {section.items.slice(4).map((item, index) => (
                        <div key={item.id} className="group">
                          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100">
                            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-neutral-50 to-stone-100">
                              <ProductCard
                                product={item.product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={item.customImageUrl}
                              />
                            </div>
                            <div className="p-4">
                              <span className="text-xs font-medium text-amber-600 uppercase tracking-wider block mb-2">
                                {item.product.category}
                              </span>
                              <h5 className="text-sm font-light text-neutral-900 leading-snug line-clamp-2">
                                {item.product.name}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Luxury Editorial Footer */}
                  {section.items.length > 0 && (
                    <div className="relative mt-24 pt-16">
                      {/* Elegant Divider */}
                      <div className="flex items-center justify-center mb-16">
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        <div className="mx-8">
                          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                        </div>
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                      </div>
                      
                      {/* Closing Statement */}
                      <div className="text-center max-w-3xl mx-auto mb-12">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-6 leading-tight" 
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          The Story Continues
                        </h3>
                        <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed italic mb-8">
                          "Each piece tells a story of timeless elegance and exceptional craftsmanship"
                        </p>
                        <div className="space-y-4">
                          <Button 
                            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-base font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform" 
                            onClick={() => window.location.href = '/collections'}
                          >
                            Explore Full Collection
                            <ArrowRight className="ml-3 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        // Festival layout rendering - Full background with overlay content
        if (section.layoutType === 'festival') {
          return (
            <section 
              key={section.id} 
              className="w-full relative overflow-hidden -mt-0 -mb-8 m-0 p-0" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {section.festivalImage ? (
                <div 
                  className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] m-0 p-0"
                  style={{
                    backgroundImage: `url("${section.festivalImage}")`,
                    backgroundSize: '120%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
                  
                  {/* Full content container */}
                  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 h-full flex flex-col">
                    
                    {/* Header content */}
                    <div className="text-center mb-8">
                      {/* Main Heading */}
                      <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 leading-tight tracking-wide drop-shadow-lg"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {section.title}
                      </h2>
                      
                      {/* Italic subtitle */}
                      {section.subtitle && (
                        <p 
                          className="text-2xl md:text-3xl text-white/90 italic mb-6 font-light drop-shadow-md"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {section.subtitle}
                        </p>
                      )}
                      
                      {/* Description */}
                      {section.description && (
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-lg mx-auto drop-shadow-sm">
                          {section.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Products section with festival background */}
                    {section.items && section.items.length > 0 && (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-5xl">
                          <FestivalScrollSection 
                            items={section.items} 
                            selectedCurrency={selectedCurrency} 
                            handleViewAllClick={handleViewAllClick} 
                          />
                          
                          {/* Call to Action Button */}
                          <div className="text-center mt-8">
                            <Button 
                              className="bg-white/90 hover:bg-white text-gray-900 px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm" 
                              style={{ fontFamily: 'Cormorant Garamond, serif' }}
                              onClick={() => window.location.href = '/collections'}
                            >
                              View Full Collection
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div 
                  className="relative w-full min-h-[400px] md:min-h-[500px]"
                  style={{ 
                    background: 'linear-gradient(135deg, #B19CD9 0%, #C8A9DD 25%, #DEB4E2 50%, #E8BFE8 75%, #F0CAF0 100%)',
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      
                      {/* Left side - Text content */}
                      <div className="relative z-10 text-left">
                        {/* Main Heading */}
                        <h2 
                          className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-3 leading-tight tracking-wide"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {section.title}
                        </h2>
                        
                        {/* Italic subtitle */}
                        {section.subtitle && (
                          <p 
                            className="text-2xl md:text-3xl text-gray-700 italic mb-6 font-light"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          >
                            {section.subtitle}
                          </p>
                        )}
                        
                        {/* Description */}
                        {section.description && (
                          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                            {section.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Right side - Auto-scrolling 1x3 Product showcase */}
                      <div className="relative z-10">
                        <FestivalScrollSection 
                          items={section.items} 
                          selectedCurrency={selectedCurrency} 
                          handleViewAllClick={handleViewAllClick} 
                        />
                        
                        {/* Call to Action Button */}
                        <div className="text-center mt-6">
                          <Button 
                            className="bg-purple-700 hover:bg-purple-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg" 
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            onClick={() => window.location.href = '/collections'}
                          >
                            View Full Collection
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Only show products section if no festival image (fallback) */}
              {!section.festivalImage && section.items && section.items.length > 0 && (
                <section className="py-8 bg-white" data-testid={`${section.title.toLowerCase().replace(/\s+/g, '-')}-products`}>
                  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <FestivalScrollSection 
                      items={section.items} 
                      selectedCurrency={selectedCurrency} 
                      handleViewAllClick={handleViewAllClick} 
                    />
                    
                    {/* Call to Action Button */}
                    <div className="text-center mt-8">
                      <Button 
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg" 
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        onClick={() => window.location.href = '/collections'}
                      >
                        View Full Collection
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </section>
          );
        }

        // Diamond layout rendering - Enhanced luxury diamond showcase with premium animations
        if (section.layoutType === 'diamond') {
          return (
            <section 
              key={section.id} 
              className="py-20 md:py-32 overflow-hidden relative min-h-screen" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 20%, #16213e 40%, #0f3460 60%, #533a7b 80%, #6a4c93 100%)',
              }}
            >
              {/* Enhanced Cosmic Background Effects */}
              <div className="absolute inset-0">
                {/* Floating particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '3s' }}></div>
                
                {/* Large gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-purple-400/25 to-blue-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                
                {/* Sparkle effects */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                  <div className="mb-8">
                    <div className="inline-block">
                      <h2 className="text-5xl md:text-8xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-orange-300 mb-6 tracking-widest animate-pulse" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.title || 'DIAMOND COLLECTION'}
                      </h2>
                      <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 via-white to-transparent mx-auto mb-6 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-white/90 text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed">{section.description || 'Discover the brilliance of our exclusive diamond collection, where each piece reflects pure luxury and timeless elegance'}</p>
                </div>

                <div className="relative">
                  {/* Enhanced Central Diamond */}
                  <div className="flex justify-center mb-16">
                    <div className="relative">
                      {/* Rotating ring around central diamond */}
                      <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96 border border-amber-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                      <div className="absolute inset-4 w-72 h-72 md:w-88 md:h-88 border border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
                      
                      <div 
                        className="w-72 h-72 md:w-88 md:h-88 transform rotate-45 relative group cursor-pointer transition-all duration-1000 hover:scale-110 hover:rotate-[50deg]"
                        onClick={() => section.items[0] && handleViewAllClick('featured')}
                      >
                        {/* Multiple gradient layers for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 via-orange-500/30 to-yellow-600/20 rounded-3xl animate-pulse shadow-2xl"></div>
                        <div className="absolute inset-1 bg-gradient-to-tl from-white/20 via-transparent to-purple-400/10 rounded-3xl"></div>
                        <div className="absolute inset-2 bg-gradient-to-br from-transparent via-amber-300/15 to-transparent rounded-2xl"></div>
                        
                        {/* Glowing border effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/50 via-white/30 to-purple-400/50 p-0.5">
                          <div className="w-full h-full bg-black/20 rounded-3xl"></div>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-56 h-56 md:w-72 md:h-72 -rotate-45 overflow-hidden rounded-3xl shadow-2xl border border-white/20">
                            {section.items[0] && (
                              <img
                                src={section.items[0].product.images?.[0] || ringsImage}
                                alt="Featured Diamond Piece"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                              <div className="text-center w-full">
                                <h3 className="text-white font-light text-xl md:text-2xl mb-3 tracking-wide">SIGNATURE PIECE</h3>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-white mx-auto"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Premium badge */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-white/30 animate-pulse">
                          PREMIUM
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Surrounding Diamonds with Better Layout */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-16">
                    {section.items.slice(1, 5).map((item, index) => (
                      <div key={item.id} className="flex justify-center">
                        <div 
                          className="w-36 h-36 md:w-48 md:h-48 transform rotate-45 relative group cursor-pointer transition-all duration-700 hover:scale-110 hover:rotate-[50deg]"
                          onClick={() => handleViewAllClick('rings')}
                        >
                          {/* Enhanced gradient effects */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/25 via-blue-500/20 to-indigo-600/15 rounded-2xl animate-pulse shadow-xl" style={{ animationDelay: `${index * 300}ms` }}></div>
                          <div className="absolute inset-1 bg-gradient-to-tl from-white/15 to-transparent rounded-2xl"></div>
                          
                          {/* Glowing border */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/40 via-blue-400/30 to-indigo-400/40 p-0.5">
                            <div className="w-full h-full bg-black/20 rounded-2xl"></div>
                          </div>
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-28 h-28 md:w-40 md:h-40 -rotate-45 overflow-hidden rounded-xl shadow-xl border border-white/20">
                              <img
                                src={item.product.images?.[0] || [necklacesImage, earringsImage, pendantsImage, banglesImage][index]}
                                alt={`Diamond ${index + 1}`}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          </div>
                          
                          {/* Price display */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -rotate-45 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                            {selectedCurrency === 'BHD' ? `${item.product.priceBhd} BHD` : `₹${item.product.priceInr}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action Section */}
                  <div className="text-center">
                    <div className="mb-8">
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        Experience Diamond Perfection
                      </h3>
                      <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Each diamond tells a story of brilliance, cut to perfection and set with unmatched craftsmanship
                      </p>
                    </div>
                    <button 
                      className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:via-yellow-500 hover:to-amber-600 text-black px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform border border-white/20"
                      onClick={() => window.location.href = '/collections/diamond'}
                    >
                      Explore Diamond Collection
                      <span className="ml-2 text-xl">💎</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Premium Layout - Modern Asymmetric Masonry Layout
        if (section.layoutType === 'premium') {
          return (
            <section 
              key={section.id} 
              className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="max-w-7xl mx-auto px-6">
                {/* Modern Header */}
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                      {section.description}
                    </p>
                  )}
                </div>
                
                {/* Asymmetric Masonry Grid - Desktop Quality Mobile */}
                {section.items && section.items.length > 0 && (
                  <div className="relative">
                    {/* Mobile: Same sophisticated structure as desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
                      {section.items.map((item, index) => {
                        // Dynamic sizing pattern - Desktop Experience on Mobile
                        const getCardSize = (index: number) => {
                          const patterns = [
                            'col-span-2 row-span-2 md:col-span-2 md:row-span-2', // Large featured
                            'col-span-1 row-span-1 md:col-span-1 md:row-span-1', // Small
                            'col-span-2 row-span-1 md:col-span-2 md:row-span-1', // Wide
                            'col-span-1 row-span-2 md:col-span-1 md:row-span-2', // Tall
                            'col-span-1 row-span-1 md:col-span-1 md:row-span-1', // Small
                            'col-span-2 row-span-1 md:col-span-2 md:row-span-1', // Wide
                          ];
                          return patterns[index % patterns.length];
                        };
                        
                        const cardSize = getCardSize(index);
                        const isLarge = cardSize.includes('span-2');
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`group relative cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 hover:z-10 ${cardSize}`}
                            onClick={() => handleViewAllClick(item.product.category)}
                            style={{ 
                              animationDelay: `${index * 100}ms`,
                              animation: 'slideUp 0.6s ease-out forwards'
                            }}
                          >
                            <div className="relative h-full bg-white rounded-2xl shadow-lg group-hover:shadow-2xl group-active:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-amber-200 min-h-[280px] sm:min-h-[320px]">
                              {/* Premium Badge */}
                              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                PREMIUM
                              </div>
                              
                              {/* Product Image Section - Premium Mobile Experience */}
                              <div className={`${isLarge ? 'h-48 sm:h-56 md:h-64' : 'h-32 sm:h-40 md:h-48'} overflow-hidden bg-gray-50 relative`}>
                                <ProductCard
                                  product={item.product}
                                  currency={selectedCurrency}
                                  showActions={false}
                                  customImageUrl={item.customImageUrl}
                                />
                              </div>
                              
                              {/* Content Section - Premium Mobile Design */}
                              <div className="p-3 sm:p-4 md:p-6">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                  {item.displayName || item.product.name}
                                </h3>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-base sm:text-lg md:text-2xl font-bold text-amber-600">
                                    {item.displayPrice || (selectedCurrency === 'INR' 
                                      ? `₹${item.product.priceInr?.toLocaleString()}` 
                                      : `BD ${Number(item.product.priceBhd)?.toFixed(3)}`)}
                                  </span>
                                  
                                  <div className="opacity-100 transition-opacity duration-300">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Premium Tags - Mobile Optimized */}
                                {isLarge && (
                                  <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap gap-1 sm:gap-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Handcrafted</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Limited Edition</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Modern CTA */}
                    <div className="text-center">
                      <button 
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={() => window.location.href = '/collections'}
                      >
                        View All Premium Collection
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <style>{`
                @keyframes slideUp {
                  from {
                    opacity: 0;
                    transform: translateY(40px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </section>
          );
        }

        // ROYAL LAYOUT: Luxury Diamond Constellation with Framer Motion
        if (section.layoutType === 'royal') {
          const containerRef = useRef(null);
          const isInView = useInView(containerRef, { once: true });
          
          return (
            <motion.section 
              ref={containerRef}
              key={section.id} 
              className="py-24 relative overflow-hidden"
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                background: 'radial-gradient(ellipse at center, #0f0c29 0%, #24243e 50%, #302b63 100%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full"
                    initial={{ 
                      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                      opacity: 0
                    }}
                    animate={{
                      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
              
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Animated Header */}
                <motion.div 
                  className="text-center mb-20"
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div 
                    className="flex items-center justify-center mb-8"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div 
                      className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '4rem' } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Diamond className="w-8 h-8 text-amber-400 mx-6" />
                    </motion.div>
                    <motion.div 
                      className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '4rem' } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                  </motion.div>
                  
                  <motion.h2 
                    className="text-5xl md:text-7xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 mb-8"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {section.description && (
                    <motion.p 
                      className="text-xl text-amber-200/80 max-w-3xl mx-auto font-light"
                      initial={{ y: 20, opacity: 0 }}
                      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      {section.description}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Modern Bento Grid Layout */}
                {section.items && section.items.length > 0 && (
                  <motion.div 
                    className="grid grid-cols-4 gap-6 auto-rows-[200px]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    {section.items.slice(0, 8).map((item, index) => {
                      // Modern Bento layout patterns
                      const layouts = [
                        'col-span-2 row-span-2', // Large square
                        'col-span-1 row-span-1', // Small
                        'col-span-1 row-span-2', // Tall
                        'col-span-2 row-span-1', // Wide
                        'col-span-1 row-span-1', // Small
                        'col-span-1 row-span-1', // Small
                        'col-span-2 row-span-1', // Wide
                        'col-span-1 row-span-1'  // Small
                      ];
                      
                      const layout = layouts[index % layouts.length];
                      const isLarge = layout.includes('col-span-2') && layout.includes('row-span-2');
                      
                      return (
                        <motion.div 
                          key={item.id} 
                          className={`group cursor-pointer ${layout}`}
                          onClick={() => handleViewAllClick(item.product.category)}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 1.4 + index * 0.1,
                            type: "spring",
                            bounce: 0.3
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            zIndex: 20,
                            boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="h-full bg-gradient-to-br from-amber-500/20 to-purple-600/30 backdrop-blur-sm border border-amber-400/30 rounded-xl overflow-hidden relative">
                            <motion.img
                              src={item.product.images?.[0] || ringsImage}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                              <h3 className={`text-white font-semibold mb-1 line-clamp-2 ${isLarge ? 'text-lg' : 'text-sm'}`}>
                                {item.product.name}
                              </h3>
                              <p className={`text-amber-300 font-bold ${isLarge ? 'text-base' : 'text-xs'}`}>
                                {selectedCurrency === 'INR' ? `₹${item.product.priceInr?.toLocaleString()}` : `BD ${Number(item.product.priceBhd)?.toFixed(3)}`}
                              </p>
                              
                              {isLarge && (
                                <motion.div 
                                  className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold"
                                  animate={{ 
                                    boxShadow: ['0 0 0 0 rgba(245, 158, 11, 0.7)', '0 0 0 8px rgba(245, 158, 11, 0)', '0 0 0 0 rgba(245, 158, 11, 0)'] 
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  ✨ FEATURED
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
                
                {/* Animated CTA */}
                <motion.div 
                  className="text-center mt-20"
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 2 }}
                >
                  <motion.button 
                    className="relative bg-gradient-to-r from-amber-500 to-purple-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl border-2 border-white/20"
                    onClick={() => window.location.href = '/collections'}
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      background: [
                        'linear-gradient(45deg, #f59e0b, #7c3aed)',
                        'linear-gradient(45deg, #7c3aed, #f59e0b)',
                        'linear-gradient(45deg, #f59e0b, #7c3aed)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="flex items-center">
                      <Diamond className="w-5 h-5 mr-2" />
                      Enter the Royal Collection
                      <Diamond className="w-5 h-5 ml-2" />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          );
        }

        // ZEN LAYOUT: Flowing Magnetic Cards with Framer Motion
        if (section.layoutType === 'zen') {
          const zenRef = useRef(null);
          const zenInView = useInView(zenRef, { once: true });
          
          return (
            <motion.section 
              ref={zenRef}
              key={section.id} 
              className="py-24 relative overflow-hidden"
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #764ba2 75%, #667eea 100%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              {/* Flowing Wave Background */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                    'linear-gradient(135deg, #764ba2 0%, #667eea 50%, #764ba2 100%)',
                    'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
                  <motion.path 
                    d="M0,200 Q250,100 500,200 T1000,200 L1000,0 L0,0 Z" 
                    fill="white"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.path 
                    d="M0,400 Q250,300 500,400 T1000,400 L1000,200 L0,200 Z" 
                    fill="white" 
                    opacity="0.7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.7 }}
                  />
                </svg>
              </motion.div>
              
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Zen Header */}
                <motion.div 
                  className="text-center mb-20"
                  initial={{ y: 50, opacity: 0 }}
                  animate={zenInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <motion.h2 
                    className="text-5xl md:text-7xl font-thin text-white mb-8 tracking-wider"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={zenInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {section.description && (
                    <motion.p 
                      className="text-xl text-white/80 max-w-3xl mx-auto font-light"
                      initial={{ y: 30, opacity: 0 }}
                      animate={zenInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      {section.description}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Magnetic Flow Layout */}
                {section.items && section.items.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap justify-center items-center gap-6 min-h-[600px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={zenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.2, delay: 1 }}
                  >
                    {section.items.slice(0, 8).map((item, index) => {
                      // Dynamic card sizes for organic flow
                      const sizes = [
                        { width: 280, height: 350, text: 'text-base' },
                        { width: 220, height: 280, text: 'text-sm' },
                        { width: 300, height: 380, text: 'text-lg' },
                        { width: 240, height: 300, text: 'text-sm' },
                        { width: 260, height: 320, text: 'text-base' },
                        { width: 200, height: 250, text: 'text-xs' },
                        { width: 320, height: 400, text: 'text-lg' },
                        { width: 230, height: 290, text: 'text-sm' }
                      ];
                      
                      const size = sizes[index % sizes.length];
                      
                      return (
                        <motion.div
                          key={item.id}
                          className="cursor-pointer group"
                          onClick={() => handleViewAllClick(item.product.category)}
                          style={{
                            width: size.width,
                            height: size.height
                          }}
                          initial={{ 
                            scale: 0,
                            opacity: 0,
                            y: 100,
                            rotateY: 90
                          }}
                          animate={zenInView ? {
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            rotateY: 0
                          } : {
                            scale: 0,
                            opacity: 0,
                            y: 100,
                            rotateY: 90
                          }}
                          transition={{ 
                            duration: 0.8,
                            delay: 1.2 + index * 0.15,
                            type: "spring",
                            bounce: 0.4
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: 5,
                            zIndex: 20,
                            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            y: [0, -8, 0],
                            rotateZ: [0, 1, -1, 0]
                          }}
                          transition={{
                            y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                            rotateZ: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <div className="h-full bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl overflow-hidden shadow-lg">
                            <div className="h-3/4 overflow-hidden">
                              <motion.img
                                src={item.product.images?.[0] || [necklacesImage, earringsImage, pendantsImage, banglesImage, braceletsImage, ringsImage, chainsImage, watchesImage][index % 8]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.2, rotate: 2 }}
                                transition={{ duration: 0.4 }}
                              />
                            </div>
                            
                            <div className="h-1/4 p-4 flex flex-col justify-center">
                              <h3 className={`text-white font-light mb-1 line-clamp-2 ${size.text}`}>
                                {item.product.name}
                              </h3>
                              <p className={`text-white/80 font-medium ${size.text}`}>
                                {selectedCurrency === 'INR' ? `₹${item.product.priceInr?.toLocaleString()}` : `BD ${Number(item.product.priceBhd)?.toFixed(3)}`}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
                
                {/* Zen CTA */}
                <motion.div 
                  className="text-center mt-20"
                  initial={{ y: 50, opacity: 0 }}
                  animate={zenInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 1, delay: 2.5 }}
                >
                  <motion.button 
                    className="relative bg-white/20 backdrop-blur-md text-white px-12 py-4 text-lg font-light border border-white/30 rounded-full"
                    onClick={() => window.location.href = '/collections'}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      borderRadius: ['50px', '25px', '50px']
                    }}
                    transition={{ 
                      borderRadius: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      default: { duration: 0.3 }
                    }}
                  >
                    <span className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Flow with the Zen Collection
                      <Sparkles className="w-5 h-5 ml-2" />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          );
        }
        
        // Regular layout rendering
        return (
          <section 
            key={section.id} 
            className="py-12" 
            data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ 
              background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
            }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                )}
              </div>
              <div className={`grid gap-4 md:gap-6 mb-10 ${getLayoutClasses(section.layoutType, section.items.length)}`}>
                {section.items.map((item) => (
                  <div key={item.id} className={getSizeClasses(item.size || 'normal')}>
                    <ProductCard
                      product={item.product}
                      currency={selectedCurrency}
                      showActions={false}
                      customImageUrl={item.customImageUrl}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  onClick={() => window.location.href = '/collections'}
                >
                  View All <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </section>
        );
      })}

      {/* Section Divider */}
      {homeSections.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* New Arrivals - Only show if no custom new-arrivals layout exists */}
      {newArrivalProducts.length > 0 && !homeSections.some(section => section.layoutType === 'new-arrivals') && (
        <section className="py-12" data-testid="section-new-arrivals" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>New Arrivals</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Latest additions to our collection</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {newArrivalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?category=new-arrivals'}
              >
                View All New Arrivals <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {newArrivalProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Gold Plated Silver Collection */}
      {goldPlatedSilverProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-plated-silver-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gold Plated Silver</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Affordable luxury with gold plated silver elegance</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {goldPlatedSilverProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=gold-plated-silver'}
              >
                View Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {goldPlatedSilverProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Material-Based Sections - Always show these regardless of custom sections */}
      
      {/* Gold Collection */}
      {goldProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gold Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Exquisite gold jewelry crafted to perfection</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {goldProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=gold'}
              >
                View Gold Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {goldProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Silver Collection */}
      {silverProducts.length > 0 && (
        <section className="py-12" data-testid="section-silver-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Silver Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Elegant silver jewelry for every occasion</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {silverProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=silver'}
              >
                View Silver Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {silverProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Diamond Collection */}
      {diamondProducts.length > 0 && (
        <section className="py-12" data-testid="section-diamond-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Diamond Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Brilliant diamonds for life's special moments</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {diamondProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=diamond'}
              >
                View Diamond Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Platinum Collection */}
      {platinumProducts.length > 0 && (
        <section className="py-12" data-testid="section-platinum-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Platinum Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Premium platinum jewelry for discerning taste</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {platinumProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=platinum'}
              >
                View Platinum Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Gemstone Collection */}
      {gemstoneProducts.length > 0 && (
        <section className="py-12" data-testid="section-gemstone-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Gemstone Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Colorful gemstones for vibrant elegance</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {gemstoneProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=gemstone'}
              >
                View Gemstone Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Pearl Collection */}
      {pearlProducts.length > 0 && (
        <section className="py-12" data-testid="section-pearl-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Pearl Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Timeless pearls for classic beauty</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {pearlProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=pearl'}
              >
                View Pearl Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}


      {/* Other Materials Collection */}
      {otherProducts.length > 0 && (
        <section className="py-12" data-testid="section-other-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Other Materials Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Unique materials for distinctive styles</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {otherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=other'}
              >
                View All Collections <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Shop by Budget Section */}
      <ShopByBudgetSection selectedCurrency={selectedCurrency} />
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}