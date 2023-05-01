import clsx from "clsx";

export const Container = ({ className, children, ...props }: React.ComponentProps<"div">) => (
	<div
		className={clsx("mx-auto max-w-2xl px-4 sm:px-0 xl:max-w-5xl sm:max-w-xl md:max-w-2xl lg:max-w-4xl", className)}
		{...props}
	>
		{children}
	</div>
);
