"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const modules = {
	toolbar: [
		[{ font: [] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["bold", "italic", "underline", "strike"],
		[{ color: [] }, { background: [] }],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ indent: "-1" }, { indent: "+1" }, { align: [] }],
		["link", "image", "video"],
		["clean"],
	],
};

import React from "react";
import { useEffect } from "react";
import { addDescription } from "../../store/slices/formSlice";

const TextEditor = ({ lang }) => {
	const dispatch = useDispatch();
	const text = useSelector((state) => state.form.description);

	const [value, setValue] = useState(text);

	useEffect(() => {
		if (value || value.trim()) {
			dispatch(addDescription(value));
		}
	}, [value]);

	return (
		<ReactQuill
			modules={modules}
			theme="snow"
			placeholder="Write content here..."
			onChange={setValue}
			className="bg-primary text-primary-foreground my-6"
			value={value}
		/>
	);
};

export default TextEditor;
