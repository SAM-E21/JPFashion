
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number | string, size?: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return sum + (price * item.quantity);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-500" onClick={onClose}></div>
      <div className="absolute top-0 right-0 h-full w-full sm:w-[450px] bg-black border-l border-gold/20 shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col animate-slide-left">
        
        {/* Header */}
        <div className="p-10 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-serif tracking-tight">Tu Bolsa</h2>
            <p className="text-[8px] text-gold uppercase tracking-[0.5em] mt-2 font-bold italic">Curated Luxury Experience</p>
          </div>
          <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform duration-500 text-gray-500 hover:text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 custom-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center">
              <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mb-8 bg-white/5">
                <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] mb-8 font-light">Su selección está vacía</p>
              <button onClick={onClose} className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold border-b border-gold/40 pb-2 hover:text-white hover:border-white transition-all duration-300">Descubrir Colecciones</button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-8 group animate-fade-in">
                <div className="w-28 h-36 flex-shrink-0 overflow-hidden border border-white/5 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 text-[7px] text-gold font-bold uppercase tracking-widest border border-gold/20">
                    Q: {item.quantity}
                  </div>
                </div>
                <div className="flex-1 flex flex-col py-1 justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-serif tracking-wide text-white group-hover:text-gold transition-colors">{item.name}</h3>
                      <button 
                        onClick={() => onRemove(item.id, item.selectedSize)}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1"
                        title="Eliminar de la bolsa"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p className="text-gold text-sm font-bold tracking-wider">
                        {typeof item.price === 'number' ? `$${(item.price * item.quantity).toFixed(2)}` : 'Bajo consulta'}
                      </p>
                      {item.selectedSize && (
                        <div className="inline-flex items-center gap-2">
                          <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em]">Talla:</span>
                          <span className="text-[10px] font-bold text-white border border-white/10 px-2 rounded-sm">{item.selectedSize}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        <div className="p-10 bg-[#080808] border-t border-white/5">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="uppercase text-[9px] tracking-[0.4em] text-gray-500 mb-2">Total Estimado</p>
              <p className="text-[8px] text-gray-600 uppercase tracking-widest">Impuestos y envíos calculados al finalizar</p>
            </div>
            <span className="text-3xl font-serif text-gold">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className="w-full py-6 bg-gold text-black font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-white transition-all duration-700 disabled:bg-gray-900 disabled:text-gray-700 disabled:cursor-not-allowed shadow-2xl active:scale-[0.98]"
          >
            Confirmar Pedido
          </button>
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-700 opacity-50">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <p className="text-[8px] uppercase tracking-[0.4em] font-medium">Pago Seguro Encriptado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
