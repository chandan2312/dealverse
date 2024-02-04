import React from "react";
import Link from "next/link";
import { keywords } from "../../constants/keywords";

import {
	Twitter,
	Facebook,
	MessageCircleCode,
	Copy,
	Share2,
} from "lucide-react";

import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ShareToButton = ({ lang }) => {
	return (
		<>
			<div className="max-md:hidden flex flex-col gap-1 px-1 items-center fixed left-0 top-1/2">
				<span className="block">{keywords.share[lang]}</span>
				<Link href="#">
					<Twitter />
				</Link>
				<Link href="#">
					<Facebook />
				</Link>
				<Link href="#">
					<MessageCircleCode />
				</Link>
				<Link href="#">
					<Twitter />
				</Link>
			</div>

			{/* ------------------ Mobile Sticky Share Button ---------------- */}

			<Dialog>
				<DialogTrigger asChild>
					<Button className="md:hidden border-slate-500 fixed bottom-12 right-3 mx-1 my-2 px-2 py-0 z-20 rounded-full shadow-2xl">
						<Share2 />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Share link</DialogTitle>
						<DialogDescription>
							Anyone who has this link will be able to view this.
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center space-x-2">
						<div className="grid flex-1 gap-2">
							<Label htmlFor="link" className="sr-only">
								Link
							</Label>
							<Input
								id="link"
								defaultValue="https://ui.shadcn.com/docs/installation"
								readOnly
							/>
						</div>
						<Button type="submit" size="sm" className="px-3">
							<span className="sr-only">Copy</span>
							<Copy className="h-4 w-4" />
						</Button>
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ShareToButton;
