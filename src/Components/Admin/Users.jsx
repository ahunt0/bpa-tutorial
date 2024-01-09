import React, { useState, useEffect } from "react";
import AdminBase from "./AdminBase";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Input,
	Pagination,
	Spinner,
	Select,
	SelectSection,
	SelectItem,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Checkbox,
} from "@nextui-org/react";
import { SearchIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon } from "../Common/Icons";
import axios from "axios";
import ToastNotification from "../Common/ToastNotification";

export default function Users() {
	const [userData, setUserData] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 8; // Results per page
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false); // Loading state
	const [selectedRole, setSelectedRole] = useState(""); // State to capture the selected role
	const [showToast, setShowToast] = useState(false);
	const [showUnassignedStudents, setShowUnassignedStudents] = useState(false);

	const showToastMessage = () => {
		setShowToast(true);
	};

	const fetchUsers = async () => {
		try {
			setLoading(true);
			let response;
			if (showUnassignedStudents) {
				response = await axios.get("http://localhost:3001/api/v1/admin/users/unassigned", { withCredentials: true });
				setUserData(response.data.unassignedStudents);
				const totalPagesCount = Math.ceil(response.data.unassignedStudents.length / pageSize);
				setTotalPages(totalPagesCount);
				return;
			} else {
				let endpoint = "http://localhost:3001/api/v1/admin/users/";

				if (searchInput !== "") {
					endpoint = `http://localhost:3001/api/v1/admin/users/find/${searchInput}`;
					if (selectedRole !== "") {
						// Include role in endpoint if selected
						endpoint += `?role=${selectedRole}`;
					}
				} else if (selectedRole !== "") {
					// Construct the endpoint based on selected role only
					endpoint = `http://localhost:3001/api/v1/admin/users/find?role=${selectedRole}`;
				}

				response = await axios.get(endpoint, { withCredentials: true });
				setUserData(response.data.users);
				const totalPagesCount = Math.ceil(response.data.users.length / pageSize);
				setTotalPages(totalPagesCount);
			}
		} catch (error) {
			console.error("Error fetching users:", error);
			setUserData([]);
			setTotalPages(0);
		} finally {
			setLoading(false);
		}
	};

	const deleteUser = async (id) => {
		try {
			const response = await axios.delete(`http://localhost:3001/api/v1/admin/user/delete/${id}`);
			if (response.status === 200) {
				// Remove the user from the local state
				setUserData(userData.filter((user) => user.id !== id));
				fetchUsers(); // Refresh the user list
				showToastMessage();
			} else {
				console.error("Error deleting user:", response);
			}
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [searchInput, selectedRole, showUnassignedStudents]); // Fetch when search input or selected role changes

	const handleRoleChange = (value) => {
		// Check if the value is an object with 'student' property
		const selectedRoleValue = Object.values(value)[1];

		// Get the previous selected role
		const previousSelectedRole = selectedRole;

		// If the current and previous roles are the same, it means the role was de-selected
		if (selectedRoleValue === previousSelectedRole) {
			setSelectedRole("");
		} else {
			setSelectedRole(selectedRoleValue);
		}

		setCurrentPage(1); // Reset to the first page when changing the role
	};

	const handleSearch = (value) => {
		setSearchInput(value);
		setCurrentPage(1); // Reset to the first page when performing a new search
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Logic to display users based on current page and page size
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const displayedUsers = userData.slice(startIndex, endIndex);

	return (
		<AdminBase>
			<div className="flex mb-4 bg-default-50 p-4 rounded-xl">
				<Input
					className="w-96 mr-4"
					placeholder="Search for user..."
					size="sm"
					radius="lg"
					fullWidth={false}
					startContent={<SearchIcon className={"w-5 text-default-600"} />}
					value={searchInput}
					onChange={(e) => handleSearch(e.target.value)}
					isDisabled={showUnassignedStudents}
				/>
				<Select
					label="Role"
					className="w-48"
					size="sm"
					radius="lg"
					onSelectionChange={(value) => handleRoleChange(value)} // Handle role change
					isDisabled={showUnassignedStudents}
				>
					<SelectSection title="Role">
						<SelectItem key="student" value="student">
							Student
						</SelectItem>
						<SelectItem key="teacher" value="teacher">
							Teacher
						</SelectItem>
						<SelectItem key="admin" value="admin">
							Admin
						</SelectItem>
					</SelectSection>
				</Select>
				<Checkbox
					className="ml-4 group"
					onValueChange={setShowUnassignedStudents}
					classNames={{
						label: "text-default-500 group-hover:text-default-600",
					}}
				>
					Unassigned students
				</Checkbox>
			</div>

			<Table aria-label="User list">
				<TableHeader>
					<TableColumn>ID</TableColumn>
					<TableColumn>USER</TableColumn>
					<TableColumn>ROLE</TableColumn>
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>
				<TableBody emptyContent="No users found." isLoading={loading} loadingContent={<Spinner />}>
					{displayedUsers.map((user, index) => (
						<TableRow key={user.UserID}>
							<TableCell>{user.UserID}</TableCell>
							<TableCell>
								<User name={`${user.FirstName} ${user.LastName}`} description={user.Email} />
							</TableCell>
							<TableCell className="capitalize">{user.Access}</TableCell>
							<TableCell>
								<Dropdown className="dark">
									<DropdownTrigger>
										<Button isIconOnly size="sm" variant="light">
											<EllipsisHorizontalIcon className="text-default-400" />
										</Button>
									</DropdownTrigger>
									<DropdownMenu>
										<DropdownItem href={`/admin/user/${user.UserID}`} className="text-default-600">
											<div className="flex">
												<PencilIcon className="w-4 mr-2" />
												Edit
											</div>
										</DropdownItem>
										<DropdownItem onClick={() => deleteUser(user.UserID)} className="text-danger">
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
			{showToast && <ToastNotification message="User deleted successfully" onClose={() => setShowToast(false)} />}

			{totalPages > 1 && <Pagination className="absolute bottom-8" showControls="true" total={totalPages} current={currentPage} onChange={handlePageChange} />}
		</AdminBase>
	);
}
