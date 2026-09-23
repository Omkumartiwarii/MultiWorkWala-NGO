import { useEffect, useState, type FormEvent } from "react";
import { ExternalLink, QrCode } from "lucide-react";
import QRCode from "qrcode";
import { useSearchParams } from "react-router-dom";
import { DonationAmountPicker } from "@/components/forms/DonationAmountPicker";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { MIN_DONATION } from "@/constants/donation";
import { buildUpiUri, donationConfig } from "@/config/donation";
import { submissionService } from "@/services/submissionService";
import type { DonationFrequency } from "@/types";

export function DonationForm() {
  const [searchParams] = useSearchParams();
  const { notify } = useToast();
  const initialAmount = Number(searchParams.get("amount"));
  const [amount, setAmount] = useState<number | null>(Number.isFinite(initialAmount) && initialAmount >= MIN_DONATION ? initialAmount : 2500);
  const [frequency, setFrequency] = useState<DonationFrequency>(searchParams.get("frequency") === "monthly" ? "monthly" : "one-time");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const upiUri = amount ? buildUpiUri(amount, frequency) : "";

  useEffect(() => {
    if (!upiUri) { setQrDataUrl(""); return; }
    QRCode.toDataURL(upiUri, { width: 280, margin: 2, errorCorrectionLevel: "M" }).then(setQrDataUrl).catch(() => setQrDataUrl(""));
  }, [upiUri]);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!amount || amount < MIN_DONATION || !fullName.trim() || !email.trim()) { setError("Choose an amount and enter your name and email."); return; }
    setError(null); setSubmitting(true);
    try { await submissionService.submitDonation({ amount, frequency, donor: { fullName, email, phone } }); notify({ tone: "success", title: "Donation enquiry recorded", description: "Complete payment in your UPI app or scan the QR code." }); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "We couldn't submit the donation enquiry. Please try again."); }
    finally { setSubmitting(false); }
  };
  return <form onSubmit={submit} className="space-y-5">
    <DonationAmountPicker value={amount} onChange={setAmount} />
    <div className="grid gap-4 sm:grid-cols-2">
      <Input aria-label="Full name" placeholder="Full name" value={fullName} onChange={(event) => setFullName(event.target.value)} />
      <Input aria-label="Email" type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input aria-label="Phone" type="tel" placeholder="Phone (optional)" value={phone} onChange={(event) => setPhone(event.target.value)} />
      <select aria-label="Donation frequency" value={frequency} onChange={(event) => setFrequency(event.target.value as DonationFrequency)} className="h-12 rounded-xl border border-navy-900/20 bg-white px-4 text-navy-900"><option value="one-time">One-time</option><option value="monthly">Monthly</option></select>
    </div>
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={upiUri || undefined} aria-disabled={!upiUri} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 font-semibold text-navy-950 hover:bg-gold-300 ${!upiUri ? "pointer-events-none opacity-50" : ""}`}><ExternalLink className="size-4" aria-hidden="true" />Pay with UPI app</a>
      <Button type="submit" variant="outline" loading={submitting}>{submitting ? "Recording..." : "Record donation enquiry"}</Button>
    </div>
    <div className="rounded-2xl border border-navy-900/10 bg-white p-5 text-center">
      {qrDataUrl ? <><img src={qrDataUrl} alt={`UPI QR code for ${donationConfig.payeeName}, amount ${amount} rupees`} className="mx-auto size-56" /><p className="mt-3 text-sm text-ink-500">Scan to pay ₹{amount} to {donationConfig.upiId}</p></> : <><QrCode className="mx-auto size-10 text-ink-500" aria-hidden="true" /><p className="mt-3 text-sm text-ink-500">Choose an amount to generate the UPI QR code.</p></>}
    </div>
    <p className="text-xs leading-relaxed text-ink-500">UPI ID: <strong className="text-navy-900">{donationConfig.upiId}</strong>. Keep your UPI transaction ID for your records. Payment is not auto-verified.</p>
    {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
  </form>;
}
