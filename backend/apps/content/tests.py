from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from .models import NewsletterSubscriber


class PublicApiTests(APITestCase):
    def test_public_program_list_is_available(self):
        response = self.client.get("/api/v1/programs/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_newsletter_is_public_but_admin_list_is_protected(self):
        response = self.client.post("/api/v1/newsletter/", {"name": "Demo Visitor", "email": "visitor@example.com"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsletterSubscriber.objects.count(), 1)
        response = self.client.get("/api/v1/newsletter/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_can_read_submissions(self):
        user = get_user_model().objects.create_superuser("admin", "admin@example.com", "safe-password-for-tests")
        self.client.force_authenticate(user=user)
        response = self.client.get("/api/v1/newsletter/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)