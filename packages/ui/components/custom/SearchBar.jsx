import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Search } from "lucide-react";

import { keywords } from "../../constants/keywords";

export default function SearchBar({ lang }) {
	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<Input type="text" placeholder={keywords.search[lang]} />
			<Button
				size="icon"
				// variant="destructive"
				className="!bg-primary !text-primary-foreground"
				type="submit"
			>
				<Search />
			</Button>
		</div>
	);
}
