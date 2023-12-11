import React, { useState, useEffect } from "react";
import AdminBase from "./AdminBase";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Input, Pagination } from "@nextui-org/react";
import { SearchIcon } from "../Common/Icons";
import axios from "axios";

export default function Users() {
	const [userData, setUserData] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 8; // Results per page
	const [totalPages, setTotalPages] = useState(0);

	const fetchUsers = async () => {
		try {
			let response;
			if (searchInput === "") {
				response = await axios.get("http://localhost:3001/api/v1/admin/users");
			} else {
				response = await axios.get(`http://localhost:3001/api/v1/admin/users/find/${searchInput}`);
			}
			setUserData(response.data.users);
			const totalPagesCount = Math.ceil(response.data.users.length / pageSize);
			setTotalPages(totalPagesCount);
		} catch (error) {
			console.error("Error fetching users:", error);
			setUserData([]);
			setTotalPages(0);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [searchInput]); // Fetch when search input changes

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
			<div className="flex justify-between gap-3 items-end mb-4">
				<Input
					isClearable
					className="w-full"
					placeholder="Search by name..."
					size="sm"
					radius="lg"
					startContent={<SearchIcon className={"w-5"} />}
					value={searchInput}
					onChange={(e) => handleSearch(e.target.value)}
				/>
			</div>

			<Table aria-label="User list">
				<TableHeader>
					<TableColumn>ID</TableColumn>
					<TableColumn>NAME</TableColumn>
					<TableColumn>ROLE</TableColumn>
				</TableHeader>
				<TableBody emptyContent="No users found.">
					{displayedUsers.map((user, index) => (
						<TableRow key={user.UserID}>
							<TableCell>{user.UserID}</TableCell>
							<TableCell>
								<User name={`${user.FirstName} ${user.LastName}`} description={user.Email} />
							</TableCell>
							<TableCell className="capitalize">{user.Access}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{totalPages > 1 && <Pagination className="mt-4" total={totalPages} current={currentPage} onChange={handlePageChange} />}
		</AdminBase>
	);
}
