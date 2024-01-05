import React, { useEffect, useState } from "react";
import AdminBase from "./AdminBase";
import { Card, CardBody, Input, Button, Textarea, Select, SelectSection, SelectItem, User, Spinner } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ToastNotification from "../Common/ToastNotification";

export default function AssignmentEdit() {
	const [contentType, setContentType] = useState(new Set([]));
	const { id } = useParams();
	const [assignment, setAssignment] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		AssignmentName: "",
		Deadline: "",
		Description: "",
		Content: "",
		ContentType: "",
	});

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const showToastMessage = () => {
		setShowToast(true);
	};

	useEffect(() => {
		const fetchAssignment = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/api/v1/admin/assignment/${id}`, { withCredentials: true });
				setAssignment(response.data.assignment);

				if (response.data.assignment) {
					const { AssignmentName, Deadline, Description, Content, ContentType } = response.data.assignment;
					setFormData({
						AssignmentName: AssignmentName || "",
						Deadline: Deadline || "",
						Description: Description || "",
						Content: Content || "",
						ContentType: ContentType || "",
					});
					setContentType(ContentType);
				}
			} catch (error) {
				setError("Assignment not found");
			}
		};

		fetchAssignment();
	}, [id]);

	const handleInputChange = (e) => {
		// If content type is changed, empty out content
		if (e.target.name === "ContentType") {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
				Content: "",
			});
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.put(`http://localhost:3001/api/v1/admin/assignment/edit/${id}`, formData, { withCredentials: true });
			setToastMessage("Assignment updated successfully");
			showToastMessage();
		} catch (error) {
			console.error("Error submitting form:", error);
			if (error.response.data.code === 1) {
				setToastMessage("Assignment name already exists");
				showToastMessage();
			} else {
				setToastMessage("Something went wrong");
				showToastMessage();
			}
		}
	};

	return (
		<AdminBase>
			<div className="justify-center space-x-8">
				<Card className="p-4">
					<CardBody>
						<form onSubmit={handleSubmit}>
							{assignment ? (
								<>
									<div className="flex space-x-4">
										<Input
											className="mb-4"
											label="Assignment Name"
											placeholder="Enter assignment name"
											fullWidth
											value={formData.AssignmentName}
											onChange={handleInputChange}
											name="AssignmentName"
										></Input>
										<Input className="mb-4" label="Due Date" placeholder="Enter due date" fullWidth value={formData.Deadline} onChange={handleInputChange} name="Deadline"></Input>
									</div>
									<Textarea className="mb-4" label="Description" placeholder="Enter description" fullWidth value={formData.Description} onChange={handleInputChange} name="Description"></Textarea>
									<Select
										className="mb-4"
										label="Content Type"
										placeholder="Select content type"
										value={formData.ContentType}
										onChange={handleInputChange}
										onSelectionChange={setContentType}
										selectedKeys={[`${formData.ContentType}`]}
										name="ContentType"
									>
										<SelectSection title="Content Types">
											<SelectItem key="video" value="video">
												Video
											</SelectItem>
											<SelectItem key="text" value="text">
												Text
											</SelectItem>
											<SelectItem key="link" value="link">
												Link
											</SelectItem>
										</SelectSection>
									</Select>
									{formData.ContentType === "video" && (
										<Input className="mb-4" label="Content" placeholder="Enter content" fullWidth value={formData.Content} onChange={handleInputChange} name="Content" />
									)}
									{formData.ContentType === "text" && (
										<Textarea className="mb-4" label="Content" placeholder="Enter content" fullWidth value={formData.Content} onChange={handleInputChange} name="Content" />
									)}
									{formData.ContentType === "link" && (
										<Input className="mb-4" label="Content" placeholder="Enter content" fullWidth value={formData.Content} onChange={handleInputChange} name="Content" />
									)}
									<Button color="primary" variant="shadow" type="submit">
										Save
									</Button>
									<p className="absolute bottom-0 right-0 text-sm text-default-500">AID • {assignment.AssignmentID}</p>
								</>
							) : error ? (
								<p>Assignment not found</p>
							) : (
								<Spinner />
							)}
						</form>
					</CardBody>
				</Card>
			</div>
			{showToast && <ToastNotification message={toastMessage} onClose={() => setShowToast(false)} />}
		</AdminBase>
	);
}
