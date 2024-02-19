"use client";
import React from "react";
import { useState } from "react";
import MultiStepFormWrapper from "../wrapper/MultiStepFormWrapper";

const Test = ({ currStep }) => {
	return (
		<>
			<MultiStepFormWrapper>
				<form action="">
					{currStep === 1 && (
						<input placeholder="step 1" type="text" name="name" id="name" />
					)}
					{currStep === 2 && (
						<input placeholder="step 2" type="text" name="name" id="name" />
					)}
					{currStep === 3 && (
						<input placeholder="step 3" type="text" name="name" id="name" />
					)}
				</form>
			</MultiStepFormWrapper>
		</>
	);
};

export default Test;
