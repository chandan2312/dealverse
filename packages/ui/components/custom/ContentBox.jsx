import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const ContentBox = ({ style, title, titleStyle, content, contentStyle }) => {
	return (
		<>
			<Card className={` ${style}`}>
				<CardHeader>
					<CardTitle className={`${titleStyle}`}>{title}</CardTitle>
				</CardHeader>

				<CardContent className={`${contentStyle}`}>
					<div dangerouslySetInnerHTML={{ __html: content }}></div>
				</CardContent>
			</Card>
		</>
	);
};

export default ContentBox;
