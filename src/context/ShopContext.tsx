'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  type: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  material?: string;
  weight?: string;
  style?: string;
}

interface Order {
    id: string;
    customer: string;
    email: string;
    date: string;
    total: string;
    status: 'Pending' | 'Shipped' | 'Delivered';
    items: any[];
}

interface ShopContextType {
  products: Product[];
  orders: Order[];
  cartItems: any[];
  wishlist: any[];
  isCartOpen: boolean;
  isLoggedIn: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: any, silent?: boolean) => void;
  removeFromCart: (cartId: number) => void;
  updateCartQty: (cartId: number, qty: number) => void;
  toggleWishlist: (product: any) => void;
  
  // Existing features
  isQuickViewOpen: boolean;
  quickViewProduct: any | null;
  openQuickView: (product: any) => void;
  closeQuickView: () => void;
  isCompareOpen: boolean;
  compareProduct: any | null;
  openCompare: (product: any) => void;
  closeCompare: () => void;

  // New Booking Features
  isBookingOpen: boolean;
  bookingProduct: any | null;
  openBooking: (product: any) => void;
  closeBooking: () => void;
  checkoutSuccess: boolean;
  setCheckoutSuccess: (success: boolean) => void;
  
  // Dashboard Actions
  addProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  login: () => void;
  logout: () => void;
  clearCart: () => void;

  notification: { message: string, type: 'success' | 'info' } | null;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProduct, setBookingProduct] = useState<any | null>(null);
  
  // QuickView State
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  
  // Compare State
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareProduct, setCompareProduct] = useState<any | null>(null);

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2000);
  };

  // Load persisted state from localStorage (cart, wishlist, auth ONLY)
  // Products always come from the source file — never from stale localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('dsl_orders');
    const savedCart   = localStorage.getItem('dsl_cart');
    const savedWishlist = localStorage.getItem('dsl_wishlist');
    const savedAuth   = localStorage.getItem('dsl_auth');

    if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
    } else {
        const mockOrders: Order[] = [
            { id: 'ORD-1001', customer: 'Arjun Perera',  email: 'arjun@example.com',  date: '2026-04-01', total: 'Rs. 24,500', status: 'Delivered', items: [] },
            { id: 'ORD-1002', customer: 'Ishani Silva',   email: 'ishani@example.com', date: '2026-04-03', total: 'Rs. 12,800', status: 'Shipped',   items: [] },
            { id: 'ORD-1003', customer: 'Kasun Jay',      email: 'kasun@example.com',  date: '2026-04-04', total: 'Rs. 85,000', status: 'Pending',   items: [] },
        ];
        setOrders(mockOrders);
    }
    if (savedCart)     setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedAuth === 'true') setIsLoggedIn(true);
  }, []);

  // Save cart, wishlist, auth, orders to localStorage (NOT products — they come from source file)
  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('dsl_products'); // Clear any stale cached products
        localStorage.setItem('dsl_orders',   JSON.stringify(orders));
        localStorage.setItem('dsl_cart',     JSON.stringify(cartItems));
        localStorage.setItem('dsl_wishlist', JSON.stringify(wishlist));
        localStorage.setItem('dsl_auth',     isLoggedIn.toString());
    }
  }, [orders, cartItems, wishlist, isLoggedIn]);

  const addToCart = (product: any, silent: boolean = false) => {
    setCartItems(prev => [...prev, { quantity: 1, ...product, cartId: Date.now() }]);
    if (!silent) {
        setIsCartOpen(true);
        showNotification(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = (cartId: number) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateCartQty = (cartId: number, qty: number) => {
    setCartItems(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity: qty } : item));
  };

  const toggleWishlist = (product: any) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
          showNotification(`${product.name} removed from wishlist`, 'info');
          return prev.filter(item => item.id !== product.id);
      }
      showNotification(`${product.name} added to wishlist!`);
      return [...prev, product];
    });
  };

  const openQuickView = (product: any) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openCompare = (product: any) => {
    setCompareProduct(product);
    setIsCompareOpen(true);
    showNotification(`${product.name} added to compare!`, 'info');
    setTimeout(() => setIsCompareOpen(false), 3000);
  };
  const closeCompare = () => setIsCompareOpen(false);

  const openBooking = (product: any) => {
    setBookingProduct(product);
    setIsBookingOpen(true);
  };
  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingProduct(null);
  };

  // Dashboard Actions
  const addProduct = (p: Product) => setProducts(prev => [p, ...prev]);
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('dsl_auth');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('dsl_cart');
  };

  return (
    <ShopContext.Provider value={{ 
      products, orders, cartItems, wishlist, isCartOpen, isLoggedIn,
      setIsCartOpen, addToCart, removeFromCart, updateCartQty, toggleWishlist,
      isQuickViewOpen: !!quickViewProduct, quickViewProduct, openQuickView, closeQuickView,
      isCompareOpen, compareProduct, openCompare, closeCompare,
      isBookingOpen, bookingProduct, openBooking, closeBooking,
      checkoutSuccess, setCheckoutSuccess,
      addProduct, deleteProduct, updateOrderStatus, login, logout, clearCart,
      notification
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
