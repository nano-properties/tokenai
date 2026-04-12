import type { Metadata } from "next";
import { Playfair_Display, Sora, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-chinese",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "词元栈 TokenAI - AI Token Exchange",
  description: "词元栈 TokenAI - 面向开发者的统一 AI API 聚合中转站",
  icons: {
    icon: {
      url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang="zh-CN"
      className={`${playfair.variable} ${sora.variable} ${notoSansSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
