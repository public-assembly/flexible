/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        background: 'hsl(var(--background) / 1)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
      },
      borderRadius: {
        'object': 'var(--border-radius-object)',
        'button': 'var(--border-radius-button)',
      },
      data: {
        open: 'state="open"',
        closed: 'state="closed"',
        bottom: 'side="bottom"',
        top: 'side="top"',
      },
      animation: {
        // Dropdown menu
      "scale-in": "scale-in 0.2s ease-in-out",
      "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important",
      "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important",
      fakeFade: 'fakeAnimation 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeOut: 'fadeOut 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeOutUp: 'fadeOutUp 300ms cubic-bezier(0.23, 1, 0.32, 1) !important',
      fadeIn: 'fadeIn 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeInUp: 'fadeInUp 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeInDown: 'fadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1) !important',
      fadeOutDown: 'fadeOutDown 300ms cubic-bezier(0.23, 1, 0.32, 1) !important',
      longFadeInDown: 'longFadeInDown 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ',
      longFadeInUp: 'longFadeInUp 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ',
      longFadeInUp: 'longFadeInUp 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ',
      },
      keyframes: {
        fadeInDown: {
          from: {
            opacity: '0',
            transform: 'translateY(16)',
          },
          to: {
            'opacity': '1',
            'transform': 'translateY(0)',
          }
        },
         // Dropdown menu
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(-16)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          }
        },
        // Drawer
        "enter-from-right": {
          "0%": { transform: "translateX(200px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "enter-from-left": {
          "0%": { transform: "translateX(-200px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "exit-to-right": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(200px)", opacity: 0 },
        },
        "exit-to-left": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-200px)", opacity: 0 },
        },
        fadeOutUp: {
          from: {
            opacity: '1',
            transform: 'translateY(0)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(16)',
          }
        },
        fadeOutDown: {
          from: {
            opacity: '1',
            transform: 'translateY(0)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(-16)',
          }
        },
        longFadeInDown: {
          from: {
            transform: 'translate3d(0, 0%, 0)',
          },
          to: {
            transform: 'translate3d(0, 100%, 0)',
          }
        },
        longFadeInUp: {
          from: {
            transform: 'translate3d(0, 100%, 0)',
          },
          to: {
            transform: 'translate3d(0, 0%, 0)',
          }
        },
        fadeOut: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          
          }
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          
          to: {
            opacity: 1,
          }
        },
        fakeAnimation: {
          from: {
            opacity: 1,
          }
          ,
          to: {
            opacity: 1,
          }
        },
      }
    },
  },
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
    plugins: [
    require("tailwindcss-radix")(),
  ]
}