import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthSessionProvider } from "@/components/session-provider";
import { getPortfolioData } from "@/lib/models";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const portfolioData = await getPortfolioData();
  
  if (!portfolioData) {
    return {
      title: "Portfolio - Full Stack Developer",
      description: "Full Stack Developer Portfolio showcasing skills and projects",
    };
  }

  return {
    title: `${portfolioData.name} - ${portfolioData.title}`,
    description: portfolioData.description,
    openGraph: {
      title: `${portfolioData.name} - ${portfolioData.title}`,
      description: portfolioData.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${portfolioData.name} - ${portfolioData.title}`,
      description: portfolioData.description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
