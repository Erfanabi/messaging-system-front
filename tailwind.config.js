const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(button|checkbox|input|ripple|spinner|form).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      themes: {
        light: {
          layout: {},
          colors: {
            primary: {
              DEFAULT: "#D3B677",
              // 50: "#faf7f2",
              // 100: "#f2ece2",
              // 200: "#e5d8c3",
              // 300: "#d4be9d",
              // 400: "#c5a47e",
              // 500: "#b4875b",
              // 600: "#a7744f",
              // 700: "#8b5e43",
              // 800: "#714e3b",
              // 900: "#5c4132",
              // 950: "#312019",
            },
          },
        },
      },
    }),
  ],
};
