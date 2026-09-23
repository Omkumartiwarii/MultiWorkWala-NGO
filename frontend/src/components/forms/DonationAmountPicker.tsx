import { useId, useState } from "react";
import { DONATION_PRESETS, MIN_DONATION } from "@/constants/donation";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format";

interface DonationAmountPickerProps {
  /** Selected amount in INR, or null when nothing valid is selected. */
  value: number | null;
  onChange: (amount: number | null) => void;
  /** Use "dark" on navy backgrounds. */
  tone?: "light" | "dark";
}

const chipBase =
  "flex h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors " +
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-400";

const chipTone = {
  light:
    "border-navy-900/20 text-navy-900 hover:border-navy-900/50 peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-ivory-50",
  dark: "border-white/25 text-ivory-100 hover:border-white/60 peer-checked:border-gold-400 peer-checked:bg-gold-400 peer-checked:text-navy-950",
};

export function DonationAmountPicker({ value, onChange, tone = "light" }: DonationAmountPickerProps) {
  const groupName = useId();
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState("");

  const customNumber = Number(customText);
  const customInvalid =
    customMode && customText !== "" && (!Number.isFinite(customNumber) || customNumber < MIN_DONATION);

  const emitCustom = (text: string) => {
    const amount = Number(text);
    onChange(text !== "" && Number.isFinite(amount) && amount >= MIN_DONATION ? Math.floor(amount) : null);
  };

  return (
    <fieldset>
      <legend className="sr-only">Choose a donation amount</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {DONATION_PRESETS.map((amount) => (
          <label key={amount} className="relative">
            <input
              type="radio"
              name={groupName}
              className="peer sr-only"
              checked={!customMode && value === amount}
              onChange={() => {
                setCustomMode(false);
                onChange(amount);
              }}
            />
            <span className={cn(chipBase, chipTone[tone])}>{formatCurrency(amount)}</span>
          </label>
        ))}
        <label className="relative">
          <input
            type="radio"
            name={groupName}
            className="peer sr-only"
            checked={customMode}
            onChange={() => {
              setCustomMode(true);
              emitCustom(customText);
            }}
          />
          <span className={cn(chipBase, chipTone[tone])}>Custom</span>
        </label>
      </div>

      {customMode && (
        <div className="mt-4">
          <label
            htmlFor={`${groupName}-custom`}
            className={cn("mb-2 block text-sm font-semibold", tone === "dark" ? "text-ivory-100" : "text-navy-900")}
          >
            Enter an amount in rupees
          </label>
          <div className="relative">
            <span aria-hidden="true" className="absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-ink-500">
              ₹
            </span>
            <input
              id={`${groupName}-custom`}
              type="number"
              inputMode="numeric"
              min={MIN_DONATION}
              step={1}
              value={customText}
              onChange={(event) => {
                setCustomText(event.target.value);
                emitCustom(event.target.value);
              }}
              aria-invalid={customInvalid || undefined}
              aria-describedby={customInvalid ? `${groupName}-error` : undefined}
              className={cn(
                "h-12 w-full rounded-xl border bg-white pr-4 pl-9 text-base text-navy-900",
                customInvalid ? "border-red-600" : "border-navy-900/20",
              )}
            />
          </div>
          {customInvalid && (
            <p
              id={`${groupName}-error`}
              className={cn("mt-2 text-sm font-medium", tone === "dark" ? "text-red-200" : "text-red-700")}
            >
              The minimum donation is {formatCurrency(MIN_DONATION)}.
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}
