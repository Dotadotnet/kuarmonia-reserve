// استفاده از import
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

export default {
  darkMode: 'class', 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '116': '28rem', 
        '128': '32rem', 
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))', 
      },
      colors: {
        light: '#edf2f9',
        dark: '#152e4d',
        darker: '#12263f',
        // سایر رنگ‌ها
        primary: "#01BC1FD6",
        secondary: "#E4FFEA",
        neutral: "#515151",
      },
      borderRadius: {
        DEFAULT: "10px",
        primary: "1.5rem",
        secondary: "9999px",
      },
      fontSize: {
        tiny: '0.625rem',   // 10px
        small: '0.75rem',   // 12px
        default: '1rem',    // 16px
        big: '1.25rem',     // 20px
        huge: '1.5rem',     // 24px
      },
      padding: {
        primary: "1rem",
        secondary: "1.5rem",
      },
      screens: {
        'xsplus': { 'max': '575px', 'min': '480px' },
        'smplus': { 'max': '640px', 'min': '576px' },
        'mdplus': { 'max': '900px', 'min': '690px' },
        'lgplus': { 'max': '1024px', 'min': '900px' },
        'lgplus2': { 'max': '1100px', 'min': '1024px' },
        'lgplus3': { 'max': '1190px', 'min': '1100px' },
        'xlgplus': { 'max': '1200px', 'min': '1100px' },
        'xxlgplus': { 'max': '1400px', 'min': '1280px' },
        'ulgplus': { 'max': '1600px', 'min': '1440px' },
        'slgplus': { 'max': '1920px', 'min': '1680px' },
        'eslgplus': { 'max': '2560px', 'min': '2048px' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    tailwindScrollbarHide // استفاده از پلاگین به این صورت
  ],
};
