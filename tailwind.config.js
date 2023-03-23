const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
   future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      // Allows the use of the font-sans, font-body, font-caption utility class to apply the font to any element
      fontFamily: {
        sans: ["var(--headline)", "var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
        body: ["var(--body)", "var(--font-space-mono)", ...defaultTheme.fontFamily.sans],
        caption: ["var(--caption)", ...defaultTheme.fontFamily.mono],
        satoshi: ["var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
        headline: ["var(--headline)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        current: "currentColor",
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        background: "hsl(var(--color-background) / 1",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: ["rgb(var(--color-tertiary) / <alpha-value>)", "#809aa3"],
        highlight: ["rgb(var(--color-highlight) / <alpha-value>)", "#c5fc6b"],
      },
      borderRadius: {
        object: "var(--border-radius-object)",
        button: "var(--border-radius-button)",
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
        "slide-down":
          "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important",
        fakeFade: "fakeAnimation 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        fadeOut: "fadeOut 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        fadeOutUp: "fadeOutUp 300ms cubic-bezier(0.23, 1, 0.32, 1) !important",
        fadeIn: "fadeIn 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        fadeInUp: "fadeInUp 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        fadeInDown:
          "fadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1) !important",
        fadeOutDown:
          "fadeOutDown 300ms cubic-bezier(0.23, 1, 0.32, 1) !important",
        longFadeInDown:
          "longFadeInDown 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ",
        longFadeInUp:
          "longFadeInUp 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ",
        longFadeInUp:
          "longFadeInUp 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ",
        slideInFromRight:
          "enter-from-right 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ",
        slideOutToRight:
          "enter-to-right 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards ",
        // Navigation menu
        "enter-from-right": "enter-from-right 0.25s ease",
        "enter-from-left": "enter-from-left 0.25s ease",
        "exit-to-right": "exit-to-right 0.25s ease",
        "exit-to-left": "exit-to-left 0.25s ease",
      },
      keyframes: {
        fadeInDown: {
          from: {
            opacity: "0",
            transform: "translateY(16)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
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
            opacity: "0",
            transform: "translateY(-16)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
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
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateY(16)",
          },
        },
        fadeOutDown: {
          from: {
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-16)",
          },
        },
        longFadeInDown: {
          from: {
            transform: "translate3d(0, 0%, 0)",
          },
          to: {
            transform: "translate3d(0, 100%, 0)",
          },
        },
        longFadeInUp: {
          from: {
            transform: "translate3d(0, 100%, 0)",
          },
          to: {
            transform: "translate3d(0, 0%, 0)",
          },
        },
        fadeOut: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },

          to: {
            opacity: 1,
          },
        },
        fakeAnimation: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 1,
          },
        },
      },
      backgroundImage: {
        "default-auction": "url('/default-auction.svg')",
      },
      boxShadow: ({ theme }) => ({
        glow: "0 0 4px rgb(0 0 0 / 0.1)",
        dropShadow: "var(--shadow-spread)",
        // inspired by https://www.joshwcomeau.com/shadow-palette/
        "surface-glass": `
          inset 0.25px 1px 0 0 ${theme("colors.primary / 3%")},
          0px 0.3px 0.3px rgba(3, 2, 2, 0.02),
          0px 2.2px 2.5px -0.4px rgba(3, 2, 2, 0.02),
          0px 4.3px 4.8px -0.8px rgba(3, 2, 2, 0.02),
          0px 7.5px 8.4px -1.2px rgba(3, 2, 2, 0.02),
          0px 12.8px 14.4px -1.7px rgba(3, 2, 2, 0.02),
          0px 21px 23.6px -2.1px rgba(3, 2, 2, 0.02),
          0px 33.2px 37.4px -2.5px rgba(3, 2, 2, 0.02)`,
        "surface-elevation-low": `
          inset 0.25px 1px 1px 0 ${theme("colors.primary / 1.5%")}, 
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.2),
          0.4px 0.8px 1px -1.2px rgba(3, 2, 2, 0.2),
          1px 2px 2.5px -2.5px rgba(3, 2, 2, 0.2);`,
        "surface-elevation-medium": `
          inset 0.25px 1px 1px 0 ${theme("colors.primary / 3%")},
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.1),
          0.8px 1.6px 2px -0.8px rgba(3, 2, 2, 0.1),
          2.1px 4.1px 5.2px -1.7px rgba(3, 2, 2, 0.1),
          5px 10px 12.6px -2.5px rgba(3, 2, 2, 0.1)`,
        slider: "0 0 0 5px rgba(0, 0, 0, 0.3)",
      }),
      zIndex: {
        "sheet-0": 999,
        "sheet-1": 1000,
        "sheet-2": 1001,
      },
    },
  },
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwindcss-radix")(), require("@tailwindcss/typography")],
}
