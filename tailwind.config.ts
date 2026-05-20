import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
    './index.tsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
