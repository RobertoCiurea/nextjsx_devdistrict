import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "var(--bg-primary)",
        backgroundAccent: "var(--bg-accent)",
        primaryAccent: "var(--primary-accent)",
        primaryAccentHover: "var(--primary-accent-hover)",
        primaryGray: "var(--primary-gray)",
      },
      fontFamily: {
        Montserrat: "'Montserrat', sans-serif",
        Raleway: "'Raleway', sans-serif",
      },
      backgroundImage: {
        "devdistrict-banner":
          "linear-gradient(to right bottom, rgba(0,0,0,1), rgba(0,0,0,0.4)), url('../public/images/devdistrict_banner.png')",
      },
    },
  },
  plugins: [],
};
export default config;
