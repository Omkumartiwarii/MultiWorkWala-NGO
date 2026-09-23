from rest_framework import serializers
from .models import (
    ContactEnquiry, Donation, Event, FAQ, FocusArea, GalleryItem, ImpactStat,
    ImageAsset, NewsStory, OrganizationProfile, Partner, Program, Project,
    Report, SiteSetting, TeamMember, Testimonial, VolunteerApplication,
    NewsletterSubscriber,
)


def asset_url(request, asset):
    if not asset:
        return {"src": "", "alt": ""}
    return {"src": request.build_absolute_uri(asset.image.url) if asset.image else "", "alt": asset.alt}


class AssetMixin:
    def asset(self, obj, field="image"):
        return asset_url(self.context["request"], getattr(obj, field, None))


class FocusAreaSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="key")
    shortTitle = serializers.CharField(source="short_title")
    class Meta:
        model = FocusArea
        fields = ["id", "title", "shortTitle", "description", "icon"]


class ProgramSerializer(AssetMixin, serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    category = serializers.CharField(source="category.key", read_only=True)
    impactHighlight = serializers.CharField(source="impact_highlight")
    targetBeneficiaries = serializers.CharField(source="target_beneficiaries")
    image = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()
    class Meta:
        model = Program
        fields = ["id", "slug", "title", "category", "description", "image", "location", "beneficiaries", "status", "impactHighlight", "featured", "verified", "overview", "objectives", "targetBeneficiaries", "approach", "activities", "stats", "gallery"]
    def get_image(self, obj): return self.asset(obj)
    def get_gallery(self, obj): return [asset_url(self.context["request"], item) for item in obj.gallery.all()]


class ProjectSerializer(ProgramSerializer):
    class Meta(ProgramSerializer.Meta):
        model = Project
        fields = ["id", "slug", "title", "category", "description", "image", "location", "status", "beneficiaries", "progress", "featured", "verified", "overview", "objectives", "activities", "impact", "timeline", "duration", "gallery"]
    def get_image(self, obj): return self.asset(obj)
    def get_gallery(self, obj): return [asset_url(self.context["request"], item) for item in obj.gallery.all()]


class ImpactStatSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="key")
    class Meta:
        model = ImpactStat
        fields = ["id", "label", "value", "suffix", "icon"]


class NewsStorySerializer(AssetMixin, serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    excerpt = serializers.CharField()
    publishedAt = serializers.DateTimeField(source="published_at")
    readingMinutes = serializers.IntegerField(source="reading_minutes")
    author = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    class Meta:
        model = NewsStory
        fields = ["id", "slug", "title", "excerpt", "category", "image", "author", "publishedAt", "readingMinutes", "featured"]
    def get_author(self, obj): return {"name": obj.author_name, "role": obj.author_role}
    def get_image(self, obj): return self.asset(obj)


class EventSerializer(AssetMixin, serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    startsAt = serializers.DateTimeField(source="starts_at")
    time = serializers.CharField(source="time_label")
    image = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ["id", "slug", "title", "description", "category", "image", "startsAt", "time", "location", "organizer"]
    def get_image(self, obj): return self.asset(obj)


class GallerySerializer(AssetMixin, serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    image = serializers.SerializerMethodField()
    class Meta:
        model = GalleryItem
        fields = ["id", "image", "caption", "category"]
    def get_image(self, obj): return asset_url(self.context["request"], obj.image)


class TeamSerializer(AssetMixin, serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    image = serializers.SerializerMethodField()
    class Meta:
        model = TeamMember
        fields = ["id", "name", "designation", "bio", "image", "linkedin"]
    def get_image(self, obj): return self.asset(obj)


class TestimonialSerializer(AssetMixin, serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    programSlug = serializers.CharField(source="program_slug")
    isDemo = serializers.BooleanField(source="is_demo")
    image = serializers.SerializerMethodField()
    class Meta:
        model = Testimonial
        fields = ["id", "slug", "name", "location", "program", "story", "programSlug", "image", "isDemo"]
    def get_image(self, obj): return self.asset(obj)


class PartnerSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    logo = serializers.SerializerMethodField()
    class Meta:
        model = Partner
        fields = ["id", "name", "category", "logo", "website"]
    def get_logo(self, obj): return self.context["request"].build_absolute_uri(obj.logo.url) if obj.logo else None


class OrganizationSerializer(serializers.ModelSerializer):
    address = serializers.ListField()
    logo = serializers.SerializerMethodField()
    class Meta:
        model = OrganizationProfile
        fields = ["name", "descriptor", "tagline", "email", "phone", "address", "logo"]
    def get_logo(self, obj): return self.context["request"].build_absolute_uri(obj.logo.url) if obj.logo else None


class ReportSerializer(serializers.ModelSerializer):
    fileUrl = serializers.SerializerMethodField()
    class Meta:
        model = Report
        fields = ["id", "title", "year", "type", "description", "fileUrl"]
    def get_fileUrl(self, obj): return self.context["request"].build_absolute_uri(obj.file.url) if obj.file else ""


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer"]


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["name", "email"]


class VolunteerSerializer(serializers.ModelSerializer):
    interests = serializers.ListField(child=serializers.CharField(), allow_empty=True)
    class Meta:
        model = VolunteerApplication
        fields = ["full_name", "email", "phone", "city", "state", "interests", "skills", "availability", "experience", "message"]


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ["amount", "frequency", "full_name", "email", "phone", "purpose"]


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ["name", "email", "phone", "subject", "message"]
