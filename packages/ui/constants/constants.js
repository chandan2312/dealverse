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
} from "lucide-react";

export const storePageTabs = [
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
	{
		icon: <Mail />,
		value: "newsLetter",
	},
];

export const homePageTabs = [
	{
		icon: <Flame />,
		value: "popular",
	},
	{
		icon: <Newspaper />,
		value: "latest",
	},
	{
		icon: <Zap />,
		value: "trending",
	},
	{
		icon: <CircleUserRound />,
		value: "forYou",
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
