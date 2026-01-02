import type { IconType } from '@icons-pack/react-simple-icons';
import { SiGithub, SiInstagram } from '@icons-pack/react-simple-icons';
import type { LucideProps } from 'lucide-react';
import { Linkedin, Mail } from 'lucide-react';

import myPhoto from '@images/me2.jpg';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export const firstName = 'Gobind';
export const lastName = 'Singh';
export const fullName = `${firstName} ${lastName}`;

export const designation = 'Web Developer | SDE';

export const email = 'thesinghgobind@gmail.com';

export const resumeLink = '/assets/pdfs/resume.pdf';

export enum SOCIAL_KEYS {
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  EMAIL = 'EMAIL',
  INSTAGRAM = 'INSTAGRAM',
}

export const socialLinks: {
  [key in SOCIAL_KEYS]?: {
    url: string;
    label: string;
    logo:
      | IconType
      | ForwardRefExoticComponent<
          Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
        >;
  };
} = {
  [SOCIAL_KEYS.GITHUB]: {
    url: 'https://www.github.com/theGobindSingh',
    label: 'GitHub',
    logo: SiGithub,
  },
  [SOCIAL_KEYS.LINKEDIN]: {
    url: 'https://www.linkedin.com/in/thegobindsingh',
    label: 'LinkedIn',
    logo: Linkedin,
  },
  [SOCIAL_KEYS.EMAIL]: {
    url: `mailto:${email}`,
    label: 'Email',
    logo: Mail,
  },
  [SOCIAL_KEYS.INSTAGRAM]: {
    url: 'https://www.instagram.com/thegobindsingh',
    label: 'Instagram',
    logo: SiInstagram,
  },
};

export const headerAndNavData: {
  logoText: string;
  middleText?: string;
  bottomPrimaryLink?: {
    text: string;
    url: string;
  };
  links: {
    text: string;
    targetId?: string;
    url?: string;
    isHiddenInV1?: boolean;
    isHiddenInV2?: boolean;
  }[];
  bottomLinks?: {
    text: string;
    url: string;
  }[];
} = {
  logoText: fullName,
  middleText: designation,
  links: [
    {
      text: 'Home',
      targetId: 'home',
      isHiddenInV1: true,
    },
    {
      text: 'About',
      targetId: 'about',
    },
    {
      text: 'Experience',
      targetId: 'experience',
    },
    {
      text: 'Work',
      targetId: 'work',
    },
    {
      text: 'Extracurricular',
      targetId: 'extracurricular',
    },
    {
      text: 'Contact',
      targetId: 'contact',
    },
  ],
  bottomPrimaryLink: {
    text: 'Email address',
    url: `mailto:${email}`,
  },
  bottomLinks: [
    {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/thegobindsingh/',
    },
    {
      text: 'GitHub',
      url: 'https://www.github.com/theGobindSingh',
    },
    {
      text: 'Twitter',
      url: 'https://www.twitter.com/theGobindSingh',
    },
  ],
};

export const homeHeroData = {
  titleSuffix: 'Hi, my name is ',
  title: `${fullName}.`,
  titlePostfix: 'I build things for the web.',
  img: myPhoto,
  text: `I engineer thoughtful web products built to last.\nExceptional digital experiences.`,
  textReplacements: [
    {
      text: 'Exceptional digital experiences.',
      url: 'https://youtu.be/dQw4w9WgXcQ?t=43',
    },
  ],
  dateText: 'Building exceptional digital experiences since',
  date: '2021',
  buttonText: 'Contact ↗',
  buttonTargetClassName: 'contact',
};
