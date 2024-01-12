import React from "react";
import { ReactComponent as Logo } from "../../../Assets/Images/Logo.svg";
import SidebarButton from "./StudentSidebarButton";
import { Divider } from "@nextui-org/react";
import { DashboardIcon, LogsIcon, AcademicCapIcon, DocumentIcon, SettingsIcon, LogoutIcon } from "../../Common/Icons";

export default function StudentSidebar({ className }) {
	return (
		<div className={`dark h-screen w-1/6 bg-default-50 flex flex-col ${className} left-0 top-0`}>
			<Logo className="fill-[#8AC6E2] h-12 mt-10" />
			<div className="mt-16 w-full flex flex-col gap-1">
				<SidebarButton to="#">
					<DashboardIcon className="mr-2 w-7" />
					Dashboard
				</SidebarButton>
				<SidebarButton to="#">
					<LogsIcon className="mr-2 w-7" />
					Assignments
				</SidebarButton>
				<SidebarButton to="#" selected={true}>
					<AcademicCapIcon className="mr-2 w-7" />
					Courses
				</SidebarButton>
				<SidebarButton to="#">
					<DocumentIcon className="mr-2 w-7" />
					Grades
				</SidebarButton>
			</div>
			<div className="mt-auto p-4">
				<Divider className="my-4" />
				<p className="text-white flex hover:text-[#8AC6E2] hover:cursor-pointer duration-200 ease-in-out">
					<SettingsIcon className="w-6 mr-2" /> Settings
				</p>
				<p className="text-white pt-4 flex hover:text-red-500 hover:cursor-pointer duration-200 ease-in-out">
					<LogoutIcon className="w-6 mr-2" /> Logout
				</p>
			</div>
		</div>
	);
}
