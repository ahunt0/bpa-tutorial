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
	Tab,
} from "@nextui-org/react";
import { SearchIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon, BookOpenIcon } from "../Common/Icons";
import NewAssignmentModal from "./NewAssignmentModal";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Assignments() {
	const { id } = useParams();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [assignments, setAssignments] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 8; // Results per page
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false); // Loading state

	const onOpen = () => {
		setIsModalOpen(true);
	};

	const fetchAssignmentsData = async () => {
		try {
			setLoading(true);
			const endpoint = searchInput ? `http://localhost:3001/api/v1/admin/assignments/find/${searchInput}` : `http://localhost:3001/api/v1/admin/assignments/${id}`;
			const response = await axios.get(endpoint, { withCredentials: true });
			setAssignments(response.data.assignments);
			const totalPagesCount = Math.ceil(response.data.assignments.length / pageSize);
			setTotalPages(totalPagesCount);
		} catch (error) {
			console.error("Error fetching assignments:", error);
			setAssignments([]);
			setTotalPages(0);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAssignmentsData();
	}, [searchInput]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = currentPage + pageSize;
	const displayedAssignments = assignments.slice(startIndex, endIndex);

	return (
		<AdminBase>
			<div>
				<div className="flex mb-4 bg-default-50 p-4 rounded-xl justify-between">
					<div className="flex">
						<Input
							className="w-96 mr-4"
							placeholder="Search for assignment..."
							size="sm"
							radius="lg"
							fullWidth={false}
							startContent={<SearchIcon className={"w-5 text-default-600"} />}
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
					</div>
					<Button className="h-12" color="primary" variant="shadow" radius="lg" onClick={onOpen}>
						New Assignment
					</Button>
				</div>
				<Table className="w-full">
					<TableHeader>
						<TableColumn>ID</TableColumn>
						<TableColumn>NAME</TableColumn>
						<TableColumn>DUE DATE</TableColumn>
						<TableColumn>DESCRIPTION</TableColumn>
						<TableColumn>CONTENT TYPE</TableColumn>
						<TableColumn>ACTIONS</TableColumn>
					</TableHeader>
					<TableBody emptyContent="No assignments found." isLoading={loading} loadingContent={<Spinner />}>
						{displayedAssignments.map((assignment) => (
							<TableRow key={assignment.AssignmentID}>
								<TableCell>{assignment.AssignmentID}</TableCell>
								<TableCell>{assignment.AssignmentName}</TableCell>
								<TableCell>{new Date(assignment.Deadline).toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })}</TableCell>
								<TableCell className="text-foreground-400 font-mono">{assignment.Description}</TableCell>
								<TableCell className="capitalize">{assignment.ContentType}</TableCell>
								<TableCell>
									<Dropdown className="dark">
										<DropdownTrigger>
											<Button isIconOnly size="sm" variant="light">
												<EllipsisHorizontalIcon className="text-default-400" />
											</Button>
										</DropdownTrigger>
										<DropdownMenu>
											<DropdownItem className="text-default-600">
												<div className="flex">
													<PencilIcon className="w-4 mr-2" />
													Edit
												</div>
											</DropdownItem>
											<DropdownItem className="text-default-600">
												<div className="flex">
													<BookOpenIcon className="w-4 mr-2" />
													View
												</div>
											</DropdownItem>
											<DropdownItem className="text-danger">
												<div className="flex">
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
			<NewAssignmentModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onModalSubmit={fetchAssignmentsData} />
			{totalPages > 1 && <Pagination className="absolute bottom-8" showControls="true" total={totalPages} current={currentPage} onChange={handlePageChange} />}
		</AdminBase>
	);
}
