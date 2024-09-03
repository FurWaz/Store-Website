/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                "prim-1": "#e46b19",
                "prim-2": "#d54355",
                "prim-3": "#8d3a6d",
                "prim-4": "#4e3a65"
            }
        },
    },
    plugins: [],
}

