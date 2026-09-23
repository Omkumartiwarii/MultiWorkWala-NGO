import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Mail, Phone, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { organization } from "@/config/organization";
import { moreNav, primaryNav } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";

interface MobileMenuProps {
  open: boolean;
  /** Must be a stable callback (useCallback). */
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] xl:hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="absolute top-0 right-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-ivory-50 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-20 shrink-0 items-center justify-between px-5">
              <Logo onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-5 pt-4 pb-6">
              <ul>
                {primaryNav.map((item) => (
                  <li key={item.to} className="border-b border-navy-900/10">
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "flex min-h-14 items-center font-display text-2xl transition-colors",
                          isActive ? "text-brand-700" : "text-navy-900 hover:text-brand-700",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <p className="mt-8 mb-3 text-sm font-semibold text-ink-500">More</p>
              <ul className="grid grid-cols-2 gap-x-4">
                {moreNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "flex min-h-12 items-center text-base font-semibold",
                          isActive ? "text-brand-700" : "text-ink-700 hover:text-brand-700",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 space-y-4 border-t border-navy-900/10 bg-white px-5 py-6">
              <ButtonLink
                to={ROUTES.donate}
                onClick={onClose}
                size="lg"
                fullWidth
                leftIcon={<Heart className="size-5" aria-hidden="true" />}
              >
                Donate Now
              </ButtonLink>
              <div className="space-y-1 text-sm text-ink-600">
                <a
                  href={`mailto:${organization.email}`}
                  className="flex min-h-10 items-center gap-2 hover:text-brand-700"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {organization.email}
                </a>
                <a href={organization.phoneHref} className="flex min-h-10 items-center gap-2 hover:text-brand-700">
                  <Phone className="size-4" aria-hidden="true" />
                  {organization.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
