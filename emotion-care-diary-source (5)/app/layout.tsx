import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "감정케어 다이어리",
  description: "하루의 감정을 기록하고 나에게 맞는 마음 케어를 받는 감정 기록 앱",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
