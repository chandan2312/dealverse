"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import tokenChecker from "../../helpers/tokenChecker";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { X } from "lucide-react";

export default function FormDialog({
	lang,
	maxWidth = "max-w-[400px]",
	size = "xs",
	variant = "default",
	buttonText,
	title,
	component,
	className,
	server,
}) {
	const openRegister = useSelector((state) => state.form.openRegister);
	const [isLoading, setIsLoading] = useState(true);
	const [isTokenAvailable, setIsTokenAvailable] = useState(false);

	useEffect(() => {
		const checker = async () => {
			const token = await tokenChecker(server);
			console.log(token);
			if (token) {
				setIsTokenAvailable(true);
			} else {
				setIsTokenAvailable(false);
			}
			setIsLoading(false);
		};

		checker();
	}, []);

	return (
		<AlertDialog
			className={`max-md:mx-2 mx-4 ${maxWidth} max-h-[98vh] min-h-[98vh] relative`}
		>
			<>
				<AlertDialogTrigger className="bg-accent p-0 m-0" asChild>
					<Button size={size} variant={variant} className={`px-1 m-0 ${className} `}>
						{buttonText}
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className={`${maxWidth} p-0  m-0`}>
					<AlertDialogFooter className="py-1 my-0">
						<AlertDialogCancel
							size="sm"
							className="border-none py-0 my-0 rounded-full ml-auto hover:bg-destructive hover:text-destructive-foreground"
						>
							<X />
						</AlertDialogCancel>
					</AlertDialogFooter>

					<div className="py-2 px-6 h-full overflow-y-scroll">
						{isLoading ? (
							"Loading..."
						) : isTokenAvailable ? (
							<>
								<AlertDialogHeader>
									<AlertDialogTitle>{title}</AlertDialogTitle>
									<AlertDialogDescription>
										{component ? component : "are you sure to continue?"}
									</AlertDialogDescription>
								</AlertDialogHeader>

								{/* <AlertDialogAction>Continue</AlertDialogAction> */}
							</>
						) : (
							<>
								{openRegister ? (
									<RegisterForm lang={lang} server={server} />
								) : (
									<>
										<LoginForm lang={lang} server={server} />
									</>
								)}
							</>
						)}
					</div>
				</AlertDialogContent>
			</>
		</AlertDialog>
	);
}
