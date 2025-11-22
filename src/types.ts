export interface TextConfig {
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  textAlign: CanvasTextAlign;
}

export interface CertificateState {
  templateImage: string | null; // Base64 or URL
  names: string[];
  currentNameIndex: number;
  config: TextConfig;
}

export enum FontFamily {
  ROBOTO = 'Roboto',
  GREAT_VIBES = 'Great Vibes',
  PLAYFAIR = 'Playfair Display',
  INTER = 'Inter',
  SERIF = 'serif',
  SANS = 'sans-serif',
}

export const DEFAULT_CONFIG: TextConfig = {
  x: 400,
  y: 300,
  fontSize: 48,
  fontFamily: FontFamily.GREAT_VIBES,
  color: '#000000',
  textAlign: 'center',
};
