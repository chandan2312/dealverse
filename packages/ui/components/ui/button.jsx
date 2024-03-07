import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../utils.js";

const buttonVariants = cva(
	"inline-flex items-center hover:bg-accent2 hover:text-accent2-foreground justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none   disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-accent text-accent-foreground hover:bg-accent2",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-transparent hover:bg-accent2 hover:text-accent2-foreground",
				secondary: "bg-accent2 text-accent2-foreground hover:bg-accent/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				accent:
					"bg-accent text-accent-foreground hover:bg-accent2 hover:text-accent2-foreground",
				accent2:
					"bg-accent2 text-accent2-foreground hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-10 px-4 py-2",
				xs: "h-6 p-1 rounded-md",
				sm: "h-9 rounded-md px-2",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	}
);

const Button = React.forwardRef(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
