import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "../../store/slices/formSlice";

const AddTags = ({ lang, tagEnum }) => {
	const dispatch = useDispatch();
	const tags = useSelector((state) => state.form.tags);
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleAddTag = (e) => {
		e.preventDefault();
		if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
			dispatch(addTag(inputValue.trim()));
			setInputValue("");
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleAddTag(e);
		}
	};

	const handleRemoveTag = (tagToRemove) => {
		dispatch(removeTag(tagToRemove));
	};

	return (
		<div className="">
			<div className="relative">
				<div className=" flex items-center">
					<input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyPress}
						placeholder="Add a tag"
						className=" border rounded-md p-2"
					/>
					<button
						onClick={handleAddTag}
						className="ml-2 bg-accent hover:bg-accent2 text-accent-foreground px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
					>
						Add
					</button>
				</div>

				{inputValue.length > 1 && (
					<div className="absolute  bg-secondary py-3 px-6 top-10 z-60 left-0 rounded-md shadow-md">
						<ul className="space-y-3">
							{tagEnum.map((tag, index) => (
								<li
									key={tag.name}
									className="cursor-pointer hover:text-accent-foreground px-2 py-1 hover:bg-accent hover:rounded-2xl"
									onClick={(e) => {
										if (!tags.includes(tag.name)) {
											dispatch(addTag(tag.name));
											setInputValue("");
										}
									}}
								>
									{tag.name}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className="flex items-center flex-wrap gap-2 py-2">
				{tags.map((tag, index) => (
					<div
						key={index}
						className="bg-accent1 text-accent-foreground px-1 rounded-md flex items-center"
					>
						<span>{tag}</span>
						<button
							onClick={() => handleRemoveTag(tag)}
							className="ml-2 text-white focus:outline-none hover:text-gray-300"
						>
							&times;
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default AddTags;
