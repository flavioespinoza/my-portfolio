import fluid, { extract, fontSize, screens } from 'fluid-tailwind'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
	content: {
		files: [
			'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/**/*.{js,ts,jsx,tsx}'
		],
		extract
	},
	darkMode: ['class'],
	theme: {
		screens, // Fluid Tailwind's default screens, in `rem`
		fontSize, // Fluid Tailwind's default font sizes, in `rem` (including line heights)
		extend: {
			fontFamily: {
				sans: ['var(--font-inter)', ...fontFamily.sans]
			},
			colors: {
				sage: {
					'50': 'hsl(120, 5%, 96%)',
					'100': 'hsl(84, 10%, 90%)',
					'200': 'hsl(82, 8%, 80%)',
					'300': 'hsl(92, 8%, 67%)',
					'400': 'hsl(93, 7%, 51%)',
					'500': 'hsl(95, 9%, 39%)',
					'600': 'hsl(99, 11%, 30%)',
					'700': 'hsl(100, 10%, 24%)',
					'800': 'hsl(100, 9%, 20%)',
					'900': 'hsl(97, 10%, 16%)',
					'950': 'hsl(105, 9%, 9%)'
				},
				hotpink: {
					'50': 'hsl(0, 71%, 97%)',
					'100': 'hsl(357, 78%, 95%)',
					'200': 'hsl(357, 73%, 90%)',
					'300': 'hsl(355, 74%, 82%)',
					'400': 'hsl(354, 73%, 71%)',
					'500': 'hsl(353, 68%, 60%)',
					'600': 'hsl(350, 59%, 50%)',
					'700': 'hsl(348, 63%, 41%)',
					'800': 'hsl(346, 62%, 35%)',
					'900': 'hsl(344, 57%, 30%)',
					'950': 'hsl(346, 68%, 16%)'
				},
				cblue: {
					'50': 'hsl(0, 0%, 100%)',
					'100': 'hsl(214, 70%, 96%)',
					'200': 'hsl(213, 97%, 87%)',
					'300': 'hsl(213, 100%, 87%)',
					'400': 'hsl(214, 100%, 77%)',
					'500': 'hsl(213, 97%, 69%)',
					'600': 'hsl(213, 90%, 62%)',
					'700': 'hsl(213, 83%, 57%)',
					'800': 'hsl(214, 78%, 49%)',
					'900': 'hsl(213, 71%, 42%)',
					'950': 'hsl(213, 63%, 30%)'
				},
				white: 'hsl(0, 0%, 100%)',
				main: '#FAFAFA',
				green: '#34da60',
				'light-gray': '#e9e8eb',
				gray: '#F2F2F2',
				slate: '#F5F5F5',
				cement: '#AEB3B7',
				charcoal: '#292D2A',
				black: '#000000',
				'light-blue': '#bfdbff',
				'light-green': '#E8F5E9',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				'background-sidenav': 'var(--background-sidenav)',
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)'
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)'
				},
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				chart: {
					'1': 'var(--chart-1)',
					'2': 'var(--chart-2)',
					'3': 'var(--chart-3)',
					'4': 'var(--chart-4)',
					'5': 'var(--chart-5)'
				}
			},
			borderRadius: {
				'60': '60px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/container-queries'),
		fluid
	]
}

export default config
