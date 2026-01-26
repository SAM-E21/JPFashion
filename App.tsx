
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import StylistAssistant from './components/StylistAssistant';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem, Category } from './types';
import { fetchProductsFromDb, fetchCategoriesFromDb } from './services/supabaseService';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [dbProducts, dbCategories] = await Promise.all([
          fetchProductsFromDb(),
          fetchCategoriesFromDb()
        ]);
        setProducts(dbProducts);
        setCategories(dbCategories);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const addToCart = (product: Product & { selectedSize?: string }) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && item.selectedSize === product.selectedSize
      );
      
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === product.selectedSize)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 } as CartItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number | string, selectedSize?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.selectedSize === selectedSize)
    ));
  };

  const filteredProducts = activeCategory 
    ? products.filter(p => p.category === activeCategory)
    : products;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
      
      <main>
        <Hero />

        {/* Categories Section */}
        <section className="py-20 px-4 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Colecciones <span className="text-gold italic">Curadas</span></h2>
            <div className="h-px w-20 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={`group relative h-96 overflow-hidden cursor-pointer border ${
                  activeCategory === cat.id ? 'border-gold' : 'border-transparent'
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-8">
                  <h3 className="text-2xl font-serif text-white mb-2">{cat.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold border-b border-gold pb-1 opacity-0 group-hover:opacity-100 transition-opacity">Explorar</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Product Catalog */}
        <section id="productos" className="py-20 px-4 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
              <div>
                <h2 className="text-4xl font-serif">Catálogo <span className="text-gold">Boutique</span></h2>
                <p className="text-gray-500 uppercase tracking-widest text-xs mt-2">Inventario Sincronizado</p>
              </div>
              <div className="mt-6 md:mt-0 flex gap-4 overflow-x-auto pb-4 md:pb-0">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap ${!activeCategory ? 'text-gold' : 'text-gray-500 hover:text-white'}`}
                >
                  Ver Todo
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap ${activeCategory === cat.id ? 'text-gold' : 'text-gray-500 hover:text-white'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[1,2,3].map(i => <div key={i} className="h-96 bg-white/5 animate-pulse rounded-sm"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 bg-black border-y border-gold/10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
               <img 
                 src="https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/foto2.jpeg" 
                 alt="JP Fashion Luxury Piece" 
                 className="relative z-10 w-full rounded-sm shadow-2xl border border-white/10 transition-transform duration-700 hover:scale-[1.02]"
               />
               <div className="absolute -bottom-6 -right-6 bg-gold text-black p-4 font-serif italic text-xl z-20 shadow-xl">
                 Colección Gala
               </div>
            </div>
            <div className="md:w-1/2">
              <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">Concepto Exclusivo</span>
              <h2 className="text-5xl font-serif my-6 leading-tight">Negro Profundo, <br /><span className="text-gold">Esencia JP</span></h2>
              <p className="text-gray-400 font-light leading-relaxed mb-4">
                Nuestra selección no sigue tendencias, las crea. En JP Fashion, cada material es elegido por su calidad táctil y su capacidad de reflejar la sofisticación máxima de la mujer moderna.
              </p>
              <p className="text-gold font-serif italic text-xl mb-8">
                "Elegancia que define tu estilo"
              </p>
              <div className="grid grid-cols-2 gap-8 border-l border-gold/30 pl-6">
                <div>
                  <p className="text-2xl font-serif text-white">100%</p>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500">Exclusividad</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-white">Manual</p>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500">Curaduría</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-serif text-gold mb-6 tracking-widest">JP FASHION</h2>
            <p className="text-gray-500 text-xs leading-loose tracking-widest max-w-sm mx-auto md:mx-0">
              La boutique de lujo definitiva para la mujer que busca destacar con sobriedad y elegancia.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Enlaces</h4>
            <ul className="text-[10px] uppercase tracking-widest text-gray-400 space-y-4">
              <li><a href="#" className="hover:text-gold transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Envíos</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Social</h4>
            <ul className="text-[10px] uppercase tracking-widest text-gray-400 space-y-4">
              <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-[9px] text-gray-700 uppercase tracking-[0.5em] border-t border-white/5 pt-10">
          © 2025 JP FASHION LUXURY BOUTIQUE. ALL RIGHTS RESERVED.
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />

      <StylistAssistant />
    </div>
  );
};

export default App;
