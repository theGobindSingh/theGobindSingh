import config from '@kami-ui/eslint-config/next';

export default [
  ...config,
  {
    ignorePatterns: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      'next.config.js',
    ],
  },
];
