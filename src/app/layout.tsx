// app/layout.tsx
"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import localFont from "next/font/local";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KindeProvider
      domain={process.env.NEXT_PUBLIC_KINDE_ISSUER_URL}
      clientId={process.env.NEXT_PUBLIC_KINDE_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_KINDE_POST_LOGIN_REDIRECT_URL}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </KindeProvider>
  );
}
