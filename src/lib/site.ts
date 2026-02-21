import siteConfig from "@config";

export { siteConfig };

export function getCompanyName(): string {
  return siteConfig.company.name;
}

export function getFooterCredit(): { text: string; url: string; companyName: string } {
  return {
    text: siteConfig.footer.credit.textKey,
    url: siteConfig.footer.credit.url,
    companyName: siteConfig.footer.credit.companyName,
  };
}

export function getSeoTitle(pageTitle: string): string {
  return siteConfig.seo.titleTemplate.replace("%s", pageTitle);
}

export function getContactInfo() {
  return siteConfig.contact;
}

export function getSocialLinks() {
  return siteConfig.social;
}

export function isFeatureEnabled(feature: keyof typeof siteConfig.features): boolean {
  return siteConfig.features[feature];
}
