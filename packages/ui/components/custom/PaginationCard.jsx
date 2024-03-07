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

export default function PaginationCard({
	lang,
	server,
	slug,
	currTab,
	currSort,
	currPage,
}) {
	console.log("from pagination card");
	console.log("currTab", currTab);
	console.log("currSort", currSort);
	const prefix = `${slug}/?${currTab && `tab=${currTab}`}${
		currTab && currSort && "&"
	}${currSort && `sort=${currSort}`}${
		((currSort && currPage) || (currTab && currPage)) && "&"
	}`;

	//tab="hot"&sort="today"&page=1
	return (
		<Card className="p-4 border  rounded-2xl shadow-sm">
			<Pagination>
				<PaginationContent>
					{currPage > 1 && (
						<PaginationItem>
							<PaginationPrevious
								className="text-lg"
								text={keywords.previous[lang]}
								href={`${prefix}page=${currPage - 1}`}
							/>
						</PaginationItem>
					)}
					{currPage > 1 && (
						<PaginationItem>
							<PaginationLink
								className="text-lg"
								href={`${prefix}page=${currPage - 1}`}
							>
								{currPage - 1}
							</PaginationLink>
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink className="text-lg" href="#" isActive>
							{currPage}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink
							className="text-lg"
							href={`${prefix}page=${currPage + 1}`}
						>
							{currPage + 1}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					{currPage && (
						<PaginationItem>
							<PaginationNext
								className="text-lg"
								text={keywords.next[lang]}
								href={`${prefix}page=${currPage + 1}`}
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</Card>
	);
}
