"use client";

import * as React from "react";
import Link from "next/link";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

const data = [
	{
		id: 1,
		title: "25% off Apple Iphone 13 pro max 256GB",
		slug: "25-off-apple-iphone-13-pro-max-256gb",
		type: "Deal",
		offer: "25% Off",
		code: "25OFF",
		views: 100,
		discountPrice: 999,
		originalPrice: 1200,
		deliveryPrice: 0,
		expiryDate: "2022-12-31",
		upVotes: 16,
		status: "draft",
		createAt: "2022-12-31",
		updateAt: "2022-12-31",
		store: "Apple",
		category: "Electronics",
		tags: ["Apple", "Iphone", "Electronics"],
		commentCount: 25,
	},
	{
		id: 2,
		title: "50% off Apple Iphone 13 pro max 256GB",
		slug: "50-off-apple-iphone-13-pro-max-256gb",
		type: "Deal",
		offer: "50% Off",
		code: "50OFF",
		views: 100,
		discountPrice: 999,
		originalPrice: 1200,
		deliveryPrice: 0,
		expiryDate: "2022-12-31",
		upVotes: 16,
		status: "published",
		createAt: "2022-12-31",
		updateAt: "2022-12-31",
		store: "Apple",
		category: "Electronics",
		tags: ["Apple", "Iphone", "Electronics"],
		commentCount: 25,
	},
	{
		id: 3,
		title: "75% off Apple Iphone 13 pro max 256GB",
		slug: "75-off-apple-iphone-13-pro-max-256gb",
		type: "Coupon",
		offer: "75% Off",
		code: "75OFF",
		views: 100,
		discountPrice: 999,
		originalPrice: 1200,
		deliveryPrice: 0,
		expiryDate: "2022-12-31",
		upVotes: 16,
		status: "published",
		createAt: "2022-12-31",
		updateAt: "2022-12-31",
		store: "Apple",
		category: "Electronics",
		tags: ["Apple", "Iphone", "Electronics"],
		commentCount: 25,
	},
	{
		id: 4,
		title: "100% off Apple Iphone 13 pro max 256GB",
		slug: "100-off-apple-iphone-13-pro-max-256gb",
		type: "Deal",
		offer: "100% Off",
		code: "100OFF",
		views: 100,
		discountPrice: 999,
		originalPrice: 1200,
		deliveryPrice: 0,
		expiryDate: "2022-12-31",
		upVotes: 16,
		status: "published",
		createAt: "2022-12-31",
	},
];

export const columns = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<div className="capitalize">
				<div className="font-semibold">{row.getValue("title")}</div>
				<div className="flex gap-2 my-1 text-xs text-linkText">
					<Link href="/edit">Edit</Link>
					<Separator orientation={"vertical"} mx={1} />
					<Link href="/trash">Trash</Link>
					<Separator orientation={"vertical"} mx={1} />
					<Link href={`deals/${row.getValue("title")}`}>View</Link>
				</div>
			</div>
		),
	},
	{
		accessorKey: "type",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
	},
	{
		accessorKey: "store",
		header: () => <div className="text-right">Store</div>,
		cell: ({ row }) => <div className="capitalize">{row.getValue("store")}</div>,
	},
	{
		accessorKey: "status",
		header: () => <div className="text-right">Status</div>,
		cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
	},
];

export default function DataTable() {
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter Deals..."
					value={table.getColumn("title")?.getFilterValue() ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableFooter>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
