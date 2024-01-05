import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectSection, SelectItem, Textarea, User } from "@nextui-org/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ToastNotification from "../Common/ToastNotification";

export default function NewAssignmentModal({ isOpen, setIsOpen, onModalSubmit }) {
	const [contentType, setContentType] = useState(new Set([]));
	const { id } = useParams();
	const [assignment, setAssignment] = useState({
		CourseId: id,
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

	const handleChange = (e, fieldName) => {
		const { value } = e.target;

		setAssignment((prev) => ({ ...prev, [fieldName]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`http://localhost:3001/api/v1/admin/assignments/create`, assignment, { withCredentials: true });
			setIsOpen(false);

			setAssignment({
				CourseId: id,
				AssignmentName: "",
				Deadline: "",
				Description: "",
				Content: "",
				ContentType: "",
			});

			if (typeof onModalSubmit === "function") {
				onModalSubmit();
			}
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

	useEffect(() => {
		if (!isOpen) {
			setContentType(new Set([]));
		}
	}, [isOpen]);

	return (
		<>
			<Modal className="dark text-white" backdrop="blur" size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<form onSubmit={handleSubmit}>
								<ModalHeader className="flex flex-col gap-1">
									<p className="text-xl font-bold">New Assignment</p>
									<p className="text-default-600 text-sm font-thin">Create a new assignment by filling in the required information.</p>
								</ModalHeader>
								<ModalBody>
									<div className="flex gap-4">
										<Input autoFocus label="Assignment Name" radius="lg" isRequired value={assignment.AssignmentName} onChange={(e) => handleChange(e, "AssignmentName")} />
										<Input label="Due Date" radius="lg" isRequired value={assignment.Deadline} onChange={(e) => handleChange(e, "Deadline")} />
									</div>
									<Textarea label="Description" radius="lg" value={assignment.Description} onChange={(e) => handleChange(e, "Description")} />
									<Select label="Content Type" radius="lg" isRequired onSelectionChange={setContentType} value={assignment.ContentType} onChange={(e) => handleChange(e, "ContentType")}>
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
									{contentType.anchorKey === "video" && <Input label="Video URL" radius="lg" isRequired value={assignment.Content} onChange={(e) => handleChange(e, "Content")} />}
									{contentType.anchorKey === "text" && <Textarea label="Text" radius="lg" isRequired value={assignment.Content} onChange={(e) => handleChange(e, "Content")} />}
									{contentType.anchorKey === "link" && <Input label="Link URL" radius="lg" isRequired value={assignment.Content} onChange={(e) => handleChange(e, "Content")} />}
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
