import clsx from "clsx";

export const Container = ({ className, children, ...props }: React.ComponentProps<"div">) => (
	<div className={clsx("mx-auto max-w-2xl lg:max-w-5xl", className)} {...props}>
		{children}
	</div>
);
