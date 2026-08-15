import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/context/cartContext";
import MySession from "@/components/MySessionProvider/MySession";
import WishlistContextProvider from "@/components/context/wishListContext";
import AddressContextProvider from "@/components/context/addrssesContext";

export const metadata: Metadata = {
  title: "ShopMart | Modern Ecommerce",
  description: "Shop electronics, fashion, and lifestyle products with a clean ecommerce experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MySession>
          <CartContextProvider>
            <WishlistContextProvider>
              <AddressContextProvider>
                <Navbar />
                <main className="container mx-auto min-h-[70vh] px-4">
                  {children}
                  <Toaster />
                </main>
                <Footer />
              </AddressContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
        </MySession>
      </body>
    </html>
  );
}
