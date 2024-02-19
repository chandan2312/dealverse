"use client";

import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const MultiStepFormWrapper = ({ children }) => {
	const [currStep, setCurrStep] = useState(1);
	const maxStep = 3;

	return (
		<Card className="p-3 ">
			<div className="flex flex-end text-semibold text-sm items-center px-2 lg:px-3 py-3">
				{currStep} / {maxStep} steps
			</div>
			<CardContent>
				<form action="">
					{currStep === 1 && (
						<Input placeholder="step 1" type="text" name="name" id="name" />
					)}
					{currStep === 2 && (
						<Input placeholder="step 2" type="text" name="name" id="name" />
					)}
					{currStep === 3 && (
						<Input placeholder="step 3" type="text" name="name" id="name" />
					)}
				</form>
			</CardContent>

			<div className="py-3 px-2 lg:px-3 flex items-center justify-between">
				<Button
					onClick={() => {
						if (currStep > 1) setCurrStep(currStep - 1);
						if (currStep === 1) setCurrStep(1);
					}}
				>
					<ArrowLeft />
					Back
				</Button>

				<Button
					onClick={() => {
						if (currStep < maxStep) setCurrStep(currStep + 1);
						if (currStep === maxStep) setCurrStep(maxStep);
					}}
				>
					Next
					<ArrowRight />
				</Button>
			</div>
		</Card>
	);
};

export default MultiStepFormWrapper;
