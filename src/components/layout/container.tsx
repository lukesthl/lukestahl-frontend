import clsx from "clsx";

export const Container = ({ className, children, ...props }: React.ComponentProps<"div">) => (
	<div className={clsx("mx-auto max-w-2xl px-4 sm:px-0 lg:max-w-5xl", className)} {...props}>
		{children}
	</div>
);
