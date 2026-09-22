import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

type ContainerSize = "narrow" | "default" | "wide";

const sizes: Record<ContainerSize, string> = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
};

interface ContainerProps extends ComponentProps<"div"> {
  size?: ContainerSize;
}

export function Container({ size = "default", className, ...rest }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)} {...rest} />;
}
