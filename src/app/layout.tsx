import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sangwook Son - Product Designer",
  description: "Portfolio of Sangwook Son, a Senior Product Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <body
        className={`antialiased min-h-screen flex flex-col bg-black text-white`}
      >
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
