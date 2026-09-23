import { Download } from "lucide-react";
import { organization } from "@/config/organization";
import { donationConfig } from "@/config/donation";

interface DemoDonationCertificateProps {
  donorName: string;
  amount: number;
  purpose: string;
  date: string;
}

export function DemoDonationCertificate({ donorName, amount, purpose, date }: DemoDonationCertificateProps) {
  const certificateNumber = `DEMO-${date.replaceAll("-", "")}-${String(amount).padStart(6, "0")}`;

  const printCertificate = () => {
    const popup = window.open("", "_blank", "width=900,height=700");
    if (!popup) return;
    popup.document.write(`<!doctype html><html><head><title>Demo Donation Certificate</title><style>body{margin:0;background:#f7f1e5;font-family:Georgia,serif;color:#101d33}.certificate{box-sizing:border-box;margin:40px auto;padding:64px;max-width:820px;background:#fffdf8;border:12px double #d9b04a;text-align:center}.logo{max-height:70px;max-width:260px;margin-bottom:24px}.label{font:600 12px Arial,sans-serif;letter-spacing:3px;color:#85631a;text-transform:uppercase}.name{font-size:38px;margin:20px 0;color:#115a4b}.copy{font:18px Arial,sans-serif;line-height:1.6}.details{margin:28px auto;padding:18px;border-top:1px solid #d9b04a;border-bottom:1px solid #d9b04a;font:15px Arial,sans-serif;line-height:1.8}.demo{font:700 12px Arial,sans-serif;color:#b42318;letter-spacing:1px}</style></head><body><main class="certificate"><img class="logo" src="${organization.logo}" alt="${organization.name}"><div class="demo">DEMO CERTIFICATE - PAYMENT NOT VERIFIED</div><p class="label">Donation Appreciation</p><h1>${escapeHtml(donorName)}</h1><p class="copy">Thank you for your support towards <strong>${escapeHtml(purpose)}</strong>.</p><div class="details">Amount: <strong>INR ${amount.toLocaleString("en-IN")}</strong><br>Date: ${date}<br>Certificate No: ${certificateNumber}<br>UPI reference: ${donationConfig.upiId}</div><p class="copy">Issued by ${organization.name}</p><p class="demo">Legal registration, tax exemption and payment verification details are pending confirmation.</p></main><script>window.onload=()=>window.print()</script></body></html>`);
    popup.document.close();
  };

  return <div className="rounded-3xl border-2 border-gold-400 bg-gold-50 p-6 shadow-card"><p className="text-xs font-bold tracking-[0.18em] text-red-700 uppercase">Demo certificate</p><h3 className="mt-2 text-2xl font-medium text-navy-900">Preview ready for {donorName}</h3><p className="mt-3 text-sm leading-relaxed text-ink-600">This is a demo appreciation certificate. It is not proof of a verified payment or tax-deductible donation.</p><button type="button" onClick={printCertificate} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"><Download className="size-4" aria-hidden="true" />Print / Save as PDF</button></div>;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}
