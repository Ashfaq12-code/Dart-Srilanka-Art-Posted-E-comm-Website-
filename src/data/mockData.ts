export type ProductType = 'Steel Tip' | 'Soft Tip' | 'Dartboard' | 'Accessories' | 'Shaft' | 'Flight' | 'Vehicle' | 'Gamers' | 'Movie' | 'Marvel' | 'Anime' | 'Typographic';
export type DartStyle = 'Beginner' | 'Pro' | 'Tournament';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  style: DartStyle;
  price: string;
  discountPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  material?: string;
  weight?: string;
  size?: string;
  isHot?: boolean;
  isNew?: boolean;
  colors?: string[];
}

export const products: Product[] = Array.from({ length: 50 }, (_, i) => {
  const types: ProductType[] = ['Steel Tip', 'Soft Tip', 'Dartboard', 'Accessories', 'Shaft', 'Flight', 'Vehicle', 'Gamers', 'Movie', 'Marvel', 'Anime', 'Typographic'];
  const styles: DartStyle[] = ['Beginner', 'Pro', 'Tournament'];
  
  const type = types[i % types.length];
  const style = styles[i % styles.length];
  
  const priceRanges = {
    'Beginner': { min: 2500, max: 8000 },
    'Pro': { min: 10000, max: 25000 },
    'Tournament': { min: 20000, max: 50000 }
  };
  
  const price = Math.floor(((i * 7) % 100) / 100 * (priceRanges[style].max - priceRanges[style].min) + priceRanges[style].min);
  const rating = Number((((i * 3) % 10) / 10 + 4.0).toFixed(1)); // 4.0 - 5.0
  const reviewsCount = ((i * 11) % 190) + 10;
  
  return {
    id: `prod-${i + 1}`,
    name: `${style} ${type} Model X-${i + 1}`,
    type,
    style,
    price: `Rs. ${price.toLocaleString()}`,
    rating,
    reviews: reviewsCount,
    image: `https://picsum.photos/seed/${i + 1}/400/400`,
    material: type.includes('Tip') ? (style === 'Tournament' ? '95% Tungsten' : style === 'Pro' ? '80% Tungsten' : 'Brass') : undefined,
    weight: type.includes('Tip') ? `${((i * 5) % 6) + 18}g` : undefined,
    size: type === 'Dartboard' ? '18" Regulation Size' : undefined,
  };
});

// Explicitly add some known top products
products[0] = { ...products[0], name: 'Target Phil Taylor Power 9Five G10', type: 'Steel Tip', style: 'Tournament', price: 'Rs. 45,000', material: '95% Tungsten', weight: '24g' };
products[1] = { ...products[1], name: 'Winmau Blade 6 Triple Core', type: 'Dartboard', style: 'Tournament', price: 'Rs. 35,000', size: '18" Regulation' };
products[2] = { ...products[2], name: 'Red Dragon Peter Wright Snakebite', type: 'Steel Tip', style: 'Pro', price: 'Rs. 22,000', material: '90% Tungsten', weight: '22g' };
products[3] = { ...products[3], name: 'Harrows Quantum', type: 'Soft Tip', style: 'Pro', price: 'Rs. 18,000', material: '90% Tungsten', weight: '18g' };
products[4] = { ...products[4], name: 'Dart Case Premium Leather', type: 'Accessories', style: 'Tournament', price: 'Rs. 12,000' };
products[5] = { ...products[5], name: 'Target Pro Grip Shafts (Set of 3)', type: 'Shaft', style: 'Pro', price: 'Rs. 1,500' };
products[6] = { ...products[6], name: 'Winmau Rhino Flights', type: 'Flight', style: 'Beginner', price: 'Rs. 800' };

// Design Categories - Phase 7
products[7] = { ...products[7], name: 'Bugatti Chiron Edition Dart Set', type: 'Vehicle', style: 'Tournament', price: 'Rs. 55,000', isHot: true, image: 'https://images.unsplash.com/photo-1598424911467-fbd59d19a4e6?auto=format&fit=crop&q=80' };
products[8] = { ...products[8], name: 'Cyberpunk Night City Board', type: 'Gamers', style: 'Pro', price: 'Rs. 28,000', isNew: true };
products[9] = { ...products[9], name: 'Interstellar Odyssey Flights', type: 'Movie', style: 'Tournament', price: 'Rs. 2,500' };
products[10] = { ...products[10], name: 'Iron Man Mark 85 Shafts', type: 'Marvel', style: 'Pro', price: 'Rs. 4,500', colors: ['#B91C1C', '#FFD700'] };
products[11] = { ...products[11], name: 'Akira Neo-Tokyo Edition', type: 'Anime', style: 'Tournament', price: 'Rs. 42,000', isHot: true };
products[12] = { ...products[12], name: 'Modern Helvetica Typo Set', type: 'Typographic', style: 'Pro', price: 'Rs. 15,000' };

export const googleReviews = Array.from({ length: 100 }, (_, i) => ({
  id: `rev-${i}`,
  name: `User_${((i * 17) % 900) + 100}`,
  date: `${((i * 13) % 28) + 1}/${((i * 3) % 12) + 1}/2023`,
  rating: 5,
  text: [
    "Amazing quality, fast delivery to Kandy! Highly recommended.",
    "Best place to buy darts in Sri Lanka. Got my Winmau Blade 6 in 2 days.",
    "Customer service was excellent on WhatsApp. Helped me choose the right beginner set.",
    "Superb packaging and genuine products. Verified 100%.",
    "Been playing tournaments with the darts I bought here. Great balance and grip.",
    "Island wide delivery is really fast. Bought a soft tip board for my room.",
  ][i % 6],
}));
