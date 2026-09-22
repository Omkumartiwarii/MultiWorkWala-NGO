import { useId, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface FieldControlProps {
  id: string;
  invalid: boolean;
  "aria-describedby"?: string;
}

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  /** Render prop receives the id and aria attributes to spread onto the control. */
  children: (control: FieldControlProps) => ReactNode;
}

export function FormField({ label, error, hint, required, className, children }: FormFieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const hasMessage = Boolean(error ?? hint);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        {label}
        {required && <span className="text-red-700"> *</span>}
      </label>
      {children({ id, invalid: Boolean(error), "aria-describedby": hasMessage ? messageId : undefined })}
      {hasMessage && (
        <p id={messageId} className={cn("text-sm", error ? "font-medium text-red-700" : "text-ink-500")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
