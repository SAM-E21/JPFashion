
export interface Product {
  id: number | string;
  name: string;
  price: number | 'consultar';
  category: string;
  image: string;
  description: string;
  miniDescription?: string;
  sizes?: string[];
  isSocial?: boolean;
  fbId?: string; // Nuevo campo para sincronización con FB
  link?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}
