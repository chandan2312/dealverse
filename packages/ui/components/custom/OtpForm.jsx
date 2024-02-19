/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import AlertCard from "./AlertCard";
import { keywords } from "../../constants/keywords";

const OtpForm = ({ length = 5, data, onOtpSubmit = () => {} }) => {
	const [otp, setOtp] = useState(new Array(length).fill(""));
	const inputRefs = useRef([]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleChange = async (index, e) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		// allow only one input
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		// submit trigger
		const combinedOtp = newOtp.join("");
		if (combinedOtp.length === length) {
			onOtpSubmit(combinedOtp);
		}

		// Move to next input if current field is filled
		if (value && index < length - 1 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleClick = (index) => {
		inputRefs.current[index].setSelectionRange(1, 1);

		// optional
		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf("")].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			// Move focus to the previous input field on backspace
			inputRefs.current[index - 1].focus();
		}
	};

	return (
		<div className="mx-auto">
			<h1 className="text-2xl font-semibold py-4">OTP Sent</h1>
			<p className="pb-6">
				{length} Digit Verification code is sent to your email,{" "}
				{data?.email && <strong className="font-semibold">{data.email}</strong>}
			</p>
			{otp.map((value, index) => {
				return (
					<input
						key={index}
						type="text"
						ref={(input) => (inputRefs.current[index] = input)}
						value={value}
						onChange={(e) => handleChange(index, e)}
						onClick={() => handleClick(index)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						className="w-12 h-12 text-4xl text-center border-2 border-gray-300 rounded-md mx-1 focus:outline-none focus:border-accent bg-gray-100"
					/>
				);
			})}

			<div className="p-3 flex items-center justify-center">
				{data?.response && (
					<AlertCard
						variant={
							data?.status === 200 || data?.status === 202 ? "success" : "destructive"
						}
						title={data.response}
						message={""}
					/>
				)}
				{data?.isLoading && (
					<PulseLoader
						color={"#1f76be"}
						loading={data?.isLoading}
						size={10}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				)}
			</div>
		</div>
	);
};

export default OtpForm;
