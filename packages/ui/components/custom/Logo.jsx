import React from "react";
import Link from "next/link";
import { keywords } from "../../constants/keywords";

const Logo = ({ lang }) => {
	return (
		<h1 className="text-lg font-semibold">
			<Link href="/">Logo</Link>
		</h1>
	);
};

export default Logo;
