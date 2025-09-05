import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Currency } from '@/lib/currency';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  productId?: string;
  duration?: number;
  viewCount: number;
  isFeatured: boolean;
  product?: {
    id: string;
    name: string;
    priceInr: string;
    priceBhd: string;
    images: string[];
  };
}

export default function WatchAndShop() {
  const [currentCurrency] = useState<Currency>('INR');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
    queryFn: async () => {
      const response = await fetch('/api/videos');
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds to pick up new videos
    staleTime: 0, // Data is immediately stale, always refetch when component mounts
  });

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatPrice = (priceInr: string, priceBhd: string): string => {
    if (currentCurrency === 'BHD') {
      return `BD ${parseFloat(priceBhd).toFixed(3)}`;
    }
    return `₹${parseFloat(priceInr).toLocaleString('en-IN')}`;
  };

  // Desktop: Show first 7 videos in grid, rest are scrollable
  // Mobile: Show first 2 videos in grid, rest are scrollable
  const gridVideos = videos.slice(0, isMobile ? 2 : 7);
  const scrollableVideos = videos.slice(isMobile ? 2 : 7);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 300);
      setScrollPosition(newPosition);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 300);
      setScrollPosition(newPosition);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleVideoClick = async (video: Video) => {
    console.log('Video clicked:', video.title);
    try {
      await fetch(`/api/videos/${video.id}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to track video view:', error);
    }
    setPlayingVideo(video);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  // Handle escape key to close video
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && playingVideo) {
        closeVideo();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [playingVideo]);

  if (isLoading) {
    return (
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto mb-4"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 mb-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!videos.length) {
    return null;
  }

  return (
    <>
      <section className="py-8 bg-white dark:bg-gray-900" data-testid="watch-and-shop-section">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              WATCH AND SHOP
            </h2>
          </div>

          {/* Main Video Grid */}
          <div className="mb-6">
            {/* Desktop Grid (1x7) */}
            <div className="hidden md:grid grid-cols-7 gap-2 mb-4">
              {gridVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  formatViewCount={formatViewCount}
                  formatPrice={formatPrice}
                  handleVideoClick={handleVideoClick}
                />
              ))}
            </div>

            {/* Mobile Grid (1x2) */}
            <div className="grid md:hidden grid-cols-2 gap-2 mb-4">
              {gridVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  formatViewCount={formatViewCount}
                  formatPrice={formatPrice}
                  handleVideoClick={handleVideoClick}
                />
              ))}
            </div>
          </div>

          {/* Scrollable Videos Section */}
          {scrollableVideos.length > 0 && (
            <div className="relative mb-6">
              {/* Left Scroll Arrow */}
              <Button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-600 -ml-4"
                data-testid="scroll-left-button"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </Button>

              {/* Right Scroll Arrow */}
              <Button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-600 -mr-4"
                data-testid="scroll-right-button"
              >
                <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </Button>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-2 md:gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {scrollableVideos.map((video, index) => (
                  <div key={video.id} className="flex-shrink-0 w-24 md:w-32">
                    <VideoCard
                      video={video}
                      index={index + gridVideos.length}
                      formatViewCount={formatViewCount}
                      formatPrice={formatPrice}
                      handleVideoClick={handleVideoClick}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View All Videos Button */}
          <div className="text-center mb-6">
            <Button 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold"
              data-testid="view-all-videos-button"
              onClick={() => window.location.href = '/videos'}
            >
              View All Videos
            </Button>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="flex justify-center">
            <div className="flex items-center gap-4 md:gap-8 bg-gray-100 dark:bg-gray-800 rounded-full px-4 md:px-6 py-2 md:py-3">
              <button className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" data-testid="nav-best-sellers">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-current rounded opacity-60"></div>
                <span className="text-xs">Best Sellers</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" data-testid="nav-whats-new">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-current rounded opacity-60"></div>
                <span className="text-xs">What's New</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" data-testid="nav-rewards">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-current rounded opacity-60"></div>
                <span className="text-xs">Rewards</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" data-testid="nav-support">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-current rounded opacity-60"></div>
                <span className="text-xs">Support</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {playingVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" 
          data-testid="video-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeVideo();
            }
          }}
        >
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <Button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white border-none"
              data-testid="close-video-button"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Video Player */}
            <div className="relative">
              <video
                className="w-full aspect-video bg-black"
                controls
                autoPlay
                playsInline
                data-testid="video-player"
                onError={(e) => {
                  console.error('Video error:', e);
                  console.error('Video URL:', playingVideo.videoUrl);
                }}
                onLoadStart={() => {
                  console.log('Video loading started for:', playingVideo.videoUrl);
                }}
                onCanPlay={() => {
                  console.log('Video can play:', playingVideo.videoUrl);
                }}
              >
                <source src={playingVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="p-6 text-white bg-black">
              <h3 className="text-xl font-bold mb-2">{playingVideo.title}</h3>
              <p className="text-gray-300 mb-4">{playingVideo.description}</p>
              
              {playingVideo.product && (
                <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                  <div>
                    <h4 className="font-semibold">{playingVideo.product.name}</h4>
                    <p className="text-yellow-400 text-lg font-bold">
                      {formatPrice(playingVideo.product.priceInr, playingVideo.product.priceBhd)}
                    </p>
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    Add to Cart
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Video Card Component
interface VideoCardProps {
  video: Video;
  index: number;
  formatViewCount: (count: number) => string;
  formatPrice: (priceInr: string, priceBhd: string) => string;
  handleVideoClick: (video: Video) => void;
  compact?: boolean;
}

function VideoCard({ video, index, formatViewCount, formatPrice, handleVideoClick, compact = false }: VideoCardProps) {
  return (
    <div
      className={`${compact ? 'aspect-[9/16]' : 'aspect-[9/16]'} group cursor-pointer`}
      data-testid={`video-card-${index}`}
      onClick={() => {
        console.log('Card clicked for video:', video.title);
        handleVideoClick(video);
      }}
    >
      <Card className="h-full overflow-hidden bg-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0 relative h-full">
          {/* Video Thumbnail */}
          <div className="relative h-full overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* View Count Badge */}
            <Badge className={`absolute top-1 left-1 bg-black/70 text-white border-none px-1 py-0.5 ${compact ? 'text-xs' : 'text-xs'}`}>
              <Eye className={`${compact ? 'w-2 h-2' : 'w-2 h-2'} mr-0.5`} />
              {formatViewCount(video.viewCount)}
            </Badge>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className={`${compact ? 'w-6 h-6' : 'w-8 h-8 md:w-10 md:h-10'} bg-white/90 rounded-full flex items-center justify-center`}>
                <Play className={`${compact ? 'w-3 h-3' : 'w-4 h-4 md:w-5 md:h-5'} text-black ml-0.5`} />
              </div>
            </div>

            {/* Video Duration Badge */}
            {video.duration && (
              <Badge className={`absolute bottom-1 right-1 bg-black/70 text-white border-none px-1 py-0.5 ${compact ? 'text-xs' : 'text-xs'}`}>
                {video.duration}s
              </Badge>
            )}

            {/* Product Info */}
            {video.product && !compact && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                <h3 className="text-white text-xs font-medium mb-0.5 truncate">
                  {video.product.name}
                </h3>
                <p className="text-yellow-400 text-xs font-bold">
                  {formatPrice(video.product.priceInr, video.product.priceBhd)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}