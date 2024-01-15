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
				'400': '4',
			},
			colors: {
				dark_primary: '#151615', // Your primary color
				dark_secondary: '#24202A',
				dark_accent: 'var(--accent)',
				light_primary: '#3B82F6',
				light_secondary: '#60a5fa',
				light_accent: '#b7a2fb',
			},
			backgroundColor: {

				/** SURFACE COLORS */
				surface_100:  'var(--surface_100)',
				surface_200:  'var(--surface_200)',
				surface_300:  'var(--surface_300)',
				surface_400:  'var(--surface_400)',
				surface_500:  'var(--surface_500)',
				surface_600:  'var(--surface_600)',

				/** DARK THEME MIXED SURFACE COLORS */
				dark_color_surface_mixed_100:  '#1a1625',
				dark_color_surface_mixed_200:  '#2f2b3a',
				dark_color_surface_mixed_300:  '#46424f',
				dark_color_surface_mixed_400:  '#5e5a66',
				dark_color_surface_mixed_500:  '#76737e',
				dark_color_surface_mixed_600:  '#908d96',
			},
		},
	},
plugins: [],
}
