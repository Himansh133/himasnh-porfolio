import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ParticleCanvas } from "@/components/particle-canvas";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.tagline} Student at ${site.college}.`,
  keywords: [
    "Himanshu Kumar",
    "Himansh133",
    "Software Engineer",
    "LLM Agents",
    "C++17",
    "Qt6",
    "FastAPI",
    "Jaypee Institute of Information Technology",
    "JIIT",
    "Corsair YC W25",
    "JV Micronics",
  ],
  authors: [{ name: site.name, url: site.social.github }],
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.tagline,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className="h-full antialiased">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                if (stored === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <ThemeProvider>
          <ParticleCanvas />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
