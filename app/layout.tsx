import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Page";
import Footer from "@/components/Footer/Page";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anhar Munir | Full Stack & AI Engineer",
  description: "Final year Software Engineering student at FAST NUCES. Building AI-powered systems, full stack web apps, and ML solutions. Open to full-time roles.",
  keywords: ["Anhar Munir", "Anharhehe", "Software Engineer", "AI Engineer", "Full Stack Developer", "FAST NUCES", "Pakistan", "Web Development", "Web Developer", "Mobile Development", "React", "Node.js", "Python", "Machine Learning", "Artificial Intelligence", "Portfolio"],
  authors: [{ name: "Anhar Munir" }],
  openGraph: {
    title: "Anhar Munir | Full Stack & AI Engineer",
    description: "Final year Software Engineering student at FAST NUCES. Building AI-powered systems and full stack web apps.",
    url: "https://anharhehe.site",
    siteName: "Anhar Munir Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anhar Munir | Full Stack & AI Engineer",
    description: "Final year Software Engineering student at FAST NUCES.",
  },
  metadataBase: new URL("https://anharhehe.site"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
