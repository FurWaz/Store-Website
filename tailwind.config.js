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
            },
            transitionTimingFunction: {
                'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            }
        },
    },
    plugins: [],
}

