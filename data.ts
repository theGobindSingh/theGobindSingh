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
    url: string;
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
      url: '/',
    },
    {
      text: 'About',
      url: '/about',
    },
    {
      text: 'Contact',
      url: '/contact',
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
