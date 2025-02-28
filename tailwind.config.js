/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors:{
        colorPrimary: '#3377F1',
        colorBlueText: '#303972',
        colorsecundary: '#273142',
        colorsecundaryhover: '#232C3B',
        colorSuccess: '#04CE5B',
        colorAlert: '#EE5755',
        colorBgDark: '#1B2431',
        colorGray: '#858E9D',
        colorTextLight : '#323943',
        colorBgInput: '#F5F6FA',
        colorText333: '#333333',
        colorTextGeneral: '#202224',
        colorBorderButtonLigth: '#D5D5D5',
        colorBorderButtonDark: '#323D4E',
      },
    },
  },
  plugins: [
      require('flowbite/plugin')
  ],
  darkMode: "class",
}

