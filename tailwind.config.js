/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#405189",
        grays: "#212529",
        cheader: "#292e32",
        searchb: "#f3f3f9",
        searchbd: "#212529",
        btnhover: "#e1ebfd",
        btnhoverd: "#31363c",
        drophead: "#405189",
        darkcontent:"#1a1d21",
        tablebtn: "#0ab39c",
        tablebtnh: "#099885",
        loginc: "#212529",
        sitemap: "#f3f6f9",
        chatd: "#1d3a3a",
        chat:"#daf4f0",
        folder: "#f7b84b",
        checkbox: "#f06548",
        filebox: "#282b2e",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        deleteModal: {
          '0%': { 
            transform: 'scale(0.5)',
            opacity: '0'
          },
          '50%': {
            transform: 'scale(1.05)',
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        iconBounce: {
          '0%': { 
            transform: 'scale(0) rotate(-45deg)',
            opacity: '0'
          },
          '50%': { 
            transform: 'scale(1.2) rotate(5deg)',
          },
          '100%': { 
            transform: 'scale(1) rotate(0)',
            opacity: '1'
          }
        },
        deleteBtn: {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        deleteModal: 'deleteModal 0.4s ease-out',
        iconBounce: 'iconBounce 0.5s ease-out',
        deleteBtn: 'deleteBtn 0.3s ease-out 0.2s forwards'
      }
    },
  },
  plugins: [],
}

