from django.core.validators import FileExtensionValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify


def validate_upload_size(file):
    if file.size > 10 * 1024 * 1024:
        from django.core.exceptions import ValidationError
        raise ValidationError("Uploaded files must be 10 MB or smaller.")


class Timestamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ImageAsset(models.Model):
    image = models.ImageField(upload_to="ngo/images/%Y/%m/", validators=[FileExtensionValidator(["jpg", "jpeg", "png", "webp"]), validate_upload_size])
    alt = models.CharField(max_length=240)
    caption = models.CharField(max_length=240, blank=True)

    def __str__(self):
        return self.alt


class OrganizationProfile(Timestamped):
    name = models.CharField(max_length=160)
    descriptor = models.CharField(max_length=160, blank=True)
    tagline = models.CharField(max_length=240, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    address = models.JSONField(default=list, blank=True)
    logo = models.ImageField(upload_to="ngo/branding/", validators=[validate_upload_size], blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class FocusArea(Timestamped):
    key = models.SlugField(max_length=80, unique=True)
    title = models.CharField(max_length=120)
    short_title = models.CharField(max_length=80)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=80, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Program(Timestamped):
    STATUS_CHOICES = [("ongoing", "Ongoing"), ("completed", "Completed"), ("upcoming", "Upcoming")]
    slug = models.SlugField(max_length=180, unique=True)
    title = models.CharField(max_length=240)
    category = models.ForeignKey(FocusArea, on_delete=models.PROTECT, related_name="programs")
    description = models.TextField()
    image = models.ForeignKey(ImageAsset, on_delete=models.SET_NULL, null=True, blank=True, related_name="program_covers")
    location = models.CharField(max_length=180, blank=True)
    beneficiaries = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="ongoing")
    impact_highlight = models.CharField(max_length=300, blank=True)
    featured = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    overview = models.TextField(blank=True)
    objectives = models.JSONField(default=list, blank=True)
    target_beneficiaries = models.TextField(blank=True)
    approach = models.TextField(blank=True)
    activities = models.JSONField(default=list, blank=True)
    stats = models.JSONField(default=list, blank=True)
    gallery = models.ManyToManyField(ImageAsset, blank=True, related_name="program_galleries")

    class Meta:
        ordering = ["title"]
        indexes = [models.Index(fields=["status", "featured"]), models.Index(fields=["category", "status"])]

    def __str__(self):
        return self.title


class Project(Timestamped):
    STATUS_CHOICES = Program.STATUS_CHOICES
    slug = models.SlugField(max_length=180, unique=True)
    title = models.CharField(max_length=240)
    category = models.ForeignKey(FocusArea, on_delete=models.PROTECT, related_name="projects")
    description = models.TextField()
    image = models.ForeignKey(ImageAsset, on_delete=models.SET_NULL, null=True, blank=True, related_name="project_covers")
    location = models.CharField(max_length=180, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="ongoing")
    beneficiaries = models.PositiveIntegerField(default=0)
    progress = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0)])
    featured = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    overview = models.TextField(blank=True)
    objectives = models.JSONField(default=list, blank=True)
    activities = models.JSONField(default=list, blank=True)
    impact = models.JSONField(default=list, blank=True)
    timeline = models.JSONField(default=list, blank=True)
    duration = models.CharField(max_length=120, blank=True)
    gallery = models.ManyToManyField(ImageAsset, blank=True, related_name="project_galleries")

    class Meta:
        ordering = ["title"]
        indexes = [models.Index(fields=["status", "featured"]), models.Index(fields=["category", "status"])]

    def __str__(self):
        return self.title


class ImpactStat(Timestamped):
    key = models.SlugField(max_length=100, unique=True)
    label = models.CharField(max_length=160)
    value = models.PositiveIntegerField(default=0)
    suffix = models.CharField(max_length=12, blank=True)
    icon = models.CharField(max_length=80, blank=True)
    verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.label


class NewsStory(Timestamped):
    CATEGORY_CHOICES = [(value, value) for value in ["Impact", "Community", "Education", "Healthcare", "Women Empowerment", "Child Welfare", "Environment", "Volunteer", "Events", "Organization Updates"]]
    slug = models.SlugField(max_length=180, unique=True)
    title = models.CharField(max_length=240)
    excerpt = models.TextField()
    category = models.CharField(max_length=80, choices=CATEGORY_CHOICES)
    image = models.ForeignKey(ImageAsset, on_delete=models.SET_NULL, null=True, blank=True, related_name="news_covers")
    author_name = models.CharField(max_length=160, default="Editorial Team")
    author_role = models.CharField(max_length=160, blank=True)
    published_at = models.DateTimeField()
    reading_minutes = models.PositiveSmallIntegerField(default=1)
    featured = models.BooleanField(default=False)
    is_demo = models.BooleanField(default=True)
    body = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-published_at"]
        indexes = [models.Index(fields=["category", "-published_at"]), models.Index(fields=["featured", "-published_at"])]

    def __str__(self):
        return self.title


class Event(Timestamped):
    slug = models.SlugField(max_length=180, unique=True)
    title = models.CharField(max_length=240)
    description = models.TextField()
    category = models.CharField(max_length=100)
    image = models.ForeignKey(ImageAsset, on_delete=models.SET_NULL, null=True, blank=True, related_name="event_covers")
    starts_at = models.DateTimeField()
    time_label = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=240, blank=True)
    organizer = models.CharField(max_length=160, blank=True)
    is_demo = models.BooleanField(default=True)

    class Meta:
        ordering = ["starts_at"]
        indexes = [models.Index(fields=["starts_at"]), models.Index(fields=["category", "starts_at"])]

    def __str__(self):
        return self.title


class GalleryItem(Timestamped):
    CATEGORY_CHOICES = [(value, value) for value in ["programs", "events", "community", "team", "campaigns"]]
    image = models.ForeignKey(ImageAsset, on_delete=models.CASCADE, related_name="gallery_items")
    caption = models.CharField(max_length=240, blank=True)
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.caption or str(self.image)


class TeamMember(Timestamped):
    name = models.CharField(max_length=160)
    designation = models.CharField(max_length=160)
    bio = models.TextField()
    image = models.ForeignKey(ImageAsset, on_delete=models.SET_NULL, null=True, blank=True, related_name="team_photos")
    linkedin = models.URLField(blank=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Testimonial(Timestamped):
    slug = models.SlugField(max_length=180, unique=True)
    name = models.CharField(max_length=160)
    location = models.CharField(max_length=160)
    program = models.CharField(max_length=160)
    program_slug = models.SlugField(blank=True)
    story = models.TextField()
    image = models.ForeignKey(ImageAsset, on_delete=models.SET_NULL, null=True, blank=True, related_name="testimonial_photos")
    is_demo = models.BooleanField(default=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Partner(Timestamped):
    CATEGORY_CHOICES = [(value, value) for value in ["csr", "institutional", "community", "supporting"]]
    name = models.CharField(max_length=180)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    logo = models.ImageField(upload_to="ngo/partners/", validators=[validate_upload_size], blank=True, null=True)
    website = models.URLField(blank=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class VolunteerApplication(Timestamped):
    STATUS_CHOICES = [("new", "New"), ("reviewing", "Reviewing"), ("contacted", "Contacted"), ("closed", "Closed")]
    full_name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    interests = models.JSONField(default=list)
    skills = models.TextField()
    availability = models.CharField(max_length=160)
    experience = models.TextField(blank=True)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")

    class Meta:
        indexes = [models.Index(fields=["status", "created_at"])]


class Donation(Timestamped):
    FREQUENCY_CHOICES = [("one-time", "One-time"), ("monthly", "Monthly")]
    STATUS_CHOICES = [("enquiry", "Enquiry"), ("pending", "Pending"), ("paid", "Paid"), ("failed", "Failed"), ("refunded", "Refunded")]
    amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(1)])
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)
    full_name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="enquiry")
    payment_provider = models.CharField(max_length=40, blank=True)
    provider_reference = models.CharField(max_length=180, blank=True)


class ContactEnquiry(Timestamped):
    STATUS_CHOICES = [("new", "New"), ("in_progress", "In progress"), ("resolved", "Resolved")]
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    subject = models.CharField(max_length=240)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")


class NewsletterSubscriber(Timestamped):
    name = models.CharField(max_length=160)
    email = models.EmailField(unique=True)
    is_subscribed = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]


class Report(Timestamped):
    TYPE_CHOICES = [(value, value.title()) for value in ["annual", "financial", "impact", "registration", "certificate", "policy"]]
    title = models.CharField(max_length=240)
    year = models.PositiveIntegerField()
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="ngo/reports/", validators=[FileExtensionValidator(["pdf", "doc", "docx"]), validate_upload_size])
    is_published = models.BooleanField(default=False)


class FAQ(Timestamped):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]


class SiteSetting(Timestamped):
    key = models.SlugField(max_length=120, unique=True)
    value = models.JSONField(default=dict)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return self.key
