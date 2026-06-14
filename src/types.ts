export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Apparel' | 'Tech' | 'Home' | 'Beauty';
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  preferredCategories: string[];
}
