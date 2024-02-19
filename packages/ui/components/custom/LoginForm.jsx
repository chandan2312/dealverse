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
// import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { set } from "mongoose";
import AlertCard from "./AlertCard";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUser } from "../../store/slices/userSlice";
import { toggleRegister } from "../../store/slices/formSlice";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import PulseLoader from "react-spinners/PulseLoader";
import OtpForm from "./OtpForm";

const LoginForm = ({ lang, server }) => {
	const dispatch = useDispatch();
	const [response, setResponse] = useState(null);
	const [status, setStatus] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [otpSent, setOtpSent] = useState(false);

	const FormSchema = z.object({
		email: z.string().min(1, "Email is required").email("Invalid email"),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must have than 8 characters"),
	});

	// const router = useRouter();
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values) => {
		axios.defaults.withCredentials = true;
		setIsLoading(true);
		const res = await axios.post(`${server}/api/v1/user/login`, values);
		const response = res.data;
		console.log(response);

		setResponse(response.message);
		setStatus(response.statusCode);

		setIsLoading(false);

		if (response.statusCode == 200) {
			dispatch(setUser(response.data));
			window.location.reload();
		}

		if (response.statusCode === 202) {
			setOtpSent(true);
			toast("OTP Sent to your email");
		}
	};

	const handleLoginGoogle = async (credentialResponse) => {
		setIsLoading(true);
		axios.defaults.withCredentials = true;
		const res = await axios.post(`${server}/api/v1/user/auth-google`, {
			credentialResponse,
			action: "login",
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
		<div className=" flex flex-col items-center justify-center gap-2">
			<div className="flex item-center-justify-center">
				<GoogleLogin
					onSuccess={(credentialResponse) => {
						handleLoginGoogle(credentialResponse);
					}}
					onError={() => {
						toast("❌ Error Occured. Please try again");
					}}
				/>
			</div>

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

					{response && (
						<AlertCard
							variant={status === 200 || status === 202 ? "success" : "destructive"}
							title={response}
							message={""}
						/>
					)}

					<Button className="bg-green-300  w-full mt-5" type="submit">
						{isLoading ? (
							<PulseLoader
								color={"#ffffff"}
								loading={isLoading}
								size={10}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						) : (
							<span>{keywords.login[lang]}</span>
						)}
					</Button>
				</form>

				<p className="text-center text-sm text-gray-600 my-2">
					{`${keywords.ifYouDontHaveAnAccount[lang]}, ${keywords.please[lang]} `}
					<span
						className="text-accent hover:underline cursor-pointer"
						onClick={() => dispatch(toggleRegister(true))}
					>
						{keywords.register[lang]}
					</span>
				</p>
			</Form>
		</div>
	);
};

export default LoginForm;
