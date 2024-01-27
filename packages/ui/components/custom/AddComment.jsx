import React from "react";
import { Card, CardContent } from "../ui/card";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const AddComment = () => {
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
						<Textarea placeholder="Type your comment here" />
						<Button variant="secondary">Add Comment</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default AddComment;
