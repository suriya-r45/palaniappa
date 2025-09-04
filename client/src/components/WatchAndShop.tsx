import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play, Pause, ShoppingCart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/videos?featured=true');
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    },
  });

  const currentVideo = videos[currentVideoIndex];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const handleVideoClick = async (videoId: string) => {
    // Track video view
    try {
      await fetch(`/api/videos/${videoId}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to track video view:', error);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [currentVideoIndex]);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!videos.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Watch & Shop
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our stunning jewelry pieces through immersive videos. See the craftsmanship, 
            feel the luxury, and shop directly from what you watch.
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="w-full h-[300px] md:h-[400px] object-cover"
                      poster={currentVideo?.thumbnailUrl}
                      onClick={() => handleVideoClick(currentVideo?.id)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src={currentVideo?.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Play/Pause Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        onClick={handlePlayPause}
                        size="lg"
                        className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white/30"
                        data-testid="video-play-pause"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </Button>
                    </div>

                    {/* Navigation Arrows */}
                    {videos.length > 1 && (
                      <>
                        <Button
                          onClick={handlePrev}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/30"
                          data-testid="video-prev"
                        >
                          <ChevronLeft className="w-5 h-5 text-white" />
                        </Button>
                        <Button
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/30"
                          data-testid="video-next"
                        >
                          <ChevronRight className="w-5 h-5 text-white" />
                        </Button>
                      </>
                    )}

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold mb-2" data-testid="video-title">
                        {currentVideo?.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-white/80 text-sm">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span data-testid="video-views">{currentVideo?.viewCount || 0} views</span>
                        </div>
                        {currentVideo?.duration && (
                          <span>{currentVideo.duration}s</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Description */}
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300" data-testid="video-description">
                  {currentVideo?.description}
                </p>
              </div>
            </div>

            {/* Product Information */}
            <div className="lg:col-span-1">
              {currentVideo?.product && (
                <Card className="sticky top-4">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <Badge variant="secondary" className="mb-3">Featured Product</Badge>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" data-testid="product-name">
                        {currentVideo.product.name}
                      </h4>
                    </div>

                    {/* Product Image */}
                    {currentVideo.product.images?.[0] && (
                      <div className="mb-4">
                        <img
                          src={currentVideo.product.images[0]}
                          alt={currentVideo.product.name}
                          className="w-full h-48 object-cover rounded-lg"
                          data-testid="product-image"
                        />
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="text-center space-y-1">
                        <div className="text-2xl font-bold text-amber-600" data-testid="product-price-inr">
                          ₹{parseFloat(currentVideo.product.priceInr).toLocaleString()}
                        </div>
                        <div className="text-lg text-gray-600 dark:text-gray-400" data-testid="product-price-bhd">
                          BHD {parseFloat(currentVideo.product.priceBhd).toFixed(3)}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        data-testid="button-add-to-cart"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = `/products/${currentVideo.product?.id}`}
                        data-testid="button-view-details"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Video Thumbnails */}
          {videos.length > 1 && (
            <div className="mt-8">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`flex-shrink-0 cursor-pointer transition-all ${
                      index === currentVideoIndex
                        ? 'ring-2 ring-amber-500 scale-105'
                        : 'hover:scale-105'
                    }`}
                    onClick={() => setCurrentVideoIndex(index)}
                    data-testid={`video-thumbnail-${index}`}
                  >
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}