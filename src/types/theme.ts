export interface ThemeConfig {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  gradients: Record<string, string>;
  animation: ThemeAnimation;
  container: Record<string, string>;
  breakpoints: Record<string, string>;
}

export interface ThemeColors {
  brand: Record<string, string>;
  neutral: Record<string, string>;
  semantic: Record<string, string>;
  surface: Record<string, string>;
}

export interface ThemeTypography {
  fontFamily: Record<string, string>;
  fontSize: Record<string, FontSizeConfig>;
  fontWeight: Record<string, string>;
}

export interface FontSizeConfig {
  size: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface ThemeAnimation {
  duration: Record<string, string>;
  easing: Record<string, string>;
}
