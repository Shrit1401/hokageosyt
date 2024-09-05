import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const hokageFont = localFont({
  src: "./hokageFont.ttf",
});

export const metadata: Metadata = {
  title: "Hokage OS",
  icons: [
    {
      rel: "icon",
      href: "/favicon.ico",
      url: "/favicon.ico",
    },
  ],
  description: "Hokage OS is a retro operating system for apple lovable geeks.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="./favicon.ico" />
      </head>
      <body className={hokageFont.className}>{children}</body>
    </html>
  );
}
