import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getFont, getFontVariable } from "@/lib/fonts";
import siteConfig from "@config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.company.name,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.company.description,
  metadataBase: new URL(siteConfig.seo.siteUrl),
  openGraph: {
    type: "website",
    siteName: siteConfig.company.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const headingFont = getFont(siteConfig.fonts.heading);
  const bodyFont = getFont(siteConfig.fonts.body);
  const headingVar = getFontVariable(siteConfig.fonts.heading);
  const bodyVar = getFontVariable(siteConfig.fonts.body);

  return (
    <html lang={locale} className={`${headingVar} ${bodyVar}`}>
      <body
        className={`${bodyFont.className} antialiased bg-white text-neutral-800`}
      >
        <NextIntlClientProvider messages={messages}>
          <OrganizationJsonLd companyName={siteConfig.company.name} />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
