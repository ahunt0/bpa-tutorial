import React, { useEffect, useState } from "react";
import AdminBase from "./AdminBase";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Select,
	SelectSection,
	SelectItem,
	Button,
	User,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Pagination,
	Spinner,
} from "@nextui-org/react";
import { SearchIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon, BookOpenIcon } from "../Common/Icons";
import NewCourseModal from "./NewCourseModal";
import axios from "axios";
import ToastNotification from "../Common/ToastNotification";

export default function Courses() {
	const grades = ["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [courses, setCourses] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [selectedGrade, setSelectedGrade] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 8; // Results per page
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false); // Loading state
	const [showToast, setShowToast] = useState(false);

	const showToastMessage = () => {
		setShowToast(true);
	};

	const onOpen = () => {
		setIsModalOpen(true);
	};

	const fetchCoursesData = async () => {
		try {
			setLoading(true);
			const endpoint = `http://localhost:3001/api/v1/admin/courses/find/${searchInput}?grade=${selectedGrade}`;
			const response = await axios.get(endpoint, { withCredentials: true });
			setCourses(response.data.courses);
			const totalPagesCount = Math.ceil(response.data.courses.length / pageSize);
			setTotalPages(totalPagesCount);
		} catch (error) {
			console.error("Error fetching courses:", error);
			setCourses([]);
			setTotalPages(0);
		} finally {
			setLoading(false);
		}
	};

	const deleteCourse = async (courseId) => {
		try {
			const response = await axios.delete(`http://localhost:3001/api/v1/admin/course/delete/${courseId}`, { withCredentials: true });
			console.log(response);
			fetchCoursesData();
			showToastMessage();
		} catch (error) {
			console.error("Error deleting course:", error);
		}
	};

	useEffect(() => {
		fetchCoursesData();
	}, [searchInput, selectedGrade]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = currentPage + pageSize;
	const displayedCourses = courses.slice(startIndex, endIndex);

	return (
		<AdminBase>
			<div>
				<div className="flex mb-4 bg-default-50 p-4 rounded-xl justify-between">
					<div className="flex">
						<Input
							className="w-96 mr-4"
							placeholder="Search for course..."
							size="sm"
							radius="lg"
							fullWidth={false}
							startContent={<SearchIcon className={"w-5 text-default-600"} />}
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<Select label="Grade" className="w-52" size="sm" radius="lg" value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
							<SelectSection className="w-48" title="Grades">
								{grades.map((grade) => (
									<SelectItem key={grade} value={grade}>
										{grade}
									</SelectItem>
								))}
							</SelectSection>
						</Select>
					</div>
					<Button className="h-12" color="primary" variant="shadow" radius="lg" onClick={onOpen}>
						New Course
					</Button>
				</div>
				<Table className="w-full">
					<TableHeader>
						<TableColumn>ID</TableColumn>
						<TableColumn>NAME</TableColumn>
						<TableColumn>TEACHER</TableColumn>
						<TableColumn>DESCRIPTION</TableColumn>
						<TableColumn>GRADE</TableColumn>
						<TableColumn>ACTIONS</TableColumn>
					</TableHeader>
					<TableBody emptyContent="No courses found." isLoading={loading} loadingContent={<Spinner />}>
						{displayedCourses.map((course) => (
							<TableRow key={course.CourseId}>
								<TableCell>{course.CourseId}</TableCell>
								<TableCell>{course.CourseName}</TableCell>
								<TableCell>{course.Teacher ? <User name={`${course.Teacher.FirstName} ${course.Teacher.LastName}`} description={course.Teacher.Email} /> : <span>No Teacher</span>}</TableCell>
								<TableCell className="text-foreground-400 font-mono">{course.Description}</TableCell>
								<TableCell>{course.Grade}</TableCell>
								<TableCell>
									<Dropdown className="dark">
										<DropdownTrigger>
											<Button isIconOnly size="sm" variant="light">
												<EllipsisHorizontalIcon className="text-default-400" />
											</Button>
										</DropdownTrigger>
										<DropdownMenu>
											<DropdownItem href={`/admin/course/${course.CourseId}`} className="text-default-600">
												<div className="flex">
													<PencilIcon className="w-4 mr-2" />
													Edit
												</div>
											</DropdownItem>
											<DropdownItem href={`/admin/assignments/${course.CourseId}`} className="text-default-600">
												<div className="flex">
													<BookOpenIcon className="w-4 mr-2" />
													Manage
												</div>
											</DropdownItem>
											<DropdownItem className="text-danger">
												<div onClick={() => deleteCourse(course.CourseId)} className="flex">
													<TrashIcon className="w-4 mr-2" />
													Delete
												</div>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<NewCourseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onModalSubmit={fetchCoursesData} />

			{showToast && <ToastNotification message="Course deleted successfully" onClose={() => setShowToast(false)} />}

			{totalPages > 1 && <Pagination className="absolute bottom-8" showControls="true" total={totalPages} current={currentPage} onChange={handlePageChange} />}
		</AdminBase>
	);
}
