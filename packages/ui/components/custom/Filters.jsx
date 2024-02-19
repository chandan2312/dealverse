import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Filters() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="flex items-center gap-1 rounded-full">
					{" "}
					<Filter />
					Filters
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-120">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Dimensions</h4>
					</div>
					<div className="grid gap-2"></div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
