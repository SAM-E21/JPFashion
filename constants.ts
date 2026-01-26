
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'vestidos', name: 'Vestidos de Noche', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800' },
  { id: 'accesorios', name: 'Accesorios Luxury', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800' },
  { id: 'casual', name: 'Casual Chic', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vestido Gala 'Midnight Gold'",
    price: 249.99,
    category: "vestidos",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600",
    description: "Elegante vestido largo con detalles en hilo dorado genuino."
  },
  {
    id: 2,
    name: "Bolso de Mano 'Royal Black'",
    price: 189.00,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
    description: "Cuero premium con herrajes bañados en oro."
  },
  {
    id: 3,
    name: "Blusa Seda Blanca 'Pure Elegance'",
    price: 85.50,
    category: "casual",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600",
    description: "Seda 100% natural con caída perfecta para el día a día sofisticado."
  },
  {
    id: 4,
    name: "Collar de Perlas & Oro",
    price: 120.00,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    description: "Perlas cultivadas con cierre de oro de 18k."
  },
  {
    id: 5,
    name: "Vestido Coctel 'Noir'",
    price: 155.00,
    category: "vestidos",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600",
    description: "Corte asimétrico para una silueta moderna y audaz."
  },
  {
    id: 6,
    name: "Pantalón Sastre 'High Society'",
    price: 110.00,
    category: "casual",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    description: "Ajuste perfecto en color negro profundo."
  }
];
