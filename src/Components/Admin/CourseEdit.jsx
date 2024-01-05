import React, { useEffect, useState } from "react";
import AdminBase from "./AdminBase";
import { Card, CardBody, Input, Button, Textarea, Select, SelectSection, SelectItem, User } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ToastNotification from "../Common/ToastNotification";

export default function CourseEdit() {
	const { id } = useParams();
	const [course, setCourse] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		CourseName: "",
		UserId: "",
		Description: "",
		Grade: "",
	});
	const [teachers, setTeachers] = useState([]);

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const showToastMessage = () => {
		setShowToast(true);
	};

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/api/v1/admin/course/${id}`, { withCredentials: true });
				setCourse(response.data.course);

				if (response.data.course) {
					const { CourseName, UserId, Description, Grade } = response.data.course;
					setFormData({
						CourseName: CourseName || "",
						UserId: UserId || "",
						Description: Description || "",
						Grade: Grade || "",
					});
					console.log(formData);
				}
			} catch (error) {
				setError("Course not found");
			}
		};

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
		fetchCourse();
	}, [id]);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);

		try {
			await axios.put(`http://localhost:3001/api/v1/admin/course/edit/${id}`, formData, { withCredentials: true });

			setToastMessage("Saved successfully");
			showToastMessage();
		} catch (error) {
			console.error("Error editing course:", error);
			if (error.response.data.error.code === 1) {
				setToastMessage("Error editing course: " + error.response.data.error.message);
				showToastMessage();
				return;
			} else {
				setToastMessage("Error editing course");
				showToastMessage();
			}
			console.log(error.response.data);
		}
	};

	return (
		<AdminBase>
			<div className="justify-center space-x-8">
				<Card className="p-4">
					<CardBody>
						<form onSubmit={handleSubmit}>
							{course ? (
								<>
									<div className="flex space-x-4">
										<Input className="mb-4" label="Course Name" placeholder="Enter course name" fullWidth value={formData.CourseName} onChange={handleInputChange} name="CourseName" isRequired />
										<Select label="Teacher" radius="lg" isRequired value={formData.UserId} selectedKeys={[`${formData.UserId}`]} onChange={handleInputChange} name="UserId">
											<SelectSection title="Teachers">
												{teachers.map((teacher) => (
													<SelectItem key={teacher.UserID} value={teacher.UserID} textValue={`${teacher.FirstName} ${teacher.LastName}`}>
														<User name={`${teacher.FirstName} ${teacher.LastName}`} description={teacher.Email} />
													</SelectItem>
												))}
											</SelectSection>
										</Select>
									</div>
									<Textarea
										className="mb-4"
										label="Description"
										placeholder="Enter course description"
										fullWidth
										value={formData.Description}
										onChange={handleInputChange}
										name="Description"
										isRequired
									></Textarea>
									<Select className="mb-4" label="Grade" radius="lg" isRequired value={formData.Grade} selectedKeys={[`${formData.Grade}`]} onChange={handleInputChange} name="Grade">
										<SelectSection title="Grades">
											{["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((grade) => (
												<SelectItem key={grade} value={grade}>
													{grade}
												</SelectItem>
											))}
										</SelectSection>
									</Select>
									<Button color="primary" variant="shadow" type="submit">
										Save
									</Button>
									<p className="absolute bottom-0 right-0 text-sm text-default-500">CID • {course.CourseId}</p>
								</>
							) : error ? (
								<p>{error}</p>
							) : (
								<p>Loading...</p>
							)}
						</form>
					</CardBody>
				</Card>
			</div>
			{showToast && <ToastNotification message={toastMessage} onClose={() => setShowToast(false)} />}
		</AdminBase>
	);
}
