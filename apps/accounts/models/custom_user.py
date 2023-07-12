from django.db import models
from django.contrib.auth.models import AbstractUser

from apps.shared.models import TrackingModel


class CustomUser(AbstractUser, TrackingModel):
    slug = models.SlugField(max_length=255, unique=True)
    biography = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    profile_photo = models.ImageField(
        upload_to="profile-photos/", null=True, blank=True
    )
    contact_number = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["id"]),
            models.Index(fields=["username"]),
        ]

    def __str__(self) -> str:
        return self._to_string()

    def _to_string(self) -> str:
        result = self.username
        if self.get_full_name():
            result += f" - {self.get_full_name()}"

        return result
