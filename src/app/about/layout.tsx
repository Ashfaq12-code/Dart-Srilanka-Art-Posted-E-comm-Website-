import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Dart Sri Lanka",
  description: "Learn more about Dart Sri Lanka, our dedicated team, and our mission to provide the best darts and equipment to players across the island.",
  keywords: ["About Dart Sri Lanka", "Dart Team Sri Lanka", "Darts Mission"],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
