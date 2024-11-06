import myPhoto from '@images/me2.jpg';

export const firstName = 'Gobind';
export const lastName = 'Singh';
export const fullName = `${firstName} ${lastName}`;

export const designation = 'Web Developer | SDE';

export const email = 'android.gobind@gmail.com';

export const headerAndNavData: {
  logoText: string;
  middleText?: string;
  bottomPrimaryLink?: {
    text: string;
    url: string;
  };
  links: {
    text: string;
    targetClassName: string;
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
      targetClassName: 'hero',
    },
    {
      text: 'About',
      targetClassName: 'about',
    },
    {
      text: 'Contact',
      targetClassName: 'contact',
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
  title: `${fullName}.`,
  text: `I help growing brands and startups gain an unfair advantage through premium, results driven websites.`,
  img: myPhoto,
  dateText: 'Building exceptional digital experiences since',
  date: '2021',
  buttonText: 'Contact ↗',
  buttonTargetClassName: 'contact',
};
