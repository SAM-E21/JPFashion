
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product & { selectedSize?: string }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Si hay tallas disponibles, seleccionamos la primera por defecto para evitar que el usuario olvide marcarla
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.sizes]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({ ...product, selectedSize });
  };

  return (
    <div className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold/40 flex flex-col h-full shadow-2xl hover:shadow-gold/10">
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
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        
        {/* Quick View de Tallas en Hover sobre imagen */}
        <div className="absolute bottom-4 left-0 right-0 px-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <button 
            onClick={handleAddToCart}
            className="w-full bg-gold text-black py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Añadir a Bolsa
          </button>
        </div>
      </div>
      
      {/* Contenido del Card */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-serif mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
        <p className="text-[10px] text-gray-500 font-light italic mb-4 line-clamp-1">
          {product.miniDescription || product.description.substring(0, 40) + '...'}
        </p>

        {/* Selector de Tallas Visible */}
        <div className="mt-auto space-y-4">
          {product.sizes && product.sizes.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-[8px] text-gray-400 uppercase tracking-[0.3em]">Tallas Disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
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
          ) : (
            <div className="h-[42px] flex items-center">
              <p className="text-[8px] text-gray-600 uppercase tracking-widest italic">Talla única</p>
            </div>
          )}
          
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-white text-sm font-medium tracking-widest">
              {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Consultar'}
            </span>
            {selectedSize && (
              <span className="text-[9px] text-gold font-bold uppercase tracking-widest animate-fade-in">
                MUESTRA: {selectedSize}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
