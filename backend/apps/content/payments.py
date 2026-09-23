from datetime import datetime
import secrets
from django.db import transaction
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from .models import Donation


class DemoPaymentService:
    provider = "demo"

    @staticmethod
    def order_id() -> str:
        return f"MWD-DEMO-{datetime.now().strftime('%Y%m%d')}-{secrets.token_hex(2).upper()}"

    @classmethod
    @transaction.atomic
    def create_order(cls, validated_data: dict) -> Donation:
        donation = Donation.objects.create(
            **validated_data,
            currency="INR",
            order_id=cls.order_id(),
            payment_provider=cls.provider,
            status="pending",
        )
        return donation

    @classmethod
    @transaction.atomic
    def complete(cls, donation: Donation, status: str) -> Donation:
        if donation.status != "pending":
            raise ValidationError({"status": "This demo payment has already been completed."})
        donation.status = status
        donation.payment_id = "" if status != "success" else f"MWP-DEMO-{secrets.token_hex(6).upper()}"
        donation.provider_reference = donation.payment_id
        donation.updated_at = timezone.now()
        donation.save(update_fields=["status", "payment_id", "provider_reference", "updated_at"])
        return donation


PAYMENT_SERVICES = {"demo": DemoPaymentService}
