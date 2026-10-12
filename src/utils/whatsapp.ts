'use client';

export const WHATSAPP_NUMBER = '94776207299';

export interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

export const generateWhatsAppLink = (productName: string, price: number): string => {
  const message = `Hello Dart Sri Lanka! 🎯\n\nI would like to order: *${productName}*\nPrice: LKR ${price.toLocaleString()}\n\nPlease let me know the island-wide delivery details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const generateOrderWhatsAppMessage = (
  items: OrderItem[],
  customer: CustomerInfo,
  total: number,
  shipping: number,
  baseUrl: string = 'https://dartsrilanka.netlify.app'
): string => {
  const itemLines = items.map((item, i) => {
    const productUrl = `${baseUrl}/product/${item.id}`;
    return `📦 *Item ${i + 1}*\nProduct: *${item.name}*\nQuantity: *${item.quantity}*\nPrice: *Rs. ${item.price}*\n🔗 Link: ${productUrl}`;
  }).join('\n\n');

  const message = [
    `📱 *ORDER REQUEST — DART SRI LANKA*`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    itemLines,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Customer Details*`,
    `Name: ${customer.firstName} ${customer.lastName}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email || 'N/A'}`,
    ``,
    `📍 *Delivery Address*`,
    `${customer.address}`,
    `${customer.city}${customer.postalCode ? `, ${customer.postalCode}` : ''}`,
    `Sri Lanka`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `🚚 Shipping: Rs. ${shipping.toLocaleString()}`,
    `💰 *TOTAL: Rs. ${(total + shipping).toLocaleString()}*`,
    ``,
    `Please confirm my order and delivery details. Thank you! 🏎️`,
  ].join('\n');

  return message;
};

export const generateOrderWhatsAppLink = (
  items: OrderItem[],
  customer: CustomerInfo,
  total: number,
  shipping: number,
  baseUrl?: string
): string => {
  const message = generateOrderWhatsAppMessage(items, customer, total, shipping, baseUrl);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const generateProductWhatsAppLink = (
  productId: string,
  productName: string,
  productPrice: string | number,
  selectedSize: string,
  quantity: number,
  customer: CustomerInfo,
  baseUrl: string = 'https://dartsrilanka.netlify.app'
): string => {
  const productUrl = `${baseUrl}/product/${productId}`;
  const price = typeof productPrice === 'number' ? productPrice.toLocaleString() : productPrice;

  const message = [
    `📱 *BOOKING REQUEST — DART SRI LANKA*`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `📦 *Product Details*`,
    `Product: *${productName}*`,
    `Selected Size / Weight: *${selectedSize}*`,
    `Quantity: *${quantity}*`,
    `Price: *Rs. ${price}*`,
    ``,
    `🔗 Product Link: ${productUrl}`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Customer Details*`,
    `Name: ${customer.firstName} ${customer.lastName}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email || 'N/A'}`,
    ``,
    `📍 *Delivery Address*`,
    `${customer.address}`,
    `${customer.city}${customer.postalCode ? `, ${customer.postalCode}` : ''}`,
    `Sri Lanka`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `Please confirm my booking and delivery details. Thank you! 🏎️`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

