
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
  fbId?: string;
  link?: string;
  outOfStock?: boolean; // Nueva propiedad para productos agotados
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