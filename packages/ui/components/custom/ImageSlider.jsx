"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../ui/card";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

const ImageSlider = () => {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full max-w-xs"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square bg-primary rounded-lg shadow-sm items-center justify-center p-6">
									<span className="text-4xl font-semibold">{index + 1}</span>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="w-6 h-6 -left-0 " />
			<CarouselNext className="w-6 h-6 -right-0 " />
		</Carousel>
	);
};

export default ImageSlider;
