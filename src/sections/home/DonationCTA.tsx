import { useState } from "react";
import { Heart, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { DonationAmountPicker } from "@/components/forms/DonationAmountPicker";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PAYMENT_NOTICE } from "@/constants/donation";
import { donationCtaContent as content } from "@/data/homeContent";
import { donateUrl } from "@/utils/links";

export function DonationCTA() {
  const [amount, setAmount] = useState<number | null>(2500);

  return (
    <Section tone="white" labelledBy="donation-heading" spacing="compact">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-950 px-5 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-gold-500/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-brand-600/25 blur-3xl" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <SectionHeading id="donation-heading" tone="dark" title={content.title} description={content.description} />

            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-8">
              <DonationAmountPicker value={amount} onChange={setAmount} tone="dark" />
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink
                  to={donateUrl({ amount, frequency: "one-time" })}
                  size="lg"
                  fullWidth
                  leftIcon={<Heart className="size-5" aria-hidden="true" />}
                >
                  Donate Now
                </ButtonLink>
                <ButtonLink
                  to={donateUrl({ amount, frequency: "monthly" })}
                  size="lg"
                  variant="outline"
                  tone="dark"
                  fullWidth
                >
                  Become a Monthly Supporter
                </ButtonLink>
              </div>
              <p className="mt-5 flex items-start gap-2 text-sm text-navy-200">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
                {PAYMENT_NOTICE}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
