import * as React from "react";
import { faker } from "@faker-js/faker";

import { Card, CardContent } from "./ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

import { Button } from "./ui/button";

export default function CategoriesCorousel() {
	return (
		<Carousel className="w-[86%]">
			<CarouselContent className="-ml-1 w-full">
				{Array.from({ length: 20 }).map((_, index) => (
					<CarouselItem key={index} className="px-2">
						<Button className="bg-secondary">{faker.location.country()}</Button>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
