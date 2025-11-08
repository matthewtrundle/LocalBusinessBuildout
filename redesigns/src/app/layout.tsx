import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATX Revival - Modern Business Redesigns",
  description: "Stunning homepage redesigns for Austin businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
