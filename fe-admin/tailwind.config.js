/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      placeholderColor: {
        black: "#747474"
      },
      colors: {
        "primary-color": "#0038FF",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          50: "#E4F2FF",
          100: "#CEE5FF",
          200: "#A7CDFF",
          300: "#72ABff",
          400: "#3C78FF",
          500: "#0038FF",
          600: "#001DE1",
          700: "#0019D7",
          800: "#051BAD",
          900: "#0E2186",
          950: "#08114E",
          DEFAULT: "#0038FF",
          foreground: "white"
        },
        warning: {
          50: "#fffdef",
          100: "#fffad1",
          200: "#fff59e",
          300: "#ffea6c",
          400: "#ffe05a",
          500: "#ffc635",
          600: "#ffa209",
          700: "#e17702",
          800: "#b65b0a",
          900: "#974b0c",
          950: "#562600",
          foreground: "#FFFFFF"
        },
        error: {
          50: "#fff3f3",
          100: "#ffe4e4",
          200: "#ffcccc",
          300: "#ffa8a8",
          400: "#ff6868",
          500: "#ff5959",
          600: "#f03131",
          700: "#e00e0e",
          800: "#ba0f0f",
          900: "#9a1515",
          950: "#540505",
          DEFAULT: "#ff5959"
        },
        success: {
          50: "#eefee7",
          100: "#d7fdca",
          200: "#b2fb9b",
          300: "#83f561",
          400: "#5ae932",
          500: "#39d213",
          600: "#26a60a",
          700: "#1f7e0d",
          800: "#1e6311",
          900: "#1c5413",
          950: "#092f04",
          DEFAULT: "#39d213"
        },
        gray: {
          50: "#fefefe",
          100: "#fdfdfd",
          200: "#fbfbfb",
          300: "#f8f8f8",
          400: "#f4f4f4",
          500: "#ebebeb",
          600: "#bfbfbf",
          700: "#9b9b9b",
          800: "#858585",
          900: "#747474",
          950: "#4e4e4e",
          DEFAULT: "#ebebeb"
        },
        black: {
          50: "#efefef",
          100: "#d5d5d5",
          200: "#aeaeae",
          300: "#747474",
          400: "#353535",
          500: "#1a1a1a",
          600: "#161616",
          700: "#242424",
          800: "#101010",
          900: "#0f0f0f",
          950: "#060606",
          DEFAULT: "#1a1a1a"
        },
        secondary: {
          DEFAULT: "#757575",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        loginOutline: {
          default: "#FBFBFB",
          border: "#0038FF"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))"
        }
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"]
      },
      fontSize: {
        "display/2xl/extrabold": [
          "4.5rem",
          {
            lineHeight: "5.375rem",
            letterSpacing: "-0.02em",
            fontWeight: "800"
          }
        ],
        "display/2xl/bold": [
          "4.5rem",
          {
            lineHeight: "5.375rem",
            letterSpacing: "-0.02em",
            fontWeight: "700"
          }
        ],
        "display/2xl/semibold": [
          "4.5rem",
          {
            lineHeight: "5.375rem",
            letterSpacing: "-0.02em",
            fontWeight: "600"
          }
        ],
        "display/2xl/medium": [
          "4.5rem",
          {
            lineHeight: "5.375rem",
            letterSpacing: "-0.02em",
            fontWeight: "500"
          }
        ],
        "display/2xl/regular": [
          "4.5rem",
          {
            lineHeight: "5.375rem",
            letterSpacing: "-0.02em",
            fontWeight: "400"
          }
        ],
        "display/xl/extrabold": [
          "3.75rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.015em",
            fontWeight: "800"
          }
        ],
        "display/xl/bold": [
          "3.75rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.015em",
            fontWeight: "700"
          }
        ],
        "display/xl/semibold": [
          "3.75rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.015em",
            fontWeight: "600"
          }
        ],
        "display/xl/medium": [
          "3.75rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.015em",
            fontWeight: "500"
          }
        ],
        "display/xl/regular": [
          "3.75rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.015em",
            fontWeight: "400"
          }
        ],
        "display/lg/extrabold": [
          "3rem",
          {
            lineHeight: "3.75rem",
            letterSpacing: "-0.015em",
            fontWeight: "800"
          }
        ],
        "display/lg/bold": [
          "3rem",
          {
            lineHeight: "3.75rem",
            letterSpacing: "-0.015em",
            fontWeight: "700"
          }
        ],
        "display/lg/semibold": [
          "3rem",
          {
            lineHeight: "3.75rem",
            letterSpacing: "-0.015em",
            fontWeight: "600"
          }
        ],
        "display/lg/medium": [
          "3rem",
          {
            lineHeight: "3.75rem",
            letterSpacing: "-0.015em",
            fontWeight: "500"
          }
        ],
        "display/lg/regular": [
          "3rem",
          {
            lineHeight: "3.75rem",
            letterSpacing: "-0.015em",
            fontWeight: "400"
          }
        ],
        "display/md/extrabold": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "800"
          }
        ],
        "display/md/bold": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "700"
          }
        ],
        "display/md/semibold": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "600"
          }
        ],
        "display/md/medium": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }
        ],
        "display/md/regular": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "400"
          }
        ],
        "display/sm/extrabold": [
          "1.875rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "-0.01em",
            fontWeight: "800"
          }
        ],
        "display/sm/bold": [
          "1.875rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "-0.01em",
            fontWeight: "700"
          }
        ],
        "display/sm/semibold": [
          "1.875rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "-0.01em",
            fontWeight: "600"
          }
        ],
        "display/sm/medium": [
          "1.875rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }
        ],
        "display/sm/regular": [
          "1.875rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "-0.01em",
            fontWeight: "400"
          }
        ],
        "text/xl/bold": [
          "1.25rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "-0.005em",
            fontWeight: "700"
          }
        ],
        "text/xl/semibold": [
          "1.25rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "-0.005em",
            fontWeight: "600"
          }
        ],
        "text/xl/medium": [
          "1.25rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "-0.005em",
            fontWeight: "500"
          }
        ],
        "text/xl/regular": [
          "1.25rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "-0.005em",
            fontWeight: "400"
          }
        ],
        "text/lg/bold": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.005em",
            fontWeight: "700"
          }
        ],
        "text/lg/semibold": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.005em",
            fontWeight: "600"
          }
        ],
        "text/lg/medium": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.005em",
            fontWeight: "500"
          }
        ],
        "text/lg/regular": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.005em",
            fontWeight: "400"
          }
        ],
        "text/md/bold": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0",
            fontWeight: "700"
          }
        ],
        "text/md/semibold": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0",
            fontWeight: "600"
          }
        ],
        "text/md/medium": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0",
            fontWeight: "500"
          }
        ],
        "text/md/regular": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0",
            fontWeight: "400"
          }
        ],
        "text/sm/bold": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0",
            fontWeight: "700"
          }
        ],
        "text/sm/semibold": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0",
            fontWeight: "600"
          }
        ],
        "text/sm/medium": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0",
            fontWeight: "500"
          }
        ],
        "text/sm/regular": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0",
            fontWeight: "400"
          }
        ],
        "text/xs/bold": [
          "0.75rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.005em",
            fontWeight: "700"
          }
        ],
        "text/xs/semibold": [
          "0.75rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.005em",
            fontWeight: "600"
          }
        ],
        "text/xs/medium": [
          "0.75rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.005em",
            fontWeight: "500"
          }
        ],
        "text/xs/regular": [
          "0.75rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.005em",
            fontWeight: "400"
          }
        ],
        "text/xxs/bold": [
          "0.625rem",
          {
            lineHeight: "0.75rem",
            letterSpacing: "0.01em",
            fontWeight: "700"
          }
        ],
        "text/xxs/semibold": [
          "0.625rem",
          {
            lineHeight: "0.75rem",
            letterSpacing: "0.01em",
            fontWeight: "600"
          }
        ],
        "text/xxs/medium": [
          "0.625rem",
          {
            lineHeight: "0.75rem",
            letterSpacing: "0.01em",
            fontWeight: "500"
          }
        ],
        "text/xxs/regular": [
          "0.625rem",
          {
            lineHeight: "0.75rem",
            letterSpacing: "0.01em",
            fontWeight: "400"
          }
        ]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        "box-shadow": "3px 10px 20px 0px rgba(0, 56, 255, 0.38)"
      },
      animation: {
        scrollDown: "scrollDown 0.5s linear"
      },
      keyframes: {
        scrollDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      }
    }
  },
  plugins: [tailwindcssAnimate]
};
