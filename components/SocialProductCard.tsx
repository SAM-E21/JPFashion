import React from 'react';
import { Product } from '../types';

interface SocialProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const SocialProductCard: React.FC<SocialProductCardProps> = ({ product, onAddToCart }) => {
  // Detección mejorada: palabra exacta "agotado" ignorando mayúsculas
  const isAgotado = product.outOfStock || /\bagotado\b/i.test(product.name);

  return (
    <div className={`group relative bg-[#0a0a0a] border overflow-hidden flex flex-col h-full transition-all duration-500 ${
      isAgotado ? 'border-white/5 opacity-50 grayscale-[0.7]' : 'border-gold/10 hover:border-gold/30'
    }`}>
      <div className="absolute top-3 left-3 z-20">
        <div className="bg-black/80 backdrop-blur-sm border border-gold/20 px-2 py-1 flex items-center gap-2">
          <span className="text-[7px] font-bold text-white uppercase tracking-widest">
            {isAgotado ? 'Colección Pasada' : 'Edición Especial'}
          </span>
        </div>
      </div>

      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${!isAgotado && 'group-hover:scale-105'}`}
        />
        {isAgotado && (
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-gold font-serif italic text-lg border-y border-gold/20 py-2 px-6 uppercase tracking-[0.3em] backdrop-blur-[2px]">Agotado</span>
           </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className={`text-sm font-serif mb-2 line-clamp-1 ${isAgotado ? 'text-zinc-600' : 'text-white'}`}>{product.name}</h3>
        {product.miniDescription && (
          <p className="text-[10px] text-gold/50 italic mb-2">{product.miniDescription}</p>
        )}
        <p className="text-[9px] text-zinc-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <p className={`font-bold text-xs ${isAgotado ? 'text-zinc-800' : 'text-gold'}`}>
              {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Consultar'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              disabled={isAgotado}
              onClick={() => !isAgotado && product.price !== 'consultar' && onAddToCart(product)}
              className={`py-2 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                isAgotado ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-white/5' : 'bg-gold text-black hover:bg-white'
              }`}
            >
              {isAgotado ? 'Sin Stock' : 'Añadir'}
            </button>
            <a 
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 text-white/50 py-2 text-[9px] font-bold uppercase tracking-wider text-center hover:bg-white/10 hover:text-white transition-colors"
            >
              Ver Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default SocialProductCard;