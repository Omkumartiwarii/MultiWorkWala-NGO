import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/data/about";

const panels = [
  { id: "mission", label: "Our mission", text: aboutContent.mission },
  { id: "vision", label: "Our vision", text: aboutContent.vision },
];

export function MissionVision() {
  return (
    <Section tone="navy" labelledBy="mission-label" className="scroll-mt-20">
      <h2 className="sr-only">Mission and vision</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {panels.map((panel, index) => (
          <Reveal key={panel.id} delay={index * 0.1}>
            <article id={panel.id} className="scroll-mt-28 h-full rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
              <h3 id={index === 0 ? "mission-label" : undefined} className="font-sans text-sm font-semibold text-gold-300">
                {panel.label}
              </h3>
              <p className="mt-5 font-display text-2xl leading-snug text-ivory-50 sm:text-3xl">{panel.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
