/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: 'var(--primary-color)',
			dark: '#ff0000',  // red for dark mode
			light: '#ffa500', // orange for light mode
		  },
		  background: {
			DEFAULT: 'var(--background-color)',
			dark: '#000000',
			light: '#ffffff',
		  },
		  text: {
			DEFAULT: 'var(--text-color)',
			dark: '#ffffff',
			light: '#000000',
		  },
		},
		fontFamily: {
		  sans: ['Arial', 'sans-serif'],
		},
	  },
	},
	plugins: [],
  }