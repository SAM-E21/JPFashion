
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product & { selectedSize?: string }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  
  // Detección mejorada: Verifica propiedad outOfStock O si el nombre incluye "agotado" (ignorando mayúsculas/minúsculas)
  const isAgotado = product.outOfStock || product.name.toLowerCase().includes('agotado');

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0 && !isAgotado) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.sizes, isAgotado]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAgotado) return;
    onAddToCart({ ...product, selectedSize });
  };

  return (
    <div className={`group relative bg-[#0a0a0a] border overflow-hidden transition-all duration-500 flex flex-col h-full shadow-2xl ${
      isAgotado ? 'border-white/5 grayscale-[0.8] opacity-70' : 'border-white/5 hover:border-gold/40 hover:shadow-gold/10'
    }`}>
      
      {/* Badge de Categoría */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[7px] font-bold text-gold uppercase tracking-[0.4em]">
          {product.category}
        </span>
      </div>

      {/* Imagen con Efecto */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ${
            isAgotado ? 'scale-100 opacity-40' : 'group-hover:scale-110'
          }`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        
        {/* Sello de AGOTADO Estilizado */}
        {isAgotado && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="border border-gold/40 bg-black/60 backdrop-blur-sm px-6 py-3 rotate-[-5deg]">
              <p className="text-gold font-serif italic text-xl tracking-widest uppercase">Agotado</p>
              <div className="h-[1px] w-full bg-gold/30 mt-1"></div>
              <p className="text-[7px] text-white uppercase tracking-[0.4em] mt-1 text-center">Edición Limitada</p>
            </div>
          </div>
        )}

        {/* Quick View / Botón Añadir */}
        {!isAgotado && (
          <div className="absolute bottom-4 left-0 right-0 px-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <button 
              onClick={handleAddToCart}
              className="w-full bg-gold text-black py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Añadir a Bolsa
            </button>
          </div>
        )}
      </div>
      
      {/* Contenido del Card */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`text-lg font-serif mb-1 transition-colors ${isAgotado ? 'text-gray-400' : 'group-hover:text-gold'}`}>
          {product.name}
        </h3>
        <p className={`text-[10px] font-light italic mb-4 line-clamp-1 ${isAgotado ? 'text-gray-600' : 'text-gray-500'}`}>
          {product.miniDescription || product.description.substring(0, 40) + '...'}
        </p>

        {/* Selector de Tallas */}
        <div className="mt-auto space-y-4">
          {!isAgotado && product.sizes && product.sizes.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-[8px] text-gray-400 uppercase tracking-[0.3em]">Tallas Disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    disabled={isAgotado}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[32px] h-8 text-[9px] border flex items-center justify-center transition-all duration-300 rounded-sm ${
                      selectedSize === size 
                        ? 'bg-gold border-gold text-black font-bold' 
                        : 'border-white/10 text-white hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : !isAgotado ? (
            <div className="h-[42px] flex items-center">
              <p className="text-[8px] text-gray-600 uppercase tracking-widest italic">Talla única</p>
            </div>
          ) : (
             <div className="h-[42px] flex items-center">
              <p className="text-[8px] text-red-900/50 uppercase tracking-[0.3em] font-bold">Sin stock disponible</p>
            </div>
          )}
          
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className={`text-sm font-medium tracking-widest ${isAgotado ? 'text-gray-600 line-through' : 'text-white'}`}>
              {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Consultar'}
            </span>
            {isAgotado && (
              <span className="text-[8px] text-gold/50 uppercase tracking-widest">Próximamente</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
