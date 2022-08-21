export interface Color {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  colorPrimary: string;
  colorSecondary: string;
  colorTertiary: string;
  quranWordColor: string;
  quranWordBackgroundColor: string;
}
// https://www.hexcolortool.com/

export const lightColors: Color = {
  backgroundPrimary: 'hsla(0, 100%, 100%, 1)',
  backgroundSecondary: 'hsla(0, 0%, 66%, 1)',
  backgroundTertiary: 'hsla(0, 0%, 83%, 1)',
  colorPrimary: 'hsla(0, 0%, 7%, 1)',
  colorSecondary: 'hsla(0, 0%, 39%, 1)',
  colorTertiary: 'hsla(0, 0%, 59%, 1)',
  quranWordColor: 'hsla(0, 0%, 0%, 1)', // #000000
  quranWordBackgroundColor: 'hsla(0, 0%, 90%, 1)',
};

// Dark theme colors
export const darkColors: Color = {
  backgroundPrimary: 'hsla(0, 0%, 7%, 1)',
  backgroundSecondary: 'hsla(0, 0%, 13%, 1)',
  backgroundTertiary: 'hsla(0, 0%, 17%, 1)',
  colorPrimary: 'hsla(0, 100%, 100%, 1)',
  colorSecondary: 'hsla(0, 0%, 83%, 1)',
  colorTertiary: 'hsla(0, 0%, 66%, 1)',
  quranWordColor: 'hsla(0, 100%, 100%, 1)',
  quranWordBackgroundColor: 'hsla(0, 0%, 20%, 1)',
};
