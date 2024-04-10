import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      krona: ['"Krona One"', 'sans-serif'], // Utilisez une police de secours comme 'sans-serif'.
      water: ['"Water Brush"']
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'img-bg-main': "url('/img/img-bg-main.webp')",
          'img-bg-servers': "url('/img/img-bg-servers.webp')",
          "img-bg-shop": "url('/img/img-bg-shop.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
