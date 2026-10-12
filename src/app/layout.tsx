import type { Metadata } from "next";
import { Inter, Outfit, Dancing_Script } from "next/font/google";
import "@/app/globals.css";

import { Navbar } from "@/components/Navbar";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { ShopProvider } from "@/context/ShopContext";

import { CartSidebar } from "@/components/CartSidebar";
import { QuickViewModal } from "@/components/QuickViewModal";
import { CompareNotification } from "@/components/CompareNotification";
import { SplashScreen } from "@/components/SplashScreen";
import { JSONLD } from "@/components/JSONLD";
import { Toast } from "@/components/Toast";
import { WhatsAppBookingDialog } from "@/components/WhatsAppBookingDialog";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ 
  subsets: ["latin"], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script' 
});

const LOGO_URL = "https://i.ibb.co/qZ3HmmX/Gemini-Generated-Image-9zxsnj9zxsnj9zxs-removebg-preview-1.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://dartsrilanka.com"),
  title: {
    default: "Dart Sri Lanka | Premium Darts & Art Handcrafted Boards",
    template: "%s | Dart Sri Lanka"
  },
  description:
    "Dart Sri Lanka's premier studio for professional gear and bespoke art handcrafted boards. Shop the finest selection of high-end equipment and stunning wall-mounted masterpieces.",

  keywords: [
    "Darts Sri Lanka",
    "Dartboards Sri Lanka",
    "Professional Darts",
    "Steel Tip Darts",
    "Soft Tip Darts",
    "Dart Accessories",
    "Kandy Darts Shop",
    "Online Darts Store Sri Lanka"
  ],

  authors: [{ name: "Dart Sri Lanka" }],
  creator: "Dart Sri Lanka",
  publisher: "Dart Sri Lanka",

  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://dartsrilanka.com",
    siteName: "Dart Sri Lanka",
    title: "Dart Sri Lanka | Arts & Crafts Store",
    description:
      "Dart Sri Lanka's premier studio for professional gear and bespoke art handcrafted boards.",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: "Dart Sri Lanka"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Dart Sri Lanka | Arts & Crafts Store",
    description:
      "Dart Sri Lanka's premier studio for professional gear and bespoke art handcrafted boards.",
    images: [LOGO_URL],
    creator: "@dartsrilanka"
  },

  icons: {
    icon: LOGO_URL,
    shortcut: LOGO_URL,
    apple: LOGO_URL
  },

  robots: {
    index: true,
    follow: true
  },

  alternates: {
    canonical: "https://dartsrilanka.com"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${dancingScript.variable} min-h-screen flex flex-col bg-white dark:bg-[#0a0000] text-gray-900 dark:text-gray-100 transition-colors duration-500`}
      >
        <JSONLD />
        <SplashScreen />

        <ShopProvider>
          <TopBar />
          <Navbar />
          <Breadcrumbs />

          <main className="flex-1 bg-gray-50/30 dark:bg-transparent pb-20 lg:pb-0">
            <SmoothScroll>{children}</SmoothScroll>
          </main>

          <Footer />
          <CartSidebar />
          <QuickViewModal />
          <CompareNotification />
          <Toast />
        </ShopProvider>
      </body>
    </html>
  );
}