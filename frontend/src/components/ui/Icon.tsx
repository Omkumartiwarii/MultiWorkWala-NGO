import type { LucideProps } from "lucide-react";
import { iconMap } from "@/utils/icons";
import type { IconName } from "@/types";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

/** Decorative icon looked up by name. Hidden from assistive tech. */
export function Icon({ name, ...rest }: IconProps) {
  const Component = iconMap[name];
  return <Component aria-hidden="true" {...rest} />;
}
