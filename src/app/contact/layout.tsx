import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Dart Sri Lanka",
  description: "Get in touch with Dart Sri Lanka. We're here to help with your inquiries about darts, accessories, and professional setups.",
  keywords: ["Contact Dart Sri Lanka", "Dart Support", "Darts Kandy Office"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
