import { Icons } from "../components/icons";
import {
	Home,
	Tag,
	ShoppingBag,
	MessageSquareMore,
	BookType,
	Settings,
	LogOut,
} from "lucide-react";

export const users = [
	{
		id: 1,
		name: "Candice Schiner",
		company: "Dell",
		role: "Frontend Developer",
		verified: false,
		status: "Active",
	},
	{
		id: 2,
		name: "John Doe",
		company: "TechCorp",
		role: "Backend Developer",
		verified: true,
		status: "Active",
	},
	{
		id: 3,
		name: "Alice Johnson",
		company: "WebTech",
		role: "UI Designer",
		verified: true,
		status: "Active",
	},
	{
		id: 4,
		name: "David Smith",
		company: "Innovate Inc.",
		role: "Fullstack Developer",
		verified: false,
		status: "Inactive",
	},
	{
		id: 5,
		name: "Emma Wilson",
		company: "TechGuru",
		role: "Product Manager",
		verified: true,
		status: "Active",
	},
	{
		id: 6,
		name: "James Brown",
		company: "CodeGenius",
		role: "QA Engineer",
		verified: false,
		status: "Active",
	},
	{
		id: 7,
		name: "Laura White",
		company: "SoftWorks",
		role: "UX Designer",
		verified: true,
		status: "Active",
	},
	{
		id: 8,
		name: "Michael Lee",
		company: "DevCraft",
		role: "DevOps Engineer",
		verified: false,
		status: "Active",
	},
	{
		id: 9,
		name: "Olivia Green",
		company: "WebSolutions",
		role: "Frontend Developer",
		verified: true,
		status: "Active",
	},
	{
		id: 10,
		name: "Robert Taylor",
		company: "DataTech",
		role: "Data Analyst",
		verified: false,
		status: "Active",
	},
];

export const dashboardMenu = [
	{
		icon: <Home />,
		title: "Dashboard",
		label: "dashboard",
		href: "/dashboard/",
		options: [],
	},

	{
		icon: <Tag />,
		title: "Deals",
		label: "deals",
		href: "/deals",
		options: [
			{
				title: "All Deals",
				label: "deals",
				href: "/dashboard/deals",
			},
			{
				title: "Add New Deal",
				label: "add-new-deal",
				href: "/dashboard/add-new-deal",
			},
		],
	},

	{
		icon: <ShoppingBag />,
		title: "Stores",
		label: "stores",
		href: "/dashboard/stores",

		options: [
			{
				title: "All Stores",
				label: "stores",
				href: "/dashboard/stores",
			},
			{
				title: "Add New Store",
				label: "add-new-store",
				href: "/dashboard/add-new-store",
			},
		],
	},

	{
		icon: <BookType />,
		title: "Posts",
		label: "posts",
		href: "/dashboard/posts",

		options: [
			{
				title: "All Posts",
				label: "posts",
				href: "/dashboard/posts",
			},
			{
				title: "Add New Post",
				label: "add-new-post",
				href: "/dashboard/add-new-post",
			},
		],
	},

	{
		icon: <MessageSquareMore />,
		title: "Comments",
		label: "comments",
		href: "/dashboard/comments",
		options: [],
	},

	{
		icon: <Settings />,
		title: "Setting",
		label: "setting",
		href: "/dashboard/setting",

		options: [],
	},
	{
		icon: <LogOut />,
		title: "Logout",
		label: "logout",
		options: [],
	},
];
