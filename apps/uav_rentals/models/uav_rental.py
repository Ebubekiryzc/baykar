from django.db import models
from django.contrib.auth import get_user_model
from django.forms import ValidationError

from apps.shared.models import TrackingModel
from apps.uavs.models import UAV


class UAVRental(TrackingModel):
    uav = models.ForeignKey(
        UAV, on_delete=models.SET_NULL, related_name="rentals", null=True
    )
    renter = models.ForeignKey(
        get_user_model(), on_delete=models.SET_NULL, related_name="rentals", null=True
    )
    start_date = models.DateTimeField(null=False, blank=False)
    end_date = models.DateTimeField(null=False, blank=False)

    def __str__(self) -> str:
        return f"{self.uav.name} - {self.renter.get_username()}"

    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError("Start date must be earlier than end date")

        conflicting_rentals = UAVRental.objects.filter(
            uav=self.uav,
            start_date__lte=self.end_date,
            end_date__gte=self.start_date,
        ).exclude(pk=self.pk)

        if conflicting_rentals.exists():
            raise ValidationError(
                "Another rental already exists for the specified uav within the specified date range."
            )
