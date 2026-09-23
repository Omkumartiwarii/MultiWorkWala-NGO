import type { ComponentProps, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "text";
export type ButtonSize = "sm" | "md" | "lg";
/** Use "dark" when the button sits on a navy or image background. */
export type ButtonTone = "light" | "dark";

interface StyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  fullWidth?: boolean;
  className?: string;
}

const same = (value: string): Record<ButtonTone, string> => ({ light: value, dark: value });

const variants: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: same("bg-gold-400 text-navy-950 shadow-sm hover:bg-gold-300 active:bg-gold-500"),
  secondary: {
    light: "bg-navy-900 text-ivory-50 hover:bg-navy-800 active:bg-navy-950",
    dark: "bg-ivory-50 text-navy-950 hover:bg-white active:bg-ivory-200",
  },
  outline: {
    light: "border border-navy-900/30 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-ivory-50",
    dark: "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy-950",
  },
  ghost: {
    light: "text-navy-900 hover:bg-navy-900/5 active:bg-navy-900/10",
    dark: "text-white hover:bg-white/10 active:bg-white/15",
  },
  danger: same("bg-red-700 text-white hover:bg-red-800 active:bg-red-900"),
  text: {
    light: "text-brand-700 underline-offset-4 hover:text-brand-900 hover:underline",
    dark: "text-gold-200 underline-offset-4 hover:text-white hover:underline",
  },
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 gap-1.5 px-4 py-2 text-sm",
  md: "min-h-12 gap-2 px-6 py-2.5 text-[0.95rem]",
  lg: "min-h-14 gap-2.5 px-8 py-3 text-base",
};

const textSizes: Record<ButtonSize, string> = {
  sm: "gap-1.5 text-sm",
  md: "gap-2 text-[0.95rem]",
  lg: "gap-2.5 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  tone = "light",
  fullWidth,
  className,
}: StyleOptions): string {
  return cn(
    "group/btn inline-flex items-center justify-center rounded-full text-center font-semibold",
    "transition-[background-color,color,border-color,box-shadow] duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant][tone],
    variant === "text" ? textSizes[size] : sizes[size],
    fullWidth && "w-full",
    className,
  );
}

interface ButtonProps extends ComponentProps<"button">, Omit<StyleOptions, "className"> {
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant,
  size,
  tone,
  fullWidth,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, tone, fullWidth, className })}
      {...rest}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

interface ButtonLinkProps extends Omit<LinkProps, "className">, StyleOptions {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function ButtonLink({
  variant,
  size,
  tone,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, tone, fullWidth, className })} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  );
}
