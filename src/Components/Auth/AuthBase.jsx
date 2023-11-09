import React from "react";

export default function AuthBase({ children }) {
	return <div className="dark w-full lg:w-2/5 h-screen bg-default-50 text-white flex items-center justify-center">{children}</div>;
}
