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

export function LoginDialog({ lang, title, buttonText }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					{buttonText}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{/* other component */}
				<LoginForm />
				{/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
			</DialogContent>
		</Dialog>
	);
}
