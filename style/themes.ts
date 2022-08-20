export interface Color {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  colorPrimary: string;
  colorSecondary: string;
  colorTertiary: string;
  quranWordColor: string;
}

export const lightColors: Color = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#a9a9a9',
  backgroundTertiary: '#d3d3d3',
  //   colorPrimary: '#000000',
  colorPrimary: '#121212',
  colorSecondary: '#1f1f1f',
  colorTertiary: '#969696',
  quranWordColor: '#000000',
};

// Dark theme colors
export const darkColors: Color = {
  //   backgroundPrimary: '#000000',
  backgroundPrimary: '#121212',
  backgroundSecondary: '#212121',
  backgroundTertiary: '#2b2b2b',
  colorPrimary: '#FFFFFF',
  colorSecondary: '#d3d3d3',
  colorTertiary: '#a9a9a9',
  quranWordColor: '#FFFFFF',
};
