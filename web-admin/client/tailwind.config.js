export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				h1: ["1.125rem"],
			},
			lineHeight: {
				h1: ["1.2"],
			},
			textColor: {
				RiverBed: ["#42526E"],
				LavenderPurple: ["#9284B6"],
			},
			backgroundColor: {
				Neutral10: ["#FAFBFC"],
				NeutralAlpha: ["rgba(9, 30, 66, 0.04)"],
			},
		},
	},
	plugins: [],
};
