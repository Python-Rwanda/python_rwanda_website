import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-bricolage",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: set to the production domain once it is live.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Python Rwanda — A Python community in Rwanda", template: "%s · Python Rwanda" },
  description:
    "Python Rwanda brings together students, developers, researchers and data practitioners through bootcamps, meetups, workshops and webinars.",
  icons: { icon: "/media/logo-mark.png" },
  openGraph: {
    title: "Python Rwanda",
    description: "A Python community in Rwanda.",
    images: ["/media/mku/1.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#0f1626" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
