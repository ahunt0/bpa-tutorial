import React from "react";
import StudentBase from "./StudentBase";

export default function Assignment() {
	return (
		<StudentBase>
			<div className="container mx-auto mt-8">
				<h1 className="font-bold text-3xl mb-2">Course Name</h1>
				<h3 className="font-medium text-xl text-default-500 mb-24">Description</h3>
				{/* Assignments */}
				<div className="flex flex-row gap-32">
					<div className="flex-col bg-white rounded-t-md rounded-b-md max-w-md max-h-[355px] overflow-y-scroll shadow-md">
						<div className="p-4 border-b-1 border-b-default-200 hover:bg-[#F3F3FC] hover:cursor-pointer ease-in-out duration-100 hover:border-l-4 hover:border-l-[#7DABDE]">
							<h2 className="font-bold text-lg mb-2">Assignment Name</h2>
							<p className="font-semibold text-sm text-default-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						{/* Selected */}
						<div className="p-4 border-b-1 border-b-default-200 hover:bg-[#F3F3FC] hover:cursor-pointer ease-in-out duration-100 border-l-4 border-l-[#7DABDE] bg-[#F3F3FC]">
							<h2 className="font-bold text-lg mb-2">Assignment Name</h2>
							<p className="font-bold text-sm text-default-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						{/* End Selected */}
						<div className="p-4 border-b-1 border-b-default-200 hover:bg-[#F3F3FC] hover:cursor-pointer ease-in-out duration-100 hover:border-l-4 hover:border-l-[#7DABDE]">
							<h2 className="font-bold text-lg mb-2">Assignment Name</h2>
							<p className="font-semibold text-sm text-default-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="p-4 hover:bg-[#F3F3FC] hover:cursor-pointer ease-in-out duration-100 hover:border-l-4 hover:border-l-[#7DABDE]">
							<h2 className="font-bold text-lg mb-2">Assignment Name</h2>
							<p className="font-semibold text-sm text-default-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="p-4 hover:bg-[#F3F3FC] hover:cursor-pointer ease-in-out duration-100 hover:border-l-4 hover:border-l-[#7DABDE]">
							<h2 className="font-bold text-lg mb-2">Assignment Name</h2>
							<p className="font-semibold text-sm text-default-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					{/* End Assignments */}
					{/* Content Container */}
					<div className="flex-col rounded-lg bg-white w-[900px] h-[512px]">
						<div className="p-10">
							<h1 className="font-semibold text-lg text-default-800">Assignment Name</h1>
							<h2 className="font-medium text-default-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
						</div>
					</div>
					{/* End Content Container */}
				</div>
			</div>
		</StudentBase>
	);
}
