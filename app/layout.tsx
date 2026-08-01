import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merkez Taksi | Online Taksi Çağır",
  description: "Hemen taksi çağırın veya yolculuğunuzu ileri bir saate planlayın.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body className="min-h-screen antialiased">{children}</body></html>;
}
