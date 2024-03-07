import {
	// store page tab icons
	Tag,
	TicketPercent,
	MessageSquareMore,
	NotebookText,
	Mail,

	// home tab icons
	Flame,
	Newspaper,
	Zap,
	CircleUserRound,

	// all categories icons
	MonitorSmartphone,
	Shirt,
	Apple,
	Plane,
	Home,
	Gamepad2,
	BookText,
	Gift,
} from "lucide-react";

export const publicProfilePageTabs = [
	{
		icon: <Tag />,
		value: "deals",
	},

	{
		icon: <TicketPercent />,
		value: "coupons",
	},

	{
		icon: <MessageSquareMore />,
		value: "discussions",
	},
	{
		icon: <NotebookText />,
		value: "posts",
	},
];

export const allCategories = [
	{
		icon: <MonitorSmartphone />,
		value: "electronics",
	},
	{
		icon: <Shirt />,
		value: "fashion",
	},
	{
		icon: <Apple />,
		value: "food",
	},
	{
		icon: <Plane />,
		value: "travel",
	},
	{
		icon: <Home />,
		value: "decoration",
	},
	{
		icon: <Gamepad2 />,
		value: "games",
	},
	{
		icon: <BookText />,
		value: "books",
	},
	{
		icon: <Gift />,
		value: "gifts",
	},
];

const languages = [
	{
		name: "English",
		code: "en",
	},
	{
		name: "Korean",
		code: "kr",
	},
	{
		name: "French",
		code: "fr",
	},
	{
		name: "Spanish",
		code: "es",
	},
	{
		name: "German",
		code: "de",
	},
];

export const homepageTabs = [
	{
		title: "Hot",
		value: "hot",
	},
	{
		title: "New",
		value: "new",
	},
	{
		title: "Top Voted",
		value: "voted",
	},
	{
		title: "Most Commented",
		value: "commented",
	},
];

export const storepageTabs = [
	{
		title: "Hot",
		value: "hot",
	},
	{
		title: "New",
		value: "new",
	},
	{
		title: "Top Voted",
		value: "voted",
	},
	{
		title: "Most Commented",
		value: "commented",
	},
];
