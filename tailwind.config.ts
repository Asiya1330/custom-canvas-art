import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      colors: {
        'custom-purple': '#7500EA',
        'custom-pink': '#CE22FA',
        'custom-black': '#01152D',
        'custom-green': '#0CA156',
        'custom-purple-dark': '#CE22FA8E'
      },
      fontFamily: {
        header: ['Recoleta', 'serif'],
        body: ['Avenir', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
