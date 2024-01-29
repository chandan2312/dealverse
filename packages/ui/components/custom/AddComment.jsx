import React from "react";
import { Card, CardContent } from "../ui/card";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { keywords } from "../../constants/keywords";

const AddComment = ({ lang }) => {
	return (
		<>
			<Card>
				<CardContent className="flex items-center">
					<div>
						<img
							src="https://avatars.githubusercontent.com/u/36113721?v=4"
							className="w-24 h-24 rounded-full"
						/>
					</div>

					<div className="grid w-full gap-2 mx-3 ">
						<Textarea placeholder={keywords.typeYourCommentHere[lang]} />
						<Button variant="secondary">{keywords.addComment[lang]}</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default AddComment;
