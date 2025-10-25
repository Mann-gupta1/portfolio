import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Mann Gupta - Software Engineer & AI/ML Developer | Professional Portfolio",
    template: "%s | Mann Gupta Portfolio"
  },
  description: "Professional portfolio of Mann Gupta - Software Engineer & AI/ML Developer. JEE Advanced qualified with experience in backend development, AI/ML, DevOps, and cloud infrastructure. Available for opportunities.",
  keywords: [
    "Mann Gupta",
    "Full-stack Developer", 
    "Python Developer",
    "AI Engineer",
    "Portfolio",
    "Software Developer",
    "Machine Learning",
    "IoT Developer",
    "Web Development",
    "Next.js",
    "React",
    "FastAPI",
    "Django",
    "Automation",
    "LangChain",
    "Smart India Hackathon",
    "Freelancer",
    "AI Chatbot",
    "Professional Portfolio",
    "Developer Portfolio",
    "Tech Portfolio",
    "Internship",
    "Python Automation",
    "Web Scraping",
    "API Development"
  ],
  authors: [
    {
      name: "Mann Gupta",
      url: "https://mann-gupta1.github.io/",
    },
  ],
  creator: "Mann Gupta",
  publisher: "Mann Gupta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.anujjainbatu.tech/",
    title: "Mann Gupta - Software Engineer & AI/ML Developer | Professional Portfolio",
    description: "Professional portfolio showcasing AI/ML projects, backend development, and cloud infrastructure. JEE Advanced qualified with 1900+ LeetCode rating. Available for opportunities.",
    siteName: "Mann Gupta Portfolio",
    images: [
      {
        url: "https://portfolio.anujjainbatu.tech/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Mann Gupta - Professional Portfolio with AI Chatbot",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mann Gupta - Software Engineer & AI/ML Developer",
    description: "Professional portfolio showcasing AI/ML projects, backend development, and cloud infrastructure. JEE Advanced qualified available for opportunities.",
    creator: "@mann-gupta1",
    site: "@mann-gupta1",
    images: [{
      url: "https://portfolio.anujjainbatu.tech/portfolio.png",
      alt: "Mann Gupta Professional Portfolio"
    }],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      }
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://portfolio.anujjainbatu.tech/",
  },
  category: "technology",
  classification: "Portfolio Website",
  other: {
    "google-site-verification": "your-google-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://portfolio.anujjainbatu.tech/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mann Gupta",
              "jobTitle": "Software Engineer & AI/ML Developer",
              "url": "https://mann-gupta1.github.io/",
              "image": "https://mann-gupta1.github.io/assets/avatar.jpg",
              "sameAs": [
                "https://github.com/mann-gupta1",
                "https://linkedin.com/in/gupta-mann",
                "https://leetcode.com/m-g"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "RGIPT"
              },
              "knowsAbout": [
                "Python Development",
                "AI Engineering",
                "Machine Learning",
                "IoT Systems",
                "Web Development",
                "Automation",
                "Full Stack Development"
              ],
              "description": "Software Engineer & AI/ML Developer with expertise in backend development, cloud infrastructure, and AI/ML solutions. JEE Advanced qualified with 1900+ LeetCode rating."
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
      </body>
    </html>
  );
}