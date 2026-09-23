import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, ExternalLink, QrCode, ShieldCheck, XCircle } from "lucide-react";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import { useSearchParams } from "react-router-dom";
import { DonationAmountPicker } from "@/components/forms/DonationAmountPicker";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { MIN_DONATION } from "@/constants/donation";
import { buildUpiUri, donationConfig } from "@/config/donation";
import { submissionService } from "@/services/submissionService";
import type { Donation, DonationFrequency } from "@/types";

const purposes = ["General support", "Education", "Healthcare", "Women Empowerment", "Child Welfare", "Community Development", "Environment"];

type FlowStep = "details" | "checkout" | "result";

type ReceiptDonation = Donation & { status: "success" | "failed" | "cancelled"; orderId: string };

export function DonationForm() {
  const [searchParams] = useSearchParams();
  const { notify } = useToast();
  const initialAmount = Number(searchParams.get("amount"));
  const [amount, setAmount] = useState<number | null>(Number.isFinite(initialAmount) && initialAmount >= MIN_DONATION ? initialAmount : 500);
  const [frequency, setFrequency] = useState<DonationFrequency>(searchParams.get("frequency") === "monthly" ? "monthly" : "one-time");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("General support");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [step, setStep] = useState<FlowStep>("details");
  const [order, setOrder] = useState<Donation | null>(null);
  const [result, setResult] = useState<ReceiptDonation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const upiUri = amount ? buildUpiUri(amount, frequency) : "";

  useEffect(() => {
    if (!upiUri) { setQrDataUrl(""); return; }
    QRCode.toDataURL(upiUri, { width: 280, margin: 2, errorCorrectionLevel: "M" }).then(setQrDataUrl).catch(() => setQrDataUrl(""));
  }, [upiUri]);

  const createOrder = async (event: FormEvent) => {
    event.preventDefault();
    if (!amount || amount < MIN_DONATION || !fullName.trim() || !email.trim()) {
      setError("Choose an amount and enter your name and email.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const created = await submissionService.createDonation({ amount, frequency, purpose, anonymous, message, donor: { fullName, email, phone } });
      setOrder(created);
      setStep("checkout");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We couldn't create the demo order.");
    } finally { setSubmitting(false); }
  };

  const completeDemo = async (outcome: "success" | "failed" | "cancelled") => {
    if (!order?.orderId) return;
    setError(null);
    setSubmitting(true);
    try {
      const completed = await submissionService.completeDemoDonation(order.orderId, outcome);
      const receipt = { ...completed, status: outcome, orderId: completed.orderId ?? order.orderId, donor: { fullName, email, phone }, purpose: completed.purpose ?? order.purpose, anonymous } as ReceiptDonation;
      setResult(receipt);
      setStep("result");
      notify({ tone: outcome === "success" ? "success" : "error", title: outcome === "success" ? "Demo payment successful" : `Demo payment ${outcome}`, description: "This is a test transaction. No real payment was processed." });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The demo payment could not be completed.");
    } finally { setSubmitting(false); }
  };

  if (step === "result" && result) return <DemoResult donation={result} onRestart={() => { setResult(null); setOrder(null); setStep("details"); }} />;

  if (step === "checkout" && order) return <DemoCheckout order={order} upiUri={upiUri} qrDataUrl={qrDataUrl} submitting={submitting} error={error} onOutcome={completeDemo} onBack={() => setStep("details")} />;

  return <form onSubmit={createOrder} className="space-y-5">
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-900"><strong>Demo Payment</strong><br />This checkout is a safe simulator. No real payment credentials or money are used.</div>
    <DonationAmountPicker value={amount} onChange={setAmount} />
    <div className="grid gap-4 sm:grid-cols-2">
      <Input aria-label="Full name" placeholder="Donor name" value={fullName} onChange={(event) => setFullName(event.target.value)} />
      <Input aria-label="Email" type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input aria-label="Phone" type="tel" placeholder="Phone (optional)" value={phone} onChange={(event) => setPhone(event.target.value)} />
      <select aria-label="Donation frequency" value={frequency} onChange={(event) => setFrequency(event.target.value as DonationFrequency)} className="h-12 rounded-xl border border-navy-900/20 bg-white px-4 text-navy-900"><option value="one-time">One-time donation</option><option value="monthly">Monthly donation</option></select>
      <select aria-label="Donation purpose" value={purpose} onChange={(event) => setPurpose(event.target.value)} className="h-12 rounded-xl border border-navy-900/20 bg-white px-4 text-navy-900 sm:col-span-2">{purposes.map((item) => <option key={item}>{item}</option>)}</select>
      <textarea aria-label="Optional message" placeholder="Optional message" value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-24 rounded-xl border border-navy-900/20 bg-white px-4 py-3 text-navy-900 sm:col-span-2" />
    </div>
    <label className="flex items-start gap-3 text-sm text-ink-600"><input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} className="mt-1 size-4 accent-brand-700" />Show this donation as anonymous in public records.</label>
    <div className="flex items-center gap-2 text-sm text-ink-500"><ShieldCheck className="size-4 text-brand-700" aria-hidden="true" /> Demo only. No Razorpay credentials or real payment is used.</div>
    <Button type="submit" loading={submitting} fullWidth>{submitting ? "Creating demo order..." : "Continue to Demo Payment"}</Button>
    {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
  </form>;
}

function DemoCheckout({ order, upiUri, qrDataUrl, submitting, error, onOutcome, onBack }: { order: Donation; upiUri: string; qrDataUrl: string; submitting: boolean; error: string | null; onOutcome: (outcome: "success" | "failed" | "cancelled") => void; onBack: () => void }) {
  return <div className="space-y-5 rounded-3xl border border-navy-900/10 bg-white p-6 shadow-card sm:p-8">
    <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[0.18em] text-gold-700 uppercase">Demo Payment</p><h3 className="mt-2 text-2xl font-medium text-navy-900">Complete test checkout</h3></div><span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">No real money</span></div>
    <div className="grid gap-3 rounded-2xl bg-ivory-100 p-5 text-sm text-ink-600"><div className="flex justify-between gap-4"><span>Amount</span><strong className="text-navy-900">₹{order.amount}</strong></div><div className="flex justify-between gap-4"><span>Frequency</span><strong className="text-navy-900">{order.frequency}</strong></div><div className="flex justify-between gap-4"><span>Purpose</span><strong className="text-right text-navy-900">{order.purpose}</strong></div><div className="flex justify-between gap-4"><span>Demo order</span><strong className="text-right text-navy-900">{order.orderId}</strong></div></div>
    <div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-navy-900/10 p-5"><p className="font-semibold text-navy-900">Optional UPI preview</p><p className="mt-2 text-sm text-ink-500">For this demo, UPI is only shown as a preview. The buttons below control the simulated backend result.</p><a href={upiUri} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"><ExternalLink className="size-4" aria-hidden="true" />Open UPI app</a></div><div className="rounded-2xl border border-navy-900/10 p-5 text-center">{qrDataUrl ? <img src={qrDataUrl} alt="Demo UPI QR code" className="mx-auto size-40" /> : <QrCode className="mx-auto size-10 text-ink-500" aria-hidden="true" />}<p className="mt-2 text-xs text-ink-500">Demo QR preview</p></div></div>
    <div className="grid gap-3 sm:grid-cols-3"><Button type="button" onClick={() => onOutcome("success")} loading={submitting}>Simulate Success</Button><Button type="button" onClick={() => onOutcome("failed")} variant="danger" loading={submitting}>Simulate Failure</Button><Button type="button" onClick={() => onOutcome("cancelled")} variant="outline" tone="light" loading={submitting}>Cancel Payment</Button></div>
    <Button type="button" variant="text" onClick={onBack}>Back to details</Button>
    {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
  </div>;
}

function DemoResult({ donation, onRestart }: { donation: ReceiptDonation; onRestart: () => void }) {
  const success = donation.status === "success";
  const downloadReceipt = () => {
    const pdf = new jsPDF();
    pdf.setFillColor(10, 20, 38);
    pdf.rect(0, 0, 210, 38, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text("MultiWorkWala Pvt. Ltd.", 20, 24);
    pdf.setTextColor(26, 29, 35);
    pdf.setFontSize(18);
    pdf.text("Demo Donation Receipt", 20, 62);
    pdf.setTextColor(180, 35, 24);
    pdf.setFontSize(10);
    pdf.text("DEMO / TEST TRANSACTION - PAYMENT NOT VERIFIED", 20, 72);
    pdf.setTextColor(26, 29, 35);
    pdf.setFontSize(12);
    pdf.text(`Donor: ${donation.anonymous ? "Anonymous donor" : donation.donor.fullName}`, 20, 92);
    pdf.text(`Amount: INR ${donation.amount}`, 20, 104);
    pdf.text(`Donation type: ${donation.frequency}`, 20, 116);
    pdf.text(`Purpose: ${donation.purpose ?? "General support"}`, 20, 128);
    pdf.text(`Reference: ${donation.paymentId || donation.orderId}`, 20, 140);
    pdf.text(`Status: ${donation.status.toUpperCase()}`, 20, 152);
    pdf.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, 20, 164);
    pdf.setFontSize(9);
    pdf.setTextColor(95, 103, 116);
    pdf.text("This receipt confirms a demo/test transaction only. No real payment was processed.", 20, 188);
    pdf.save(`${donation.orderId}-demo-receipt.pdf`);
  };
  return <div className="space-y-6"><div className={`rounded-3xl border p-6 text-center sm:p-10 ${success ? "border-brand-200 bg-brand-50" : "border-red-200 bg-red-50"}`}>{success ? <CheckCircle2 className="mx-auto size-12 text-brand-700" aria-hidden="true" /> : <XCircle className="mx-auto size-12 text-red-700" aria-hidden="true" />}<p className="mt-4 text-xs font-bold tracking-[0.18em] text-red-700 uppercase">Demo / Test Transaction</p><h3 className="mt-3 text-3xl font-medium text-navy-900">{success ? "Thank You for Supporting MultiWorkWala" : `Demo payment ${donation.status}`}</h3><p className="mt-3 text-ink-600">{success ? "Your simulated donation was recorded successfully." : "No real payment was processed and no donation amount was transferred."}</p></div>{success && <div className="rounded-3xl border border-navy-900/10 bg-white p-6 shadow-card"><dl className="grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-ink-500">Donor</dt><dd className="font-semibold text-navy-900">{donation.anonymous ? "Anonymous donor" : donation.donor.fullName}</dd></div><div><dt className="text-ink-500">Amount</dt><dd className="font-semibold text-navy-900">₹{donation.amount}</dd></div><div><dt className="text-ink-500">Donation type</dt><dd className="font-semibold text-navy-900">{donation.frequency}</dd></div><div><dt className="text-ink-500">Purpose</dt><dd className="font-semibold text-navy-900">{donation.purpose}</dd></div><div><dt className="text-ink-500">Reference</dt><dd className="font-semibold text-navy-900">{donation.paymentId || donation.orderId}</dd></div><div><dt className="text-ink-500">Status</dt><dd className="font-semibold text-brand-700">DEMO SUCCESS</dd></div></dl><div className="mt-6 flex flex-wrap gap-3"><Button type="button" onClick={downloadReceipt}>Download Receipt</Button><Button type="button" variant="outline" onClick={onRestart}>Make another demo donation</Button></div></div>}</div>;
}
