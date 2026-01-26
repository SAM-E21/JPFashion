
import { createClient } from '@supabase/supabase-js';
import { Product, Category } from '../types';

const SUPABASE_URL = 'https://fowudbobxctpxguzpirh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvd3VkYm9ieGN0cHhndXpwaXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNTgxNTgsImV4cCI6MjA4NDkzNDE1OH0.s1MYlBCkojBaKf5iH3sGxjSpmZOKb2f8ScF4AsBgHtY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función auxiliar para normalizar las tallas desde la DB
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
    console.error("Error fetching products from Supabase:", error);
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
    link: p.link
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
    link: p.link
  }));
};

export const fetchCategoriesFromDb = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error("Error fetching categories from Supabase:", error);
    return [];
  }

  return data;
};
