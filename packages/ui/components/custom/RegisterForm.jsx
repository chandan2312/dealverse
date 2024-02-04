"use client";

import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { keywords } from "../../constants/keywords";
import AlertCard from "./AlertCard";
import { useState } from "react";
import { set } from "mongoose";
import { useRouter } from "next/navigation";

const RegisterForm = ({ lang, server, domain }) => {
	const FormSchema = z
		.object({
			username: z
				.string()
				.min(1, `${keywords.username[lang]} ${keywords.isRequired[lang]}`)
				.max(100),
			fullName: z.string().max(100),
			email: z
				.string()
				.min(1, `${keywords.email[lang]} ${keywords.isRequired[lang]}`)
				.email(`${keywords.invalid[lang]} ${keywords.email[lang]}`),

			password: z
				.string()
				.min(1, `${keywords.password[lang]} ${keywords.isRequired[lang]}`)
				.min(8, keywords.passwordMustBe[lang]),
			confirmPassword: z
				.string()
				.min(1, keywords.confirmationPasswordRequired[lang]),
			website: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			path: ["confirmPassword"],
			message: keywords.passwordsNotMatches[lang],
		});

	const [isRegistered, setIsRegistered] = useState(false);
	const [isError, setIsError] = useState(false);
	const [response, setResponse] = useState(null);
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			email: "",
			fullName: "",
			password: "",
			confirmPassword: "",
			website: `${domain}`,
		},
	});

	const router = useRouter();

	const handleRegister = async (values) => {
		const response = await axios.post(`${server}/api/v1/user/register`, values);
		console.log(response);
		if (response.data.statusCode === 200) {
			console.log("response True");
			setIsError(false);
			setIsRegistered(true);
			setResponse(response);
			router.push("/login", { scroll: false });
		}
		if (response.data.statusCode !== 200 || response.data === undefined) {
			setResponse(response);
			setIsRegistered(false);
			setIsError(true);
			console.log("response Error");
			console.log(response);
		}
	};

	const handleRegisterGoogle = () => console.log("login with google");
	const handleRegisterFacebook = () => console.log("login with fb");

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleRegister)} className="w-full">
				<div className="space-y-2">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{keywords.username[lang]}</FormLabel>
								<FormControl>
									<Input placeholder="johndoe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{keywords.email[lang]}</FormLabel>
								<FormControl>
									<Input placeholder="mail@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{keywords.fullName[lang]}</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{keywords.password[lang]}</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder={keywords.typeNewPassword[lang]}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{keywords.reEnterYourPassword[lang]}</FormLabel>
								<FormControl>
									<Input
										placeholder={keywords.reEnterYourPassword[lang]}
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{isRegistered && (
					<AlertCard
						variant="success"
						title={keywords.confirmationEmailSent[lang]}
						message={keywords.sentVerificationEmail[lang]}
					/>
				)}

				{isError && (
					<AlertCard
						variant="destructive"
						title={`${keywords.invalid[lang]} ${keywords.details[lang]}`}
						message={`${keywords.pleaseCheckDetails[lang]} ${keywords.and[lang]} ${keywords.tryAgain[lang]}`}
					/>
				)}

				<Button onClick={handleRegister} className="w-full mt-6" type="submit">
					{keywords.register[lang]}
				</Button>
			</form>
			<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
				{keywords.or[lang]}
			</div>
			<Button onClick={handleRegisterGoogle} className="w-full">
				{keywords.registerWithGoogle[lang]}
			</Button>
			<Button onClick={handleRegisterFacebook} className="w-full">
				{keywords.registerWithFacebook[lang]}
			</Button>
			<p className="text-center text-sm text-gray-600 mt-2">
				{`${keywords.alreadyHaveAnAccount[lang]} `}
				<Link className="text-blue-500 hover:underline" href="/login">
					{keywords.login[lang]}
				</Link>
			</p>
		</Form>
	);
};

export default RegisterForm;
