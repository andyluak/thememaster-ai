import clsx from "clsx";
import { cn } from "lib/utils";

type TypographyProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyH1({ className, children }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ className, children }: TypographyProps) {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 pb-2 text-center text-xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700 md:text-3xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ className, children }: TypographyProps) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyP({ className, children }: TypographyProps) {
  return <p className={cn("", className)}>{children}</p>;
}
