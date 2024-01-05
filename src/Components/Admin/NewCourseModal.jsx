import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectSection, SelectItem, Textarea, User } from "@nextui-org/react";
import axios from "axios";
import ToastNotification from "../Common/ToastNotification";

export default function NewCourseModal({ isOpen, setIsOpen, onModalSubmit }) {
	const grades = ["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
	const [teachers, setTeachers] = useState([]);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const showToastMessage = () => {
		setShowToast(true);
	};

	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const response = await fetch("http://localhost:3001/api/v1/admin/users/find?role=teacher", { credentials: "include" });
				const data = await response.json();
				setTeachers(data.users);
			} catch (error) {
				console.error("Error fetching teachers:", error);
			}
		};

		fetchTeachers();
	}, []);

	const [course, setCourse] = useState({
		CourseName: "",
		UserId: "",
		Description: "",
		Grade: "",
	});

	const handleChange = (e, fieldName) => {
		const { value } = e.target;

		setCourse((prev) => ({ ...prev, [fieldName]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`http://localhost:3001/api/v1/admin/courses/create`, course, { withCredentials: true });
			setIsOpen(false);

			setCourse({
				CourseName: "",
				UserId: "",
				Description: "",
				Grade: "",
			});

			if (typeof onModalSubmit === "function") {
				onModalSubmit();
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			if (error.response.data.code === 1) {
				setToastMessage("Course name already exists");
				showToastMessage();
			} else if (error.response.data.code === 2) {
				setToastMessage("Teacher already has a course");
				showToastMessage();
			}
		}
	};

	return (
		<>
			<Modal className="dark text-white" backdrop="blur" size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<form onSubmit={handleSubmit}>
								<ModalHeader className="flex flex-col gap-1">
									<p className="text-xl font-bold">New Course</p>
									<p className="text-default-600 text-sm font-thin">Create a new course by filling in the required information.</p>
								</ModalHeader>
								<ModalBody>
									<div className="flex gap-4">
										<Input autoFocus label="Course Name" radius="lg" isRequired value={course.CourseName} onChange={(e) => handleChange(e, "CourseName")} />
										<Select label="Grade" radius="lg" isRequired value={course.Grade} onChange={(e) => handleChange(e, "Grade")}>
											<SelectSection title="Grades">
												{grades.map((grade) => (
													<SelectItem key={grade} value={grade}>
														{grade}
													</SelectItem>
												))}
											</SelectSection>
										</Select>
									</div>
									<Select label="Teacher" radius="lg" isRequired value={course.UserId} onChange={(e) => handleChange(e, "UserId")}>
										<SelectSection title="Teachers">
											{teachers.map((teacher) => (
												<SelectItem key={teacher.UserID} value={teacher.UserID} textValue={`${teacher.FirstName} ${teacher.LastName}`}>
													<User name={`${teacher.FirstName} ${teacher.LastName}`} description={teacher.Email} />
												</SelectItem>
											))}
										</SelectSection>
									</Select>
									<Textarea label="Description" radius="lg" isRequired value={course.Description} onChange={(e) => handleChange(e, "Description")} />
								</ModalBody>
								<ModalFooter>
									<Button color="default" variant="flat" onPress={() => setIsOpen(false)}>
										Close
									</Button>
									<Button color="primary" type="submit">
										Create Course
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
			{showToast && <ToastNotification message={`Error: ${toastMessage}`} onClose={() => setShowToast(false)} />}
		</>
	);
}
