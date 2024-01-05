import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { InformationIcon } from "./Icons";

const ToastNotification = ({ message, onClose }) => {
	const controls = useAnimation();

	useEffect(() => {
		controls.start({ opacity: 1, y: 0 });

		const timer = setTimeout(() => {
			controls.start({ opacity: 0, y: "-100%" }).then(() => {
				setTimeout(() => {
					onClose();
				}, 500);
			});
		}, 3000);

		return () => clearTimeout(timer);
	}, [controls, onClose]);

	return (
		<motion.div initial={{ opacity: 0, y: "-100%" }} animate={controls} className="fixed bottom-0 right-0 mb-4 mr-4 bg-default-50 text-white py-4 px-4 rounded-md shadow-md flex back z-[60]">
			<InformationIcon className="w-6 mr-2" />
			<p>{message}</p>
		</motion.div>
	);
};

export default ToastNotification;
