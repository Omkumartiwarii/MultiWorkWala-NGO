from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, DonationViewSet, EventViewSet, FAQViewSet, FocusAreaViewSet, GalleryViewSet, ImpactViewSet, NewsViewSet, OrganizationViewSet, PartnerViewSet, ProgramViewSet, ProjectViewSet, ReportViewSet, SiteSettingViewSet, TeamViewSet, TestimonialViewSet, VolunteerViewSet, NewsletterViewSet

router = DefaultRouter()
router.register("programs", ProgramViewSet, basename="program")
router.register("projects", ProjectViewSet, basename="project")
router.register("news", NewsViewSet, basename="news")
router.register("events", EventViewSet, basename="event")
router.register("impact", ImpactViewSet, basename="impact")
router.register("gallery", GalleryViewSet, basename="gallery")
router.register("team", TeamViewSet, basename="team")
router.register("testimonials", TestimonialViewSet, basename="testimonial")
router.register("partners", PartnerViewSet, basename="partner")
router.register("focus-areas", FocusAreaViewSet, basename="focus-area")
router.register("organization", OrganizationViewSet, basename="organization")
router.register("reports", ReportViewSet, basename="report")
router.register("faq", FAQViewSet, basename="faq")
router.register("volunteers", VolunteerViewSet, basename="volunteer")
router.register("donations", DonationViewSet, basename="donation")
router.register("contact", ContactViewSet, basename="contact")
router.register("newsletter", NewsletterViewSet, basename="newsletter")
router.register("settings", SiteSettingViewSet, basename="setting")
urlpatterns = router.urls
