
import { createClient } from '@supabase/supabase-js';
import { Product, Category } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Supabase configuration is missing. Please check your .env.local file.");
} else {
  console.log("Supabase initialized with URL:", SUPABASE_URL);
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

const normalizeSizes = (sizes: any): string[] => {
  if (Array.isArray(sizes)) return sizes;
  if (typeof sizes === 'string') return sizes.split(',').map(s => s.trim()).filter(Boolean);
  return [];
};

export const fetchProductsFromDb = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("DEBUG - Error al buscar productos:", error.code, error.message);
    if (error.code === '42P01') console.error("LA TABLA 'products' NO EXISTE EN ESTE PROYECTO.");
    if (error.code === '42501') console.error("ERROR DE PERMISOS: Revisa las políticas RLS en Supabase.");
    return [];
  }

  return data.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    image: p.image,
    description: p.description,
    miniDescription: p.mini_description,
    sizes: normalizeSizes(p.sizes),
    fbId: p.fb_id,
    isSocial: p.is_social,
    link: p.link,
    outOfStock: p.is_out_of_stock // Asegúrate de tener esta columna en tu DB o cámbiala por la lógica que prefieras
  }));
};

export const fetchSocialProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_social', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching social products from Supabase:", error);
    return [];
  }

  return data.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    image: p.image,
    description: p.description,
    miniDescription: p.mini_description,
    sizes: normalizeSizes(p.sizes),
    fbId: p.fb_id,
    isSocial: p.is_social,
    link: p.link,
    outOfStock: p.is_out_of_stock
  }));
};

export const fetchCategoriesFromDb = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error("DEBUG - Error al buscar categorías:", error.code, error.message);
    return [];
  }

  return data;
};

export const seedDatabase = async () => {
  const initialCategories: Category[] = [
    { id: 'vestidos', name: 'Vestidos', image: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/foto1.jpeg' },
    { id: 'conjuntos', name: 'Conjuntos', image: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/foto2.jpeg' },
    { id: 'accesorios', name: 'Accesorios', image: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/foto2.jpeg' }
  ];

  const initialProducts = [
    {
      name: 'Vestido Gala Negro',
      price: 85.00,
      category: 'vestidos',
      image: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/foto1.jpeg',
      description: 'Elegante vestido de gala con acabados en seda y corte sirena.',
      mini_description: 'Elegancia pura para noches inolvidables.',
      sizes: ['S', 'M', 'L'],
      is_social: false,
      is_featured: true
    },
    {
      name: 'Conjunto Ejecutivo Gold',
      price: 120.00,
      category: 'conjuntos',
      image: 'https://fowudbobxctpxguzpirh.supabase.co/storage/v1/object/public/imagenes/foto2.jpeg',
      description: 'Conjunto de dos piezas con detalles en hilo de oro.',
      mini_description: 'Poder y sofisticación en cada detalle.',
      sizes: ['M', 'L'],
      is_social: true,
      is_featured: true
    }
  ];

  console.log("Iniciando carga de datos iniciales...");
  
  // Insertar categorías
  const { error: catError } = await supabase.from('categories').upsert(initialCategories);
  if (catError) console.error("Error al sembrar categorías:", catError);

  // Insertar productos
  const { error: prodError } = await supabase.from('products').upsert(initialProducts);
  if (prodError) console.error("Error al sembrar productos:", prodError);

  return !catError && !prodError;
};
