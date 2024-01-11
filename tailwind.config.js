const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				shark: {
					50: "#d1d7d7",
					100: "#c9c9cf",
					200: "#b3b5bd",
					300: "#9195a1",
					400: "#6c727f",
					500: "#50545e",
					600: "#3b3e45",
					700: "#2a2c32",
					800: "#1f2123",
					900: "#18191b",
					950: "#1c1e21",
				},
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
