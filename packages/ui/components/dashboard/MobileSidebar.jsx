"use client";
import { DashboardNav } from "./DashboardNav";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { dashboardMenu } from "../../constants/dashboard";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { keywords } from "../../constants/keywords";

// import { Playlist } from "../data/playlists";

export function MobileSidebar({ className, lang }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<MenuIcon />
				</SheetTrigger>
				<SheetContent side="left" className="!px-0">
					<div className="space-y-4 py-4">
						<div className="px-3 py-2">
							<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
								Overview
							</h2>
							<div className="space-y-1">
								<DashboardNav lang={lang} menuList={dashboardMenu} setOpen={setOpen} />
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
