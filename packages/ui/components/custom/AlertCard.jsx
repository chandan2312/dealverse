import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function AlertCard({
	lang,
	title,
	message,
	className,
	variant = "default",
}) {
	return (
		<Alert className={`my-4 ${className}`} variant={variant}>
			<Terminal className={``} />
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
}
