/* eslint-disable */
import type { ThemeObject } from '@kami-ui/types';
import { breakpoints } from '@styles/global';
import { DM_Mono, DM_Sans, DM_Serif_Display } from 'next/font/google';

const fontSansSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin', 'latin-ext'],
});

const fontMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin', 'latin-ext'],
});

const fontSans = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const theme: ThemeObject = {
  colors: {
    primary: ['rgb(232 232 227)'],
    secondary: [],
    text: [
      'rgb(221 221 213)',
      'rgb(209 209 199)',
      'rgb(162 158 154)',
      'rgb(126 118 108)',
      'rgb(140 140 115)',
      'rgb(107 100 92)',
      'rgb(82 77 71)',
      'rgb(57 54 50)',
      'rgb(19 19 17)',
    ],
  },
  typography: {
    fontSizes: [
      {
        breakpoint: {
          min: `${breakpoints.desktop.min}px`,
          max: `${breakpoints.desktop.max}px`,
        },
        size: [
          '0.75rem', // 12px
          '0.875rem', // 14px
          '1rem', // 16px
          '1.125rem', // 18px
          '1.25rem', // 20px
          '1.5rem', // 24px
          '1.875rem', // 30px
          '2.25rem', // 36px
          '3rem', // 48px
          '4rem', // 64px
          '5rem', // 80px
        ],
      },
      {
        breakpoint: {
          min: `0px`,
          max: `${breakpoints.tablet.max}px`,
        },
        size: [
          '0.68rem', // 11px
          '0.75rem', // 12px
          '0.875rem', // 14px
          '1rem', // 16px
          '1.125rem', // 18px
          '1.25rem', // 20px
          '1.5rem', // 24px
          '1.875rem', // 30px
          '2.25rem', // 36px
          '3rem', // 48px
          '4rem', // 64px
        ],
      },
    ],
    fontFamilies: {
      serif: fontSansSerif.style.fontFamily,
      sans: fontSans.style.fontFamily,
      mono: fontMono.style.fontFamily,
    },
  },
};
