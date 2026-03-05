import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Тарифы",
  description: "Тестовое задание с выбором тарифов и таймером скидки"
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
