import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { moreNav } from "@/constants/navigation";
import { cn } from "@/utils/cn";

/** Desktop dropdown for secondary pages. Disclosure pattern: Escape closes, focus leaving closes. */
export function MoreMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const { pathname } = useLocation();
  const isActive = moreNav.some((item) => pathname.startsWith(item.to));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative" onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
          isActive || open ? "bg-navy-900/5 text-navy-900" : "text-ink-600 hover:bg-navy-900/5 hover:text-navy-900",
        )}
      >
        More
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-56 rounded-2xl border border-navy-900/10 bg-white p-2 shadow-lift"
          >
            {moreNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive: active }) =>
                    cn(
                      "block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                      active ? "bg-brand-50 text-brand-800" : "text-ink-600 hover:bg-navy-900/5 hover:text-navy-900",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
