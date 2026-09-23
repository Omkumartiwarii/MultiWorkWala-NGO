# NGO Image Asset Replacement Specification

These assets belong to one documentary photography campaign for the organization. Use authentic Indian community environments, natural daylight, candid interaction, realistic skin texture and respectful compositions. Do not add text, logos, watermarks, fabricated statistics or identifiable claims. Obtain consent and release documentation before publishing recognizable people, especially children.

Until supplied, the application uses the existing SVG illustration as a temporary fallback. The preferred production files belong in `public/images/ngo/` as WebP files using the exact names below.

| Filename | Section | Subject | Exact Scene | Aspect Ratio | Recommended Size |
|---|---|---|---|---:|---:|
| `hero-community.webp` | Home hero | Volunteers and community | Diverse Indian NGO volunteers listening and helping local families in a shaded outdoor neighbourhood setting; leave calm negative space on the left for hero copy. | 4:5 | 1200x1500 |
| `about-community.webp` | About intro | Community partnership | NGO workers sitting with local families during a relaxed community conversation; warm landscape editorial framing with natural expressions. | 4:5 | 1200x1500 |
| `about-community1.webp` | About/story support | Community interaction | A field worker speaking with residents outside a modest community facility, with the environment visible and no staged posing. | 3:2 | 1500x1000 |
| `children-1.webp` | Child welfare program | Learning and reading | Indian children reading and working together around books in a bright, simple learning space with a facilitator nearby. | 4:3 | 1200x900 |
| `children-2.webp` | Child welfare project | Safe play and learning | Children participating in a supervised creative learning or play activity in a community centre; dignified, candid and inclusive. | 4:3 | 1200x900 |
| `education-1.webp` | Education program | Classroom support | Teacher or NGO facilitator helping two or three children with books at a community learning table; show concentration and participation. | 4:3 | 1200x900 |
| `education-2.webp` | Education project | Digital/skill education | Young people sharing a laptop or practical learning materials with a facilitator in a modest digital skills class. | 16:10 | 1440x900 |
| `healthcare-1.webp` | Healthcare program | Health awareness | Community health worker greeting and speaking with a family at an outdoor or simple indoor health camp; no invasive medical imagery. | 4:3 | 1200x900 |
| `healthcare-2.webp` | Healthcare project | Basic consultation | Indian doctor or health worker providing respectful basic consultation to an adult participant at a community health camp. | 16:10 | 1440x900 |
| `women-1.webp` | Women empowerment program | Vocational training | Women learning a practical livelihood skill together in a modest training room, with tools or materials visible and candid collaboration. | 4:3 | 1200x900 |
| `women-2.webp` | Women empowerment/project | Women-led enterprise | Women collaborating on a small production or business activity in their local workspace; focus on agency, skill and peer support. | 16:10 | 1440x900 |
| `environment-1.webp` | Environment program | Tree plantation | Residents and volunteers planting a young tree together in a real Indian neighbourhood, with hands and soil visible but no staged celebration. | 4:3 | 1200x900 |
| `environment-2.webp` | Environment project | Cleanliness/sustainability | Community volunteers sorting waste or maintaining a shared green space during a practical neighbourhood activity. | 16:10 | 1440x900 |
| `community-1.webp` | Community program | Outreach | NGO volunteers sharing information or essential support with residents in an organized, respectful outreach setting. | 4:3 | 1200x900 |
| `community-2.webp` | Community project | Local development | Residents and volunteers discussing a neighbourhood improvement activity near a shared community facility. | 16:10 | 1440x900 |
| `volunteers-1.webp` | Volunteer program | Volunteer preparation | A small group of Indian NGO volunteers sorting materials and briefing one another before a community activity. | 4:3 | 1200x900 |
| `volunteers-2.webp` | Volunteer/story support | Volunteer participation | Volunteers working directly with community members during an inclusive outreach or learning session. | 16:10 | 1440x900 |
| `events-1.webp` | Events/program event | Community gathering | A real-feeling NGO awareness or learning event with Indian families and volunteers participating in a practical activity; wide composition. | 16:9 | 1600x900 |
| `events-2.webp` | Events/project event | Workshop/gathering | Diverse community members engaged in a local workshop or social initiative, showing participation rather than a posed group portrait. | 16:9 | 1600x900 |
| `leadership-1.webp` | Team/leadership | Program planning | NGO leadership and field staff reviewing maps, notes or program materials around a table in a modest professional workspace. | 4:3 | 1200x900 |
| `leadership-2.webp` | Team/leadership | Collaborative decision-making | Indian NGO team members discussing community program plans in a bright office, candid professional 4:3 editorial composition. | 4:3 | 1200x900 |
| `impact-story.webp` | Home impact story | Human-centered impact | A genuine quiet moment of connection between a community participant and an NGO worker after a learning, health or support interaction; emotional but not dramatic. | 3:2 | 1500x1000 |

## Production Rules

- Keep the same documentary campaign across all files: Indian locations, natural daylight, restrained warm colour, authentic expressions and varied ages/backgrounds.
- Prefer candid interaction over eye-contact posing. Avoid corporate offices, generic uniforms, perfect faces, excessive HDR, cinematic grading and poverty-as-spectacle.
- Do not publish identifiable beneficiary imagery without consent. Use respectful framing for children and healthcare participants.
- Crop safely for the specified ratio. Preserve faces, hands and the main interaction when using `object-fit: cover`.
- Export optimized WebP files at the listed dimensions. Keep hero and banner files under approximately 350 KB where quality permits; cards under approximately 220 KB.
- The React app requests `/images/ngo/<filename>.webp` first and falls back to the existing `/images/<filename>.svg` until the WebP is present.
