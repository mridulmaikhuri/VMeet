import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zoom",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/icons/logo.svg" />
      </head>
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/logo.svg",
          }
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
