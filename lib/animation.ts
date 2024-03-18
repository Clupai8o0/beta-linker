import { cubicBezier } from "framer-motion";

export const variants = {
	hidden: {
		y: 20,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
	},
	_hidden: {
		y: -20,
		opacity: 0,
	},
	s_visible: {
		y: 0,
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const variants2 = {
	hidden: {
		y: 20,
		opacity: 0,
	},
	s_visible: {
		y: 0,
		opacity: 1,
	},
};

export const transition = (delay?: number, stagger?: number) => {
	return {
		delay,
		staggerChildren: stagger,
		duration: 0.8,
		ease: cubicBezier(0.46, 0.03, 0.52, 0.96),
	};
};
