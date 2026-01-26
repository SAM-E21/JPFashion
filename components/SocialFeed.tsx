
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchSocialProducts } from '../services/supabaseService';
import SocialProductCard from './SocialProductCard';

const SocialFeed: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSocialData = async () => {
      try {
        setLoading(true);
        const data = await fetchSocialProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fallo al cargar productos sociales desde Supabase.");
      } finally {
        setLoading(false);
      }
    };
    loadSocialData();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/40 rounded-full mb-4">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              <span className="text-[9px] font-bold text-gold uppercase tracking-[0.3em]">Direct from Social Media</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif">JP <span className="text-gold italic">Social</span> Shop</h2>
            <p className="text-gray-500 text-xs mt-4 uppercase tracking-[0.2em]">Prendas exclusivas publicadas en nuestras redes</p>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-gold/30"></div>
          <div className="text-right">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-loose">
              Estado: <span className="text-green-500">Sincronizado</span><br />
              Origen: Catálogo Supabase<br />
              Sincronización: Instantánea
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
            <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Cargando Novedades...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <SocialProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialFeed;
