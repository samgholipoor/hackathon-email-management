/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes["light"],
          primary: "#6522ba",
        },
      },
    ],
  },
  plugins: [daisyui],
};
