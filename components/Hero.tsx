
import React from 'react';

const Hero: React.FC = () => {
  const collections = [
    { name: 'Casual', img: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/casual.jpeg' },
    { name: 'Cóctel', img: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/coctel.jpeg' },
    { name: 'Gala', img: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/gala.jpeg' },
    { name: 'Trajes de Baño', img: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/traje.jpeg' },
    { name: 'Vestidos Largos', img: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/vestidos%20largo.jpeg' }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-20">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

      {/* Main Branding Section */}
      <div className="relative z-10 text-center mb-12 animate-fade-in">
        <h1 className="text-6xl md:text-[120px] font-bold tracking-[0.1em] text-white mb-2">
          JP FASHION
        </h1>
        <div className="h-px w-full max-w-[800px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6"></div>
        <p className="text-xl md:text-3xl font-serif italic text-gold tracking-wide">
          "Elegancia que define tu estilo"
        </p>
      </div>

      {/* Runway / Orbit Gallery */}
      <div className="relative z-10 w-full max-w-7xl px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-end justify-center">
          {collections.map((item, index) => (
            <div 
              key={index} 
              className={`group flex flex-col items-center transition-all duration-700 hover:-translate-y-4 ${index === 2 ? 'md:scale-110 md:z-20' : 'md:scale-90 md:opacity-70 hover:opacity-100'}`}
            >
              <div className="relative aspect-[3/5] w-full overflow-hidden border border-white/10 bg-zinc-900 mb-4 shadow-2xl transition-all duration-500 group-hover:border-gold/50">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Action Button */}
      <div className="mt-16 z-20">
        <a 
          href="#productos"
          className="inline-block bg-gold px-12 py-4 text-black text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-gold/50"
        >
          View Lookbook
        </a>
      </div>

      {/* Decorative Copyright/Bottom info */}
      <div className="absolute bottom-6 w-full text-center">
        <p className="text-[7px] text-gray-700 uppercase tracking-[0.6em] opacity-50">
          Copyright JP Fashion. Luxury Experience. 2025
        </p>
      </div>
    </section>
  );
};

export default Hero;
