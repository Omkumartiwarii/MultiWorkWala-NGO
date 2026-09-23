from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from .models import ContactEnquiry, Donation, Event, FAQ, FocusArea, GalleryItem, ImpactStat, NewsStory, OrganizationProfile, Partner, Program, Project, Report, SiteSetting, TeamMember, Testimonial, VolunteerApplication, NewsletterSubscriber
from .serializers import ContactSerializer, DonationSerializer, EventSerializer, FAQSerializer, FocusAreaSerializer, GallerySerializer, ImpactStatSerializer, NewsStorySerializer, OrganizationSerializer, PartnerSerializer, ProgramSerializer, ProjectSerializer, ReportSerializer, TeamSerializer, TestimonialSerializer, VolunteerSerializer, NewsletterSerializer
from .payments import DemoPaymentService


class PublicReadSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]


class ProgramViewSet(PublicReadSet):
    queryset = Program.objects.select_related("category", "image").prefetch_related("gallery").all()
    serializer_class = ProgramSerializer
    lookup_field = "slug"
    search_fields = ["title", "description", "location"]
    filterset_fields = ["category__key", "status", "featured"]
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(verified=True) if not self.request.user.is_staff else qs
    @action(detail=False, methods=["get"])
    def featured(self, request):
        return Response(self.get_serializer(self.get_queryset().filter(featured=True)[:3], many=True).data)
    @action(detail=True, methods=["get"])
    def related(self, request, slug=None):
        current = self.get_object()
        qs = self.get_queryset().exclude(pk=current.pk).order_by("-category_id")[:3]
        return Response(self.get_serializer(qs, many=True).data)


class ProjectViewSet(ProgramViewSet):
    queryset = Project.objects.select_related("category", "image").prefetch_related("gallery").all()
    serializer_class = ProjectSerializer


class NewsViewSet(PublicReadSet):
    queryset = NewsStory.objects.select_related("image").all()
    serializer_class = NewsStorySerializer
    lookup_field = "slug"
    search_fields = ["title", "excerpt", "category"]
    filterset_fields = ["category", "featured"]


class EventViewSet(PublicReadSet):
    queryset = Event.objects.select_related("image").all()
    serializer_class = EventSerializer
    lookup_field = "slug"
    search_fields = ["title", "description", "location", "category"]
    filterset_fields = ["category"]
    @action(detail=False, methods=["get"])
    def upcoming(self, request):
        qs = self.get_queryset().filter(starts_at__gte=timezone.now())[:3]
        return Response(self.get_serializer(qs, many=True).data)


class ImpactViewSet(PublicReadSet):
    queryset = ImpactStat.objects.filter(is_active=True, verified=True)
    serializer_class = ImpactStatSerializer


class GalleryViewSet(PublicReadSet):
    queryset = GalleryItem.objects.filter(is_active=True).select_related("image")
    serializer_class = GallerySerializer
    filterset_fields = ["category"]


class TeamViewSet(PublicReadSet):
    queryset = TeamMember.objects.filter(is_published=True).select_related("image")
    serializer_class = TeamSerializer


class TestimonialViewSet(PublicReadSet):
    queryset = Testimonial.objects.filter(is_published=True, is_demo=False).select_related("image")
    serializer_class = TestimonialSerializer
    filterset_fields = ["program_slug"]


class PartnerViewSet(PublicReadSet):
    queryset = Partner.objects.filter(is_published=True)
    serializer_class = PartnerSerializer
    filterset_fields = ["category"]


class FocusAreaViewSet(PublicReadSet):
    queryset = FocusArea.objects.filter(is_active=True)
    serializer_class = FocusAreaSerializer


class OrganizationViewSet(PublicReadSet):
    queryset = OrganizationProfile.objects.filter(is_active=True)
    serializer_class = OrganizationSerializer


class ReportViewSet(PublicReadSet):
    queryset = Report.objects.filter(is_published=True)
    serializer_class = ReportSerializer
    filterset_fields = ["type", "year"]


class FAQViewSet(PublicReadSet):
    queryset = FAQ.objects.filter(is_published=True)
    serializer_class = FAQSerializer


class AdminModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]


class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerSerializer
    def get_permissions(self): return [AllowAny()] if self.action == "create" else [IsAdminUser()]


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    def get_permissions(self):
        public_actions = {"create", "create_order", "demo_success", "demo_failed", "demo_cancel", "retrieve"}
        return [AllowAny()] if self.action in public_actions else [IsAdminUser()]

    def create(self, request, *args, **kwargs):
        return self.create_order(request, *args, **kwargs)

    @action(detail=False, methods=["post"], url_path="create")
    def create_order(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        donation = DemoPaymentService.create_order(serializer.validated_data)
        return Response(self.get_serializer(donation).data, status=status.HTTP_201_CREATED)

    def _complete_demo(self, request, target_status):
        order_id = request.data.get("order_id")
        if not order_id:
            return Response({"order_id": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        try:
            donation = self.get_queryset().get(order_id=order_id)
        except Donation.DoesNotExist:
            return Response({"detail": "Donation order not found."}, status=status.HTTP_404_NOT_FOUND)
        donation = DemoPaymentService.complete(donation, target_status)
        return Response(self.get_serializer(donation).data)

    @action(detail=False, methods=["post"], url_path="demo-success")
    def demo_success(self, request):
        return self._complete_demo(request, "success")

    @action(detail=False, methods=["post"], url_path="demo-failed")
    def demo_failed(self, request):
        return self._complete_demo(request, "failed")

    @action(detail=False, methods=["post"], url_path="demo-cancel")
    def demo_cancel(self, request):
        return self._complete_demo(request, "cancelled")


class ContactViewSet(viewsets.ModelViewSet):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactSerializer
    def get_permissions(self): return [AllowAny()] if self.action == "create" else [IsAdminUser()]


class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSerializer
    def get_permissions(self): return [AllowAny()] if self.action == "create" else [IsAdminUser()]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        NewsletterSubscriber.objects.update_or_create(email=serializer.validated_data["email"], defaults={"name": serializer.validated_data["name"], "is_subscribed": True})
        return Response({"detail": "Subscription received."}, status=status.HTTP_201_CREATED)


class SiteSettingViewSet(PublicReadSet):
    queryset = SiteSetting.objects.filter(is_public=True)
    class Serializer(serializers.ModelSerializer):
        class Meta:
            model = SiteSetting
            fields = ["key", "value"]
    serializer_class = Serializer
