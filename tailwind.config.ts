
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'glass-border': 'hsl(var(--glass-border))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				shopify: {
					DEFAULT: '#00ad6a',
					50: '#e6f7ef',
					100: '#c1ebd9',
					200: '#88d6b3',
					300: '#4fc28c',
					400: '#16ad66',
					500: '#00ad6a',
					600: '#009a5d',
					700: '#008750',
					800: '#006c41',
					900: '#004d2e',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-from-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'chart-grow': {
					'0%': { height: '0', opacity: '0' },
					'100%': { height: 'var(--chart-height)', opacity: '1' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'scale-in-out': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'shine': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'progress': {
					'0%': { width: '0%' },
					'100%': { width: 'var(--progress-width, 100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-in-from-right': 'slide-in-from-right 0.4s ease-out',
				'zoom-in': 'zoom-in 0.3s ease-out',
				'pulse-gentle': 'pulse-gentle 2s infinite ease-in-out',
				'float': 'float 3s infinite ease-in-out',
				'chart-grow': 'chart-grow 0.5s ease-out forwards',
				'float-slow': 'float-slow 6s infinite ease-in-out',
				'scale-in-out': 'scale-in-out 2s infinite ease-in-out',
				'shine': 'shine 2s linear infinite',
				'flicker': 'flicker 3s infinite ease-in-out',
				'progress': 'progress 1.5s ease-out forwards',
			},
			fontFamily: {
				'sf-pro': ['"SF Pro Display"', '"SF Pro"', 'system-ui', 'sans-serif'],
				'sf-mono': ['"SF Mono"', 'monospace'],
			},
			backdropBlur: {
				'xs': '2px',
				'sm': '4px',
				DEFAULT: '8px',
				'lg': '12px',
				'xl': '16px',
				'2xl': '24px',
				'3xl': '32px',
			},
			boxShadow: {
				'monterey': '0 2px 14px rgba(0, 0, 0, 0.06)',
				'monterey-dark': '0 2px 14px rgba(0, 0, 0, 0.25)',
				'monterey-hover': '0 4px 20px rgba(0, 0, 0, 0.1)',
				'monterey-hover-dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
				'monterey-active': '0 1px 3px rgba(0, 0, 0, 0.08)',
				'card-monterey': '0 2px 14px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)',
				'card-monterey-dark': '0 2px 14px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
				'shopify-card': '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)',
				'shopify-card-hover': '0 0 0 1px rgba(63, 63, 68, 0.05), 0 3px 6px 0 rgba(63, 63, 68, 0.15)',
				'shopify-highlight': '0 0 0 2px #00ad6a',
				'shopify-glow': '0 0 15px rgba(0, 173, 106, 0.5)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
