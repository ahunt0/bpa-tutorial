import React from "react";
import StudentBase from "./StudentBase";
import { motion } from "framer-motion";

export default function StudentCourses() {
	// Dummy data for courses
	const courses = [
		{ id: 1, title: "Course 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", teacher: "John Doe" },
		{ id: 2, title: "Course 2", description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", teacher: "Jane Smith" },
		{ id: 3, title: "Course 3", description: "Fusce vitae justo sed felis condimentum varius.", teacher: "Bob Johnson" },
		{ id: 4, title: "Course 4", description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.", teacher: "Sarah Williams" },
		{ id: 5, title: "Course 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", teacher: "John Doe" },
		{ id: 6, title: "Course 6", description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", teacher: "Jane Smith" },
		{ id: 7, title: "Course 7", description: "Fusce vitae justo sed felis condimentum varius.", teacher: "Bob Johnson" },
		{ id: 8, title: "Course 8", description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.", teacher: "Sarah Williams" },
	];

	return (
		<StudentBase>
			<div className="container mx-auto mt-8">
				<h1 className="font-bold text-3xl mb-8">Your Courses</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{courses.map((course) => (
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.9 }}
							key={course.id}
							className="bg-white p-6 rounded-lg shadow-md hover:bg-[#F3F3FC] hover:cursor-pointer ease-in-out duration-200 relative"
						>
							<h2 className="font-bold text-xl">{course.title}</h2>
							<h3 className="font-medium text-sm text-default-400 mb-4">{course.teacher}</h3>
							<p className="font-medium text-gray-600">{course.description}</p>
							{/* Add more course details or actions as needed */}
						</motion.div>
					))}
				</div>
			</div>
		</StudentBase>
	);
}
