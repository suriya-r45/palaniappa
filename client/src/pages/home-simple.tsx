import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WatchAndShop from '@/components/WatchAndShop';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Product } from '@shared/schema';
import { Currency } from '@/lib/currency';

export default function SimpleHome() {
  const [selectedCurrency] = useState<Currency>('BHD');

  // Fetch all products for display
  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Palaniappa Jewellers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our exquisite collection of fine jewelry, crafted with precision and passion
          </p>
          <button 
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 text-xl border border-emerald-500/20 backdrop-blur-sm"
            onClick={() => window.location.href = '/collections'}
          >
            Explore Collection →
          </button>
        </div>
      </section>

      {/* Products Preview */}
      {allProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {allProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {product.images.length > 0 && (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-emerald-600">
                      {selectedCurrency === 'BHD' 
                        ? `BD ${parseFloat(product.priceBhd).toFixed(3)}`
                        : `₹${parseFloat(product.priceInr).toLocaleString('en-IN')}`
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Watch and Shop Section */}
      <WatchAndShop />

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}