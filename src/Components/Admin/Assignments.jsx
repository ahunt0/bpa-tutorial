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
import NewAssignmentModal from "./NewAssignmentModal";
import axios from "axios";

export default function Assignments() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onOpen = () => {
		setIsModalOpen(true);
	};

	return (
		<AdminBase>
			<div>
				<div className="flex mb-4 bg-default-50 p-4 rounded-xl justify-between">
					<div className="flex">
						<Input className="w-96 mr-4" placeholder="Search for assignment..." size="sm" radius="lg" fullWidth={false} startContent={<SearchIcon className={"w-5 text-default-600"} />} />
					</div>
					<Button className="h-12" color="primary" variant="shadow" radius="lg" onClick={onOpen}>
						New Assignment
					</Button>
				</div>
			</div>
			<NewAssignmentModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
		</AdminBase>
	);
}
