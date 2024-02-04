"";

import { Card, CardContent } from "../components/ui/card";
import ProfileCard from "../components/ProfileCard";
import TabList from "../components/custom/TabList";
import { publicProfilePageTabs } from "../constants/constants";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { History } from "lucide-react";
import { Zap } from "lucide-react";
import Filters from "../components/custom/Filters";
import UserActivityCard from "../components/UserActivityCard";
import UserStats from "../components/custom/UserStats";
import PaginationCard from "../components/custom/PaginationCard";

const ProfilePage = ({ lang }) => {
	return (
		<Card className="grid grid-cols-12">
			<Card className="col-span-12 md:col-span-7 lg:col-span-8">
				<ProfileCard lang={lang} />
				<Separator orientation="horizontal" className="my-3" />
				<CardContent className="flex justify-between items-center ">
					<div>
						<Tabs
							defaultValue="activity"
							className="w-full  mx-auto px-auto max-md:overflow-hidden"
						>
							<TabsList>
								<TabsTrigger value={"activity"}>
									<History /> <span className="text-sm pl-1">Activity</span>
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<TabList lang={lang} tabList={publicProfilePageTabs} />

					<Filters lang={lang} />
				</CardContent>
				<Separator orientation="horizontal" className="my-3" />

				{/* ------------------ ACTIVITIES ---------------- */}

				<CardContent className="flex flex-col gap-3 items-center ">
					{Array(10)
						.fill()
						.map((x, i) => (
							<UserActivityCard key={i + 1} lang={lang} />
						))}
					<PaginationCard lang={lang} />
				</CardContent>
			</Card>
			<Card className="col-span-12 md:col-span-5 lg:col-span-4 mx-2">
				<CardContent>
					<UserStats lang={lang} />
				</CardContent>
			</Card>
		</Card>
	);
};

export default ProfilePage;
