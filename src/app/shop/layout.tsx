import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - Premium Darts & Equipment",
  description: "Browse our collection of professional darts, dartboards, and accessories. Experience the best quality gear in Sri Lanka.",
  keywords: ["Dart Shop Sri Lanka", "Buy Darts Online", "Dartboards", "Dart Accessories"],
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
