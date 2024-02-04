import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Search } from "lucide-react";

import { keywords } from "../../constants/keywords";

export default function SearchBar({ lang, toggleFunction }) {
	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<Input
				className="max-md:hidden"
				type="text"
				placeholder={keywords.search[lang]}
			/>
			<Button
				size="sm"
				// variant="destructive"
				className="md:hidden bg-primary text-text1"
				type="submit"
				onClick={() => toggleFunction(true)}
			>
				<Search />
			</Button>
		</div>
	);
}
