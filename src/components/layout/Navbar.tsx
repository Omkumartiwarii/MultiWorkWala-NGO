import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { Heart, Menu } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { MoreMenu } from "./MoreMenu";

export function Navbar() {
  const scrolled = useScrolled(12);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "border-b border-navy-900/10 bg-ivory-50/95 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-ivory-100",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "relative block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-navy-900/5 text-navy-900"
                          : "text-ink-600 hover:bg-navy-900/5 hover:text-navy-900",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
              <li>
                <MoreMenu />
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden min-[480px]:block">
              <ButtonLink to={ROUTES.donate} size="sm" leftIcon={<Heart className="size-4" aria-hidden="true" />}>
                Donate Now
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5 xl:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
