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

import { keywords } from "../../constants/keywords";

const FormPopupTemplate = ({
	lang,
	server,
	buttonText = "Add New",
	buttonVariant = "ghost",
	buttonSize = "sm",
	buttonClass = "text-linkText",
	component,
	title,
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={`${buttonVariant}`}
					size={`${buttonSize}`}
					className={`${buttonClass}`}
				>
					{buttonText}
				</Button>
			</DialogTrigger>
			<DialogContent className=" max-h-[96vh] sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="w-full relative">{component}</div>
			</DialogContent>
		</Dialog>
	);
};

export default FormPopupTemplate;
