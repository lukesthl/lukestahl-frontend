import clsx from "clsx";

export const Container = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={clsx("mx-16 mt-8 max-w-2xl lg:max-w-5xl", className)}
    {...props}
  >
    {children}
  </div>
);
