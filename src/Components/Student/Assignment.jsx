import React from "react";
import StudentBase from "./StudentBase";

export default function Assignment() {
	return (
		<StudentBase>
			<p className="font-bold text-3xl tracking-wide">Assignment Name (Title)</p>
			<p className="text-md text-default-500 mb-4">by (Teacher)</p>
			<p className="text-xl mb-10">Assignment Description</p>
			<p className="text-md text-default-500">Content which will be text/video/link</p>
		</StudentBase>
	);
}
