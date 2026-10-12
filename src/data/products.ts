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

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}


export const products: Product[] = [
  // Vehicle Designs (32 Products)
  { id: 'v-1', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 45, image: 'https://i.ibb.co/wFRZmLDV/unnamed-2.jpg', isHot: true },
  { id: 'v-2', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 38, image: 'https://i.ibb.co/kgRSgHKf/unnamed-3.jpg', isHot: true },
  { id: 'v-3', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 29, image: 'https://i.ibb.co/S4sRFxjq/unnamed-25.jpg', isHot: true },
  { id: 'v-4', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 52, image: 'https://i.ibb.co/twXPfNwZ/unnamed-56.jpg' },
  { id: 'v-5', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 41, image: 'https://i.ibb.co/j9X8f6gb/unnamed-55.jpg' },
  { id: 'v-6', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 4.8, reviews: 36, image: 'https://i.ibb.co/WNqZxhvb/unnamed-54.jpg' },
  { id: 'v-7', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 44, image: 'https://i.ibb.co/5xGRc8nj/unnamed-53.jpg' },
  { id: 'v-8', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 39, image: 'https://i.ibb.co/q6LVWRS/unnamed-52.jpg' },
  { id: 'v-9', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 48, image: 'https://i.ibb.co/R44JTZmX/unnamed-51.jpg' },
  { id: 'v-10', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 31, image: 'https://i.ibb.co/8Dfqz09R/unnamed-50.jpg', isNew: true },
  { id: 'v-11', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 22, image: 'https://i.ibb.co/DDSkm3hJ/unnamed-49.jpg' },
  { id: 'v-12', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 15, image: 'https://i.ibb.co/1fF8Cb3R/unnamed-48.jpg' },
  { id: 'v-13', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 18, image: 'https://i.ibb.co/fVxYVJ3z/unnamed-47.jpg' },
  { id: 'v-14', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 26, image: 'https://i.ibb.co/rRV9YgwV/unnamed-46.jpg' },
  { id: 'v-15', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 33, image: 'https://i.ibb.co/pjSjdV8X/unnamed-20.jpg' },
  { id: 'v-16', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 12, image: 'https://i.ibb.co/ycx7mjsv/unnamed-44.jpg' },
  { id: 'v-17', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.6, reviews: 40, image: 'https://i.ibb.co/3m9bcTrd/unnamed-43.jpg' },
  { id: 'v-18', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 21, image: 'https://i.ibb.co/NddFxG2V/unnamed-42.jpg' },
  { id: 'v-19', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 28, image: 'https://i.ibb.co/MrD13tK/unnamed-41.jpg' },
  { id: 'v-20', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 19, image: 'https://i.ibb.co/KjF4LVcS/unnamed-40.jpg' },
  { id: 'v-21', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 36, image: 'https://i.ibb.co/Z6Qy8Gnd/unnamed-39.jpg' },
  { id: 'v-22', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 4.7, reviews: 42, image: 'https://i.ibb.co/d0RGN6bF/unnamed-38.jpg' },
  { id: 'v-23', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 14, image: 'https://i.ibb.co/qFFqL5NZ/unnamed-37.jpg' },
  { id: 'v-24', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 11, image: 'https://i.ibb.co/rRSVD8sC/unnamed-36.jpg' },
  { id: 'v-25', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 25, image: 'https://i.ibb.co/Y704pmzQ/unnamed-35.jpg' },
  { id: 'v-26', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 30, image: 'https://i.ibb.co/F45Kjv2h/unnamed-34.jpg' },
  { id: 'v-27', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 38, image: 'https://i.ibb.co/WvyKhgzr/unnamed-19.jpg' },
  { id: 'v-28', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 13, image: 'https://i.ibb.co/gb2N4dvZ/unnamed-32.jpg' },
  { id: 'v-29', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 29, image: 'https://i.ibb.co/twgsg9ty/unnamed-31.jpg' },
  { id: 'v-30', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 16, image: 'https://i.ibb.co/wZ5MhQYf/unnamed-15.jpg' },
  { id: 'v-31', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 34, image: 'https://i.ibb.co/TB5P4Kxj/unnamed-29.jpg' },
  { id: 'v-32', name: 'Dart Edition: Vehicle Designs', type: 'Vehicle', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 27, image: 'https://i.ibb.co/S4sRFxjq/unnamed-25.jpg' },
  // Gamers Designs (32 Products)
  { id: 'g-1', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 67, image: 'https://i.ibb.co/C3BwMzcB/unnamed-88.jpg' },
  { id: 'g-2', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 89, image: 'https://i.ibb.co/xtdznJt1/unnamed-87.jpg' },
  { id: 'g-3', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4.900', rating: 5.0, reviews: 54, image: 'https://i.ibb.co/hx33fwSj/unnamed-86.jpg' },
  { id: 'g-4', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 72, image: 'https://i.ibb.co/yB61z0JR/unnamed-85.jpg' },
  { id: 'g-5', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 61, image: 'https://i.ibb.co/DH0YqYn7/unnamed-84.jpg' },
  { id: 'g-6', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 58, image: 'https://i.ibb.co/0PN0tpq/unnamed-83.jpg' },
  { id: 'g-7', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 78, image: 'https://i.ibb.co/Mxk4T3FT/unnamed-82.jpg' },
  { id: 'g-8', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 49, image: 'https://i.ibb.co/rK8w1TB4/unnamed-81.jpg' },
  { id: 'g-9', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Beginner', price: 'Rs. 2,550', rating: 4.6, reviews: 92, image: 'https://i.ibb.co/202YjsSg/unnamed-80.jpg', material: '85% Tungsten', weight: '20g' },
  { id: 'g-10', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 65, image: 'https://i.ibb.co/7N2ynQrB/unnamed-79.jpg' },
  { id: 'g-11', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 31, image: 'https://i.ibb.co/SDV6gXnt/unnamed-78.jpg' },
  { id: 'g-12', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 25, image: 'https://i.ibb.co/6cnzq5FG/unnamed-77.jpg' },
  { id: 'g-13', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 44, image: 'https://i.ibb.co/DPhGBVrf/unnamed-76.jpg' },
  { id: 'g-14', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 18, image: 'https://i.ibb.co/R4D53fbf/unnamed-75.jpg' },
  { id: 'g-15', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 36, image: 'https://i.ibb.co/JF83nxMk/unnamed-74.jpg' },
  { id: 'g-16', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 22, image: 'https://i.ibb.co/7t2nmRC2/unnamed-73.jpg' },
  { id: 'g-17', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 51, image: 'https://i.ibb.co/HT1MbGsw/unnamed-72.jpg' },
  { id: 'g-18', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 29, image: 'https://i.ibb.co/d0qwzcCS/unnamed-71.jpg' },
  { id: 'g-19', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 42, image: 'https://i.ibb.co/LzzM5RT2/unnamed-70.jpg' },
  { id: 'g-20', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 26, image: 'https://i.ibb.co/7dy9kF5k/unnamed-69.jpg' },
  { id: 'g-21', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 38, image: 'https://i.ibb.co/n8n3npDh/unnamed-68.jpg' },
  { id: 'g-22', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 21, image: 'https://i.ibb.co/dhF7NFs/unnamed-67.jpg' },
  { id: 'g-23', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 55, image: 'https://i.ibb.co/qGs4qyR/unnamed-66.jpg' },
  { id: 'g-24', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 4.8, reviews: 33, image: 'https://i.ibb.co/PvgYZnSy/unnamed-65.jpg' },
  { id: 'g-25', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 41, image: 'https://i.ibb.co/7d5vnb25/unnamed-10.jpg' },
  { id: 'g-26', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 24, image: 'https://i.ibb.co/xqWLC3TN/unnamed-17.jpg' },
  { id: 'g-27', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 37, image: 'https://i.ibb.co/yzG9sw7/unnamed-62.jpg' },
  { id: 'g-28', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 19, image: 'https://i.ibb.co/HT0nqX5T/unnamed-61.jpg' },
  { id: 'g-29', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 48, image: 'https://i.ibb.co/TxVJgCf3/unnamed-4.jpg' },
  { id: 'g-30', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 31, image: 'https://i.ibb.co/jPF74bGM/unnamed-59.jpg' },
  { id: 'g-31', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 45, image: 'https://i.ibb.co/SX6XgTsF/unnamed-58.jpg' },
  { id: 'g-32', name: 'Dart Edition: Gamers Designs', type: 'Gamers', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 23, image: 'https://i.ibb.co/j9RcQCdL/unnamed-16.jpg' },

  // Movie Designs (18 Products)

  { id: 'm-1', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 124, image: 'https://i.ibb.co/N2m34cwd/unnamed-2026-04-16-T123420-571.jpg', isHot: true },
  { id: 'm-2', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 86, image: 'https://i.ibb.co/mr1zzWnm/unnamed-2026-04-16-T123416-469.jpg', isNew: true },
  { id: 'm-3', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 92, image: 'https://i.ibb.co/RkFybTqM/unnamed-2026-04-16-T123412-334.jpg' },
  { id: 'm-4', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 75, image: 'https://i.ibb.co/0VV3Qccn/unnamed-2026-04-16-T123408-747.jpg' },
  { id: 'm-5', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 68, image: 'https://i.ibb.co/77MjKrF/unnamed-2026-04-16-T123405-570.jpg' },
  { id: 'm-6', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 54, image: 'https://i.ibb.co/5WT3CLNv/unnamed-2026-04-16-T123402-555.jpg' },
  { id: 'm-7', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 31, image: 'https://i.ibb.co/vxzHDhx0/unnamed-100.jpg' },
  { id: 'm-8', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 42, image: 'https://i.ibb.co/1YPQgRV6/unnamed-99.jpg' },
  { id: 'm-9', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 26, image: 'https://i.ibb.co/VWFWr3Qp/unnamed-98.jpg' },
  { id: 'm-10', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.6, reviews: 58, image: 'https://i.ibb.co/dsh2BgvX/unnamed-97.jpg' },
  { id: 'm-11', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 45, image: 'https://i.ibb.co/gFthvrHy/unnamed-11.jpg' },
  { id: 'm-12', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 32, image: 'https://i.ibb.co/V01r90ZT/unnamed-5.jpg' },
  { id: 'm-13', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 56, image: 'https://i.ibb.co/xSKVp613/unnamed-94.jpg' },
  { id: 'm-14', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 28, image: 'https://i.ibb.co/fZn9wvf/unnamed-93.jpg' },
  { id: 'm-15', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 39, image: 'https://i.ibb.co/N8HPy57/unnamed-92.jpg' },
  { id: 'm-16', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 24, image: 'https://i.ibb.co/60jrbhpc/unnamed-91.jpg' },
  { id: 'm-17', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Pro', price: 'Rs. 4,900', rating: 4.6, reviews: 62, image: 'https://i.ibb.co/wNJCJKYv/unnamed-90.jpg' },
  { id: 'm-18', name: 'Dart Edition: Movie Designs', type: 'Movie', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 35, image: 'https://i.ibb.co/PsvnR22R/unnamed-13.jpg' },


  // Marvel Designs (18 Products)


  { id: 'mv-1', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 156, image: 'https://i.ibb.co/HDF02rQW/unnamed-2026-04-16-T123834-881.jpg', isHot: true, colors: ['#DC2626', '#FFD700'] },
  { id: 'mv-2', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 142, image: 'https://i.ibb.co/ks2P8q5B/unnamed-2026-04-16-T123831-330.jpg', isHot: true, colors: ['#1E40AF', '#DC2626'] },
  { id: 'mv-3', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 134, image: 'https://i.ibb.co/sdQJx7jf/unnamed-2026-04-16-T123828-088.jpg' },
  { id: 'mv-4', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 128, image: 'https://i.ibb.co/qFgDrtmB/unnamed-2026-04-16-T123824-160.jpg', isHot: true },
  { id: 'mv-5', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 167, image: 'https://i.ibb.co/tfxDT5t/unnamed-2026-04-16-T123820-699.jpg', colors: ['#DC2626', '#1E40AF'] },
  { id: 'mv-6', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 149, image: 'https://i.ibb.co/q3xs92LP/unnamed-2026-04-16-T123817-593.jpg', colors: ['#16A34A', '#6B21A8'] },
  { id: 'mv-7', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 158, image: 'https://i.ibb.co/29bFkC0/unnamed-2026-04-16-T123813-739.jpg', colors: ['#DC2626', '#1F2937'] },
  { id: 'mv-8', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 121, image: 'https://i.ibb.co/xqQX9nqG/unnamed-2026-04-16-T123803-045.jpg', isHot: true },
  { id: 'mv-9', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 136, image: 'https://i.ibb.co/f3GdQ7N/unnamed-2026-04-16-T123734-579.jpg', colors: ['#DC2626', '#1F2937'] },
  { id: 'mv-10', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 118, image: 'https://i.ibb.co/Rk8PHyxz/unnamed-2026-04-16-T123730-639.jpg' },
  { id: 'mv-11', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 88, image: 'https://i.ibb.co/hJvcx5ZN/unnamed-2026-04-16-T123725-880.jpg' },
  { id: 'mv-12', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 74, image: 'https://i.ibb.co/JW3QgbkG/unnamed-2026-04-16-T123721-072.jpg' },
  { id: 'mv-13', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 92, image: 'https://i.ibb.co/LDr1tNDn/unnamed-2026-04-16-T123717-555.jpg' },
  { id: 'mv-14', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 65, image: 'https://i.ibb.co/1fZJqDRQ/unnamed-2026-04-16-T123714-557.jpg' },
  { id: 'mv-15', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 81, image: 'https://i.ibb.co/0yN3nHMp/unnamed-2026-04-16-T123711-078.jpg' },
  { id: 'mv-16', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 58, image: 'https://i.ibb.co/wfC1XSc/unnamed-2026-04-16-T123708-315.jpg' },
  { id: 'mv-17', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 99, image: 'https://i.ibb.co/ymSMyGFh/unnamed-2026-04-16-T123704-616.jpg' },
  { id: 'mv-18', name: 'Dart Edition: Marvel Designs', type: 'Marvel', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 72, image: 'https://i.ibb.co/gZt0Ctgy/unnamed-2026-04-16-T123701-459.jpg' },



  // Anime Designs (23 Products)
  { id: 'a-1', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 203, image: 'https://i.ibb.co/Jjwq76JR/unnamed-2026-04-16-T124458-834.jpg', isHot: true, colors: ['#F97316', '#1E40AF'] },
  { id: 'a-2', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 187, image: 'https://i.ibb.co/99WwQ5X3/unnamed-2026-04-16-T124456-143.jpg', isHot: true, colors: ['#DC2626', '#FFD700'] },
  { id: 'a-3', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 176, image: 'https://i.ibb.co/p6GVYm5g/unnamed-2026-04-16-T124452-347.jpg', isHot: true },
  { id: 'a-4', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 215, image: 'https://i.ibb.co/HLLp1Kw3/unnamed-2026-04-16-T124449-017.jpg', isHot: true, colors: ['#F97316', '#1E40AF'] },
  { id: 'a-5', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 192, image: 'https://i.ibb.co/nspZ12rg/unnamed-2026-04-16-T124444-905.jpg', colors: ['#16A34A', '#DC2626'] },
  { id: 'a-6', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 198, image: 'https://i.ibb.co/bjrCBrr8/unnamed-2026-04-16-T124439-010.jpg', isHot: true },
  { id: 'a-7', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 168, image: 'https://i.ibb.co/5WpdLYNz/unnamed-2026-04-16-T124436-046.jpg', colors: ['#1F2937', '#F97316'] },
  { id: 'a-8', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 154, image: 'https://i.ibb.co/mxDzz4j/unnamed-2026-04-16-T124432-494.jpg', colors: ['#DC2626', '#FFD700'] },
  { id: 'a-9', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 173, image: 'https://i.ibb.co/JjQfVg5V/unnamed-2026-04-16-T124429-396.jpg', colors: ['#1F2937', '#DC2626'] },
  { id: 'a-10', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 161, image: 'https://i.ibb.co/0VFn9KW9/unnamed-2026-04-16-T124426-529.jpg' },
  { id: 'a-11', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 112, image: 'https://i.ibb.co/C3XskzmW/unnamed-2026-04-16-T124414-805.jpg' },
  { id: 'a-12', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 95, image: 'https://i.ibb.co/JFMmgXTj/unnamed-2026-04-16-T124411-631.jpg' },
  { id: 'a-13', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 138, image: 'https://i.ibb.co/nMdPLDDP/unnamed-2026-04-16-T124407-556.jpg' },
  { id: 'a-14', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 82, image: 'https://i.ibb.co/yMBhPmz/unnamed-2026-04-16-T124404-031.jpg' },
  { id: 'a-15', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.9, reviews: 105, image: 'https://i.ibb.co/TMtmTz2q/unnamed-12.jpg' },
  { id: 'a-16', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 76, image: 'https://i.ibb.co/kLpYNC2/unnamed-2026-04-16-T124356-485.jpg' },
  { id: 'a-17', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.6, reviews: 144, image: 'https://i.ibb.co/RkW8DGvp/unnamed-2026-04-16-T124353-950.jpg' },
  { id: 'a-18', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 89, image: 'https://i.ibb.co/CKpJgpVZ/unnamed-2026-04-16-T124351-259.jpg' },
  { id: 'a-19', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 118, image: 'https://i.ibb.co/21hjDg7c/unnamed-7.jpg' },
  { id: 'a-20', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 67, image: 'https://i.ibb.co/j2Lxwbp/unnamed-2026-04-16-T124344-991.jpg' },
  { id: 'a-21', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 156, image: 'https://i.ibb.co/LXvpkKgS/unnamed-2026-04-16-T124341-890.jpg' },
  { id: 'a-22', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 92, image: 'https://i.ibb.co/ZRZPvk9Y/unnamed-2026-04-16-T124338-256.jpg' },
  { id: 'a-23', name: 'Dart Edition: Anime Designs', type: 'Anime', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 124, image: 'https://i.ibb.co/sJHs79gp/unnamed-2026-04-16-T124329-066.jpg' },

  { id: 't-1', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 76, image: 'https://i.ibb.co/tpwMrS61/unnamed-14.jpg' },
  { id: 't-2', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 68, image: 'https://i.ibb.co/0V6XTbpm/unnamed-2026-04-16-T125028-619.jpg' },
  { id: 't-3', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 54, image: 'https://i.ibb.co/C52fLHF5/unnamed-22.jpg' },
  { id: 't-4', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 61, image: 'https://i.ibb.co/0yC5tsSW/unnamed-2026-04-16-T125022-740.jpg' },
  { id: 't-5', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Beginner', price: 'Rs. 4,900', rating: 4.5, reviews: 92, image: 'https://i.ibb.co/dJ55F0pK/unnamed-2026-04-16-T125018-442.jpg' },
  { id: 't-6', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 45, image: 'https://i.ibb.co/sY3YZyy/unnamed-2026-04-16-T125014-632.jpg' },
  { id: 't-7', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 32, image: 'https://i.ibb.co/xqqH8b6M/unnamed-2026-04-16-T125011-319.jpg' },
  { id: 't-8', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 56, image: 'https://i.ibb.co/1YmNJz5C/unnamed-2026-04-16-T125007-484.jpg' },
  { id: 't-9', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Tournament', price: 'Rs. 4,900', rating: 4.9, reviews: 21, image: 'https://i.ibb.co/sptWksq3/unnamed-2026-04-16-T125004-231.jpg' },
  { id: 't-10', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Pro', price: 'Rs. 4,900', rating: 4.8, reviews: 38, image: 'https://i.ibb.co/8tCXFKQ/unnamed-2026-04-16-T125001-527.jpg' },
  { id: 't-11', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Tournament', price: 'Rs. 4,900', rating: 5.0, reviews: 15, image: 'https://i.ibb.co/XkVh6wZm/unnamed-23.jpg' },
  { id: 't-12', name: 'Dart Edition: Typographic', type: 'Typographic', style: 'Pro', price: 'Rs. 4,900', rating: 4.7, reviews: 42, image: 'https://i.ibb.co/gMHWzg9z/unnamed-8.jpg' },

];
