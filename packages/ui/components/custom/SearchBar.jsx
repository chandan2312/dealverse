import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Search } from "lucide-react";

export default function SearchBar() {
	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<Input type="email" placeholder="keyword" />
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
