export type ProductCategory =
  | 'All'
  | 'Milk Chocolates'
  | 'Dark Chocolates'
  | 'White Chocolates'
  | 'Chocolate Truffles'
  | 'Chocolate Gift Boxes'
  | 'Festive & Rakhi Hampers'
  | 'Birthday Gifts'
  | 'Custom Chocolate Boxes';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Box of 6", "Box of 12", "100g Bar", "200g Bar"
  price: number;
  originalPrice?: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  basePrice: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isSample?: boolean;
  imageUrl: string;
  secondaryImageUrl?: string;
  variants: ProductVariant[];
  ingredients: string[];
  allergens: string[];
  storageInstructions: string;
  shelfLife: string;
  inStock: boolean;
  cocoaPercentage?: string;
  weightGrams?: number;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  customGiftNote?: string;
}

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  area: string;
  city: string; // Defaults to "Aligarh"
  pincode: string;
  deliveryDate: string;
  deliveryTimeSlot: string; // "10:00 AM – 1:00 PM", "1:00 PM – 4:00 PM", "4:00 PM – 6:00 PM"
  giftMessage?: string;
  deliveryInstructions?: string;
  paymentMethod: 'whatsapp' | 'cod' | 'upi';
}

export type OrderStatus = 'Confirmed' | 'Processing' | 'Out for Delivery' | 'Delivered';

export interface OrderStatusStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface TrackedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  date: string;
  deliveryArea: string;
  deliveryTimeSlot: string;
  status: OrderStatus;
  items: {
    name: string;
    variant: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  estimatedDelivery?: string;
  steps: OrderStatusStep[];
}

export interface ReviewItem {
  id: string;
  customerName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productName?: string;
  verifiedPurchase: boolean;
}

