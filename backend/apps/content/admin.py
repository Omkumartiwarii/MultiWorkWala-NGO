from django.contrib import admin
from .models import ContactEnquiry, Donation, Event, FAQ, FocusArea, GalleryItem, ImpactStat, ImageAsset, NewsStory, OrganizationProfile, Partner, Program, Project, Report, SiteSetting, TeamMember, Testimonial, VolunteerApplication, NewsletterSubscriber

admin.site.site_header = "MultiWorkWala Pvt. Ltd. administration"
admin.site.site_title = "MultiWorkWala Pvt. Ltd."

@admin.register(ImageAsset)
class ImageAssetAdmin(admin.ModelAdmin):
    list_display = ["alt", "image"]
    search_fields = ["alt", "caption"]

@admin.register(OrganizationProfile)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "is_active", "updated_at"]

@admin.register(FocusArea)
class FocusAreaAdmin(admin.ModelAdmin):
    list_display = ["title", "key", "is_active"]
    prepopulated_fields = {"key": ("title",)}

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "status", "featured", "verified", "updated_at"]
    list_filter = ["status", "featured", "verified", "category"]
    search_fields = ["title", "description", "slug"]
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ["gallery"]

@admin.register(Project)
class ProjectAdmin(ProgramAdmin):
    list_display = ["title", "category", "status", "featured", "verified", "updated_at"]

@admin.register(NewsStory)
class NewsAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "published_at", "featured", "is_demo"]
    list_filter = ["category", "featured", "is_demo"]
    search_fields = ["title", "excerpt", "slug"]
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "starts_at", "location", "is_demo"]
    list_filter = ["category", "is_demo"]
    search_fields = ["title", "description", "location"]
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ["order_id", "full_name", "amount", "frequency", "status", "purpose", "created_at"]
    list_filter = ["status", "frequency", "payment_provider", "created_at"]
    search_fields = ["full_name", "email", "order_id", "payment_id", "purpose"]
    readonly_fields = ["order_id", "payment_id", "payment_provider", "provider_reference", "created_at", "updated_at"]
    fieldsets = [("Donation", {"fields": ["amount", "currency", "frequency", "purpose", "status"]}), ("Donor", {"fields": ["full_name", "email", "phone", "anonymous", "message"]}), ("Payment reference", {"fields": ["order_id", "payment_id", "payment_provider", "provider_reference", "created_at", "updated_at"]})]

for model in [ImpactStat, GalleryItem, TeamMember, Testimonial, Partner, VolunteerApplication, ContactEnquiry, NewsletterSubscriber, Report, FAQ, SiteSetting]:
    admin.site.register(model)
