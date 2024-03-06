import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title = "シャノンの究極のマシン生存期間ランキング";
const description = "『シャノンの究極のマシン』の生存期間ランキング";
const keywords = "シャノン,究極のマシン";

export const metadata: Metadata = {
  title,
  description,
  keywords,
  openGraph: {
    title,
    description,
    siteName: title,
    url: "https://shannons-ultimate-machine-ranking.vercel.app/",
    locale: "ja_JP",
    type: "website",
    images: "https://shannons-ultimate-machine-ranking.vercel.app/Icon-512.png",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@tannakaken",
    creator: "@tannakaken",
    images: "https://shannons-ultimate-machine-ranking.vercel.app/Icon-512.png",
  },
  alternates: {
    canonical: "https://shannons-ultimate-machine-ranking.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
