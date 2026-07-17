export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  category_id: number | null;
  price: string;
  stock: number;
  description: string | null;
  icon: string | null;
  images: string[];
  specifications: Record<string, string>;
  featured: boolean;
  installation_available: boolean;
};

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type Order = {
  id: number;
  order_number: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  payment_status: "unpaid" | "paid" | "failed";
  subtotal: string;
  delivery_fee: string;
  total: string;
  delivery_address: string | null;
  created_at: string;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_icon: string | null;
  published: boolean;
  created_at: string;
};
