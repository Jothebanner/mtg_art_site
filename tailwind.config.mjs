/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			scale: {
				'175': '1.75',
				'200': '2',
				'250': '2.5',
				'300': '3',
			},
			colors: {
				dark_primary: '#151615', // Your primary color
				// dark_secondary: '#282728', // Your secondary color
				dark_secondary: '#24202A',
				dark_accent: '#3f3f3f', // Your accent color
				light_primary: '#3B82F6',
				light_secondary: '#60a5fa',
				light_accent: '#b7a2fb',
			},
			backgroundColor: {
				light: '#3B82F6',
				light_secondary: '#60a5fa',
				dark: '#151615',
				// dark_secondary: '#282728',
				dark_secondary: '#24202A',
			},
		},
	},
	plugins: [],
}
