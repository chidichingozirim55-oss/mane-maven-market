export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  length: string;
  color: string;
  laceType: string;
  stock: number;
  videoUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Booking {
  service: string;
  price: number;
  date: Date;
  slot: string;
  name: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  trackingNumber?: string;
}