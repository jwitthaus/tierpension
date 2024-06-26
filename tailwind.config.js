/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark-blue": "#243380",
        "weekend-header": "#d7e6f3",
        "workday-header": "#eaeaea",
        "today-header": "#243380",
        "weekend-column": "#e9f1f8",
        "today-column": "#d0e4ff",
        success: "#87EA32",
        failed: "#FE5019",
      },
    },
  },
  plugins: [],
};
