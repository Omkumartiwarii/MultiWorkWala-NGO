/** Makes a card's primary link cover the whole card while keeping one focus target. */
export const stretchedLink = "outline-none after:absolute after:inset-0 after:z-10 after:content-['']";

/**
 * Arch-topped frame (the site's "open doorway" motif) for 4:5 images.
 * Percentage radii keep the top a true semicircle without shrinking the bottom corners,
 * which fixed pixel radii do because CSS scales all corner radii together on overflow.
 */
export const archShape = "rounded-t-[50%_40%] rounded-b-3xl";
