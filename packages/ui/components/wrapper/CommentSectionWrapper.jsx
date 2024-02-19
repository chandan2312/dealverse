"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store/index.js";
import CommentSection from "../CommentSection.jsx";
import { Type } from "lucide-react";
import AddComment from "../custom/AddComment.jsx";
import { Separator } from "../ui/separator.jsx";

const CommentSectionWrapper = ({
	lang,
	slug,
	server,
	docId,
	type,
	style,
	title,
	commentCount,
}) => {
	return (
		<Provider store={store}>
			<>
				<AddComment lang={lang} id={docId} type={type} server={server} />
				<Separator className="my-6" />
				<CommentSection
					lang={lang}
					slug={slug}
					server={server}
					style={style}
					title={title}
					commentCount={commentCount}
					type={type}
					docId={docId}
				/>
			</>
		</Provider>
	);
};

export default CommentSectionWrapper;
