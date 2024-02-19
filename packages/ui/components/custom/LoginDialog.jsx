import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import LoginForm from "./LoginForm";

import { keywords } from "../../constants/keywords";

export function LoginDialog({ lang, server, title, buttonText }) {
	return (
		<Dialog>
			<DialogTrigger className="px-1 " asChild>
				<Button className="flex items-center px-1" variant="ghost" size="xs">
					{buttonText}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{/* other component */}
				<LoginForm lang={lang} server={server} />
				{/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
			</DialogContent>
		</Dialog>
	);
}
