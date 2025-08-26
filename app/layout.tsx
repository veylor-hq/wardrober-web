import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Clothing Collection",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="p-4 bg-white shadow-md flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/items">Items</Link>
          <Link href="/items/add">Add Item</Link>
          <Link href="/tags">Tags</Link>
          <Link href="/tags/add">Add Tag</Link>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
