
import React from 'react';
import { Product } from '../types';

interface SocialProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const SocialProductCard: React.FC<SocialProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-[#0a0a0a] border border-gold/10 overflow-hidden flex flex-col h-full hover:border-gold/30 transition-all duration-500">
      <div className="absolute top-3 left-3 z-20">
        <div className="bg-black/80 backdrop-blur-sm border border-gold/20 px-2 py-1 flex items-center gap-2">
          <span className="text-[7px] font-bold text-white uppercase tracking-widest">Edición Especial</span>
        </div>
      </div>

      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-serif mb-2 text-white line-clamp-1">{product.name}</h3>
        {product.miniDescription && (
          <p className="text-[10px] text-gold/70 italic mb-2">{product.miniDescription}</p>
        )}
        <p className="text-[9px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-gold font-bold text-xs">
              {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Consultar'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => product.price !== 'consultar' && onAddToCart(product)}
              className="bg-gold text-black py-2 text-[9px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Añadir
            </button>
            <a 
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white py-2 text-[9px] font-bold uppercase tracking-wider text-center hover:bg-white/10 transition-colors"
            >
              Detalles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProductCard;
