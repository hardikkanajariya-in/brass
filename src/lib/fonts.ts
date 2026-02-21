import {
  Poppins,
  Inter,
  Roboto,
  Open_Sans,
  Montserrat,
  Playfair_Display,
  Raleway,
  Lato,
  Nunito,
  Source_Sans_3,
  Merriweather,
  DM_Sans,
} from "next/font/google";
import type { NextFont } from "next/dist/compiled/@next/font";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-open-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-raleway",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-lato",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-merriweather",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const fontRegistry: Record<string, NextFont> = {
  Poppins: poppins,
  Inter: inter,
  Roboto: roboto,
  "Open Sans": openSans,
  Montserrat: montserrat,
  "Playfair Display": playfairDisplay,
  Raleway: raleway,
  Lato: lato,
  Nunito: nunito,
  "Source Sans 3": sourceSans3,
  Merriweather: merriweather,
  "DM Sans": dmSans,
};

export function getFont(name: string): NextFont {
  return fontRegistry[name] ?? poppins;
}

export function getFontVariable(name: string): string {
  const font = getFont(name);
  return "variable" in font ? (font.variable as string) : "";
}
