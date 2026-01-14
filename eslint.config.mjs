import config from '@kami-ui/eslint-config/next';

export default [
  ...config,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      'next.config.js',
    ],
  },
];
