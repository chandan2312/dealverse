import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function WarningDialog({ lang, data }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className={`${data.buttonClassName}`}
					size={data?.buttonSize ? data.buttonSize : "sm"}
					variant={data?.buttonVariant ? data.buttonVariant : "ghost"}
				>
					{data.buttonText}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{data.title}</AlertDialogTitle>
					<AlertDialogDescription>{data.description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-row items-center gap-4 justify-end">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={data?.onClick ? data.onClick : () => {}}>
						{data.actionButton}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
