import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { newsletterService } from "@/services/newsletterService";
import { newsletterSchema, type NewsletterFormValues } from "@/utils/validation";

export function NewsletterForm() {
  const { notify } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    setSubmitError(null);
    try {
      await newsletterService.subscribe(values);
      notify({
        tone: "success",
        title: "Thank you for subscribing",
        description: "Your subscription has been received.",
      });
      reset();
    } catch {
      setSubmitError("We couldn't complete your subscription. Please try again.");
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-start"
    >
      <FormField label="Name" error={errors.name?.message} required>
        {(field) => <Input type="text" autoComplete="name" placeholder="Your name" {...field} {...register("name")} />}
      </FormField>
      <FormField label="Email" error={errors.email?.message} required>
        {(field) => (
          <Input type="email" autoComplete="email" placeholder="name@example.com" {...field} {...register("email")} />
        )}
      </FormField>
      <div className="sm:col-span-2 lg:col-span-1 lg:pt-[1.85rem]">
        <Button type="submit" size="md" loading={isSubmitting} fullWidth>
          {isSubmitting ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      {submitError && (
        <p role="alert" className="text-sm font-medium text-red-700 sm:col-span-2 lg:col-span-3">
          {submitError}
        </p>
      )}
    </form>
  );
}
