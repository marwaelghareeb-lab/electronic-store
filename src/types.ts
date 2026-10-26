export interface ProductVariant {
  name: string;
  options: string[];
  priceModifiers?: Record<string, number>;
}

export interface ProductSpec {
  [key: string]: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  brand: string;
  category: 'audio' | 'computing' | 'wearables' | 'cameras' | 'gaming' | 'smart-home';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  isPrime: boolean;
  isBestSeller?: boolean;
  isAmazonChoice?: boolean;
  inStock: boolean;
  stockCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  keyFeatures: string[];
  specs: ProductSpec;
  variants?: {
    colors?: string[];
    storage?: string[];
    options?: { label: string; values: string[] }[];
  };
  reviews?: CustomerReview[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  withWarranty?: boolean;
  finalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DeliveryOption {
  id: 'standard' | 'priority' | 'express';
  name: string;
  description: string;
  estimatedDate: string;
  price: number;
}

export type PaymentMethodType = 'credit_card' | 'apple_pay' | 'paypal' | 'cash_on_delivery';

export interface PaymentDetails {
  method: PaymentMethodType;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  deliveryOption: DeliveryOption;
  paymentDetails: PaymentDetails;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  createdAt: string;
  estimatedDeliveryDate: string;
  status: 'confirmed' | 'processing' | 'shipped';
}
