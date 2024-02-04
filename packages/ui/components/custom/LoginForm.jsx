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
import { keywords } from "../../constants/keywords";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { set } from "mongoose";
import AlertCard from "./AlertCard";

const LoginForm = ({ lang, server }) => {
	const FormSchema = z.object({
		email: z.string().min(1, "Email is required").email("Invalid email"),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must have than 8 characters"),
	});
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values) => {
		axios.defaults.withCredentials = true;
		const res = await axios.post(`${server}/api/v1/user/login`, values);
		const response = res.data;
		if (response.statusCode == 200) {
			setIsSuccess(true);
			setError(null);

			setTimeout(() => {}, 500);
			router.push("/dashboard", { scroll: false });
		} else {
			setError(response.message);
		}
	};

	const loginWithGoogle = () => console.log("login with google");

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<div className="space-y-2">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="mail@example.com" {...field} />
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
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Enter your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{isSuccess && (
					<AlertCard
						variant="success"
						title="Success"
						message={"Logged In Successfully, redirecting..."}
					/>
				)}

				{error && <AlertCard variant="destructive" title="Error" message={error} />}
				<Button className="bg-green-300  w-full mt-5" type="submit">
					Sign in
				</Button>
			</form>
			<div className="mx-auto my-2 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
				or
			</div>
			<Button className="bg-red-400 text-white w-full" onClick={loginWithGoogle}>
				{keywords.loginWithGoogle[lang]}
			</Button>{" "}
			<Button className="bg-blue-500 text-white w-full" onClick={loginWithGoogle}>
				{keywords.loginWithFacebook[lang]}
			</Button>{" "}
			<p className="text-center text-sm text-gray-600 mt-2">
				{`${keywords.ifYouDontHaveAnAccount[lang]}, ${keywords.please[lang]} `}
				<Link className="text-blue-500 hover:underline" href="/register">
					{keywords.register[lang]}
				</Link>
			</p>
		</Form>
	);
};

export default LoginForm;
