import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";


export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
      <main className="flex min-h-screen flex-col">
        <div className="flex-1">
            <Header />
        {children}
        <Footer />
        </div>
      </main>
      </body>
    </html>
  );
}
