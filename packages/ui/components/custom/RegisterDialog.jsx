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

import RegisterForm from "./RegisterForm";

export function RegisterDialog({ title, buttonText }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{buttonText}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{/* other component */}
				<RegisterForm />
				<DialogFooter>
					<Button type="submit" className="!justify-center">
						Register
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
