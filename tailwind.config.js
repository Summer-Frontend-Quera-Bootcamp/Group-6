/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                gray: {
                    primary: "#868E96",
                    secondary: "#F1F3F5",
                    darker: "#343A40",
                },
                red: {
                    primary: "#FA5252",
                    secondary: "#FFE3E3",
                },
                pink: {
                    primary: "#E64980",
                    secondary: "#FFDEEB",
                },
                grape: {
                    primary: "#BE4BDB",
                    secondary: "#F3D9FA",
                },
                violet: {
                    primary: "#7950F2",
                    secondary: "#E5DBFF",
                },
                indigo: {
                    primary: "#4C6EF5",
                    secondary: "#DBE4FF",
                },
                blue: {
                    primary: "#228BE6",
                    secondary: "#D0EBFF",
                },
                cyan: {
                    primary: "#15AABF",
                    secondary: "#C5F6FA",
                },
                teal: {
                    primary: "#12B886",
                    secondary: "#C3FAE8",
                },
                brand: {
                    primary: "#208D8E",
                    secondary: "#C2F7FA",
                },
                green: {
                    primary: "#40C057",
                    secondary: "#D3F9D8",
                },
                lime: {
                    primary: "#82C91E",
                    secondary: "#E9FAC8",
                },
                yellow: {
                    primary: "#FAB005",
                    secondary: "#FFF3BF",
                    darkmode: "#FFC93C",
                },
                orange: {
                    primary: "#FD7E14",
                    secondary: "#FFE8CC",
                    apricot: "#FF9A3C",
                    tangerine: "#FF6F3C",
                },
            },
            spacing: {
                xs: "8px",
                s: "16px",
                m: "24px",
                l: "32px",
                xl: "40px",
            },
            fontSize: {
                "heading-l": "32px",
                "heading-m": "28px",
                "heading-s": "24px",
                "heading-xs": "20px",

                "body-xl": "24px",
                "body-l": "20px",
                "body-m": "16px",
                "body-s": "14px",
                "body-xs": "12px",

                "bold-xl": "24px",
                "bold-l": "20px",
                "bold-m": "16px",
                "bold-s": "14px",
                "bold-xs": "12px",
            },
            boxShadow: {
                card: "0px 50px 100px -20px rgba(50, 50, 93, 0.25), 0px 30px 60px -30px rgba(0, 0, 0, 0.30)",
                themeSwitch:
                    "0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                newTask: "0px 12px 32px 0px rgba(0, 0, 0, 0.25);",
                newTag: "0px 4px 16px 0px rgba(0, 0, 0, 0.16);",
                colorSelector: "0px 4px 8px 0px rgba(0, 0, 0, 0.18);",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            animation: {
                fadeIn: "fadeIn 0.5s ease-in-out",
            },
        },
    },
    plugins: [{ tailwindcss: {}, autoprefixer: {} }],
};
