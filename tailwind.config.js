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
      animation: {
      fakeFade: 'fakeAnimation 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeOut: 'fadeOut 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeOutUp: 'fadeOutUp 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeIn: 'fadeIn 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeInUp: 'fadeInUp 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeInDown: 'fadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      fadeOutDown: 'fadeOutDown 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      longFadeInDown: 'longFadeInDown 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards !important',
      longFadeInUp: 'longFadeInUp 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards !important',
      longFadeInUp: 'longFadeInUp 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards !important',
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