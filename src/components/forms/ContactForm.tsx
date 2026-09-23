import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { submissionService } from "@/services/submissionService";
import { contactSchema, type ContactFormValues } from "@/utils/validation";

export function ContactForm() {
  const { notify } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), defaultValues: { name: "", email: "", phone: "", subject: "", message: "" } });
  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    try { await submissionService.submitContact(values); reset(); notify({ tone: "success", title: "Enquiry received", description: "The team will review your message." }); }
    catch { setSubmitError("We couldn't send your enquiry. Please try again."); }
  };
  return <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
    <FormField label="Name" error={errors.name?.message} required>{(field) => <Input {...field} {...register("name")} autoComplete="name" />}</FormField>
    <FormField label="Email" error={errors.email?.message} required>{(field) => <Input {...field} {...register("email")} type="email" autoComplete="email" />}</FormField>
    <FormField label="Phone" error={errors.phone?.message}>{(field) => <Input {...field} {...register("phone")} type="tel" autoComplete="tel" />}</FormField>
    <FormField label="Subject" error={errors.subject?.message} required>{(field) => <Input {...field} {...register("subject")} />}</FormField>
    <FormField label="Message" error={errors.message?.message} required className="sm:col-span-2">{(field) => <Textarea {...field} {...register("message")} />}</FormField>
    <div className="sm:col-span-2"><Button type="submit" loading={isSubmitting}>{isSubmitting ? "Sending..." : "Send enquiry"}</Button></div>
    {submitError && <p role="alert" className="text-sm font-medium text-red-700 sm:col-span-2">{submitError}</p>}
  </form>;
}
