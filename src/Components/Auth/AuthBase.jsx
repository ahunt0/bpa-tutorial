import React from "react";
import background from "../../Assets/Images/background-light.png";
import { ReactComponent as Logo } from "../../Assets/Images/Logo.svg";

export default function AuthBase({ children }) {
	return (
		<>
			<style>{`
			body {
				background-image: url(${background});
			}
		`}</style>
			<div className="dark w-full lg:w-2/5 h-screen bg-default-50 text-white flex items-center justify-center">{children}</div>
			<Logo className="absolute bottom-4 right-4 w-28 fill-white" />
		</>
	);
}
