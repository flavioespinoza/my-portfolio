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
        white: 'hsl(0, 0%, 100%)',
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
    },
    colors: {
      main: '#FAFAFA',
      green: '#C9FCC0',
      'light-gray': '#CCCAC0',
      gray: '#F2F2F2',
      slate: '#F5F5F5',
      cement: '#AEB3B7',
      charcoal: '#292D2A',
      black: '#000000'
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