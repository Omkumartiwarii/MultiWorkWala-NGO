import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { submissionService } from "@/services/submissionService";
import { volunteerSchema, type VolunteerFormValues } from "@/utils/validation";

export function VolunteerForm() {
  const { notify } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<VolunteerFormValues>({ resolver: zodResolver(volunteerSchema), defaultValues: { fullName: "", email: "", phone: "", city: "", state: "", interests: "", skills: "", availability: "", experience: "", message: "" } });
  const onSubmit = async (values: VolunteerFormValues) => {
    setSubmitError(null);
    try { await submissionService.submitVolunteer({ ...values, experience: values.experience ?? "", message: values.message ?? "", interests: values.interests.split(",").map((item) => item.trim()).filter(Boolean) }); reset(); notify({ tone: "success", title: "Application received", description: "The volunteer team will review your details." }); }
    catch { setSubmitError("We couldn't send your application. Please try again."); }
  };
  return <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
    <FormField label="Full name" error={errors.fullName?.message} required>{(field) => <Input {...field} {...register("fullName")} autoComplete="name" />}</FormField>
    <FormField label="Email" error={errors.email?.message} required>{(field) => <Input {...field} {...register("email")} type="email" autoComplete="email" />}</FormField>
    <FormField label="Phone" error={errors.phone?.message} required>{(field) => <Input {...field} {...register("phone")} type="tel" autoComplete="tel" />}</FormField>
    <FormField label="City" error={errors.city?.message} required>{(field) => <Input {...field} {...register("city")} autoComplete="address-level2" />}</FormField>
    <FormField label="State" error={errors.state?.message} required>{(field) => <Input {...field} {...register("state")} autoComplete="address-level1" />}</FormField>
    <FormField label="Interests" hint="Separate multiple interests with commas." error={errors.interests?.message} required>{(field) => <Input {...field} {...register("interests")} />}</FormField>
    <FormField label="Skills" error={errors.skills?.message} required className="sm:col-span-2">{(field) => <Textarea {...field} {...register("skills")} />}</FormField>
    <FormField label="Availability" error={errors.availability?.message} required>{(field) => <Input {...field} {...register("availability")} placeholder="Example: weekends" />}</FormField>
    <FormField label="Experience" error={errors.experience?.message}>{(field) => <Textarea {...field} {...register("experience")} />}</FormField>
    <FormField label="Message" error={errors.message?.message} className="sm:col-span-2">{(field) => <Textarea {...field} {...register("message")} />}</FormField>
    <div className="sm:col-span-2"><Button type="submit" loading={isSubmitting}>{isSubmitting ? "Sending..." : "Submit application"}</Button></div>
    {submitError && <p role="alert" className="text-sm font-medium text-red-700 sm:col-span-2">{submitError}</p>}
  </form>;
}
