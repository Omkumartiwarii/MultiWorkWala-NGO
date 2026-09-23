from django.core.management.base import BaseCommand
from apps.content.models import FocusArea, OrganizationProfile


class Command(BaseCommand):
    help = "Creates clearly unverified structural demo records; never creates fake impact, partner, team, or donation claims."

    def handle(self, *args, **options):
        areas = {
            "education": ("Education", "Education", "Learning access and educational support.", "graduation"),
            "healthcare": ("Healthcare", "Healthcare", "Community health awareness and support.", "health"),
            "women": ("Women Empowerment", "Women", "Skills and livelihood opportunities for women.", "women"),
            "children": ("Child Welfare", "Children", "Safe learning and support for children.", "children"),
            "community": ("Community Development", "Community", "Community-led development and participation.", "community"),
            "environment": ("Environment", "Environment", "Sustainable neighbourhood activities.", "environment"),
        }
        for key, (title, short_title, description, icon) in areas.items():
            FocusArea.objects.update_or_create(key=key, defaults={"title": title, "short_title": short_title, "description": description, "icon": icon, "is_active": True})
        OrganizationProfile.objects.get_or_create(name="MultiWorkWala Pvt. Ltd.", defaults={"descriptor": "Social Impact Initiative", "is_active": True, "address": []})
        self.stdout.write(self.style.SUCCESS("Created safe structural demo focus areas and organization profile. All content remains unverified."))