"use client";

import { Card } from "../ui/card";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";
import { keywords } from "../../constants/keywords";

export default function PaginationCard({ lang }) {
	return (
		<Card className="p-4 border  rounded-2xl shadow-sm">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className="text-lg"
							text={keywords.previous[lang]}
							href="#"
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink className="text-lg" href="#">
							1
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink className="text-lg" href="#" isActive>
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink className="text-lg" href="#">
							3
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext className="text-lg" text={keywords.next[lang]} href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</Card>
	);
}
