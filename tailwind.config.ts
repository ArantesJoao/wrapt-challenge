import type { Config } from 'tailwindcss'

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"], // this makes "Open Sans" the default sans font
        karla: ["Karla", "sans-serif"], // this adds a 'karla' font family which can be used with `font-karla` class
      },
    },
  },
  plugins: [],
}
export default config
