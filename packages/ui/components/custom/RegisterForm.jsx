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
import { toggleRegister } from "../../store/slices/formSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import PulseLoader from "react-spinners/PulseLoader";
import OtpForm from "./OtpForm";

const RegisterForm = ({ lang, server, domain, session }) => {
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

	const [response, setResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState(null);
	const [otpSent, setOtpSent] = useState(false);
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

	// const router = useRouter();
	const dispatch = useDispatch();

	const handleRegister = async (values) => {
		console.log("values from register form");
		console.log(values);
		setIsLoading(true);
		const res = await axios.post(`${server}/api/v1/user/register`, values);
		const response = res.data;

		setStatus(response.statusCode);
		setResponse(response.message);

		setIsLoading(false);
		if (response.statusCode === 200) {
			toast(`${response.message}`);
			setOtpSent(true);
			setStatus(null);
			setResponse(null);
		}

		if (response.statusCode === 202) {
			toast(response.message);
			setOtpSent(true);
			setStatus(null);
			setResponse(null);
		}

		if (response.statusCode !== 200 && response.statusCode !== 202) {
			toast(`⚠️ ${response.message}`);
		}
	};

	const handleRegisterGoogle = async (credentialResponse) => {
		axios.defaults.withCredentials = true;
		setIsLoading(true);
		const res = await axios.post(`${server}/api/v1/user/auth-google`, {
			credentialResponse,
			action: "register",
		});
		const response = res.data;

		setIsLoading(false);

		if (response.statusCode === 200) {
			toast(`${response.message}`);

			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			toast("❌ Error Occured. Please try again", {
				description: response.message,
			});
		}
	};

	const onOtpSubmit = async (otp) => {
		if (!otp) {
			console.log("otp is required", otp);
			return;
		}
		setIsLoading(true);
		setStatus(null);
		setResponse(null);
		axios.defaults.withCredentials = true;
		const res = await axios.post(`${server}/api/v1/user/verify-otp`, {
			email: form.getValues("email"),
			otp: otp,
		});
		const response = res.data;

		setStatus(response.statusCode);
		setResponse(response.message);

		setIsLoading(false);

		if (response.statusCode === 200) {
			toast(`${response.message}`);

			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			toast("❌ Error Occured. Please try again", {
				description: response.message,
			});
		}
	};

	if (otpSent) {
		return (
			<OtpForm
				length={5}
				data={{
					email: form.getValues("email"),
					status: status,
					response,
					isLoading,
				}}
				onOtpSubmit={onOtpSubmit}
			/>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="flex item-center-justify-center">
				<GoogleLogin
					onSuccess={(credentialResponse) => {
						handleRegisterGoogle(credentialResponse);
					}}
					onError={() => {
						toast("❌ Error Occured. Please try again");
					}}
				/>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleRegister)} className="w-full">
					<div className="space-y-1 overflow-y-scroll">
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
					{response && (
						<AlertCard
							variant={status === 200 || status === 202 ? "success" : "destructive"}
							title={response}
							message={""}
						/>
					)}

					<Button onClick={handleRegister} className="w-full mt-6" type="submit">
						{isLoading ? (
							<PulseLoader
								color={"#ffffff"}
								loading={isLoading}
								size={10}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						) : (
							<span>{keywords.register[lang]}</span>
						)}
					</Button>
				</form>

				{/* <Button onClick={handleRegisterGoogle} className="w-full">
				{keywords.registerWithGoogle[lang]}
			</Button> */}

				{/* <Button onClick={handleRegisterFacebook} className="w-full">
				{keywords.registerWithFacebook[lang]}
			</Button> */}
				<p className="text-center text-sm text-gray-600 my-2">
					{`${keywords.alreadyHaveAnAccount[lang]} `}
					<span
						onClick={() => dispatch(toggleRegister(false))}
						className="text-accent hover:underline cursor-pointer"
					>
						{keywords.login[lang]}
					</span>
				</p>
			</Form>
		</div>
	);
};

export default RegisterForm;
