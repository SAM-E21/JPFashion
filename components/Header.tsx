
import React from 'react';

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onOpenCart, cartCount }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex space-x-6 text-xs uppercase tracking-widest font-semibold">
            <a href="#" className="hover:text-gold transition-colors">Colecciones</a>
            <a href="#productos" className="hover:text-gold transition-colors">Tienda</a>
          </nav>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-serif tracking-tighter text-white">
            JP <span className="text-gold">FASHION</span>
          </h1>
          <p className="text-[8px] uppercase tracking-[0.3em] text-gold/80 -mt-1 font-medium">Elegancia que define tu estilo</p>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:text-gold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
