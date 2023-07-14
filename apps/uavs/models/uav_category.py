from django.db import models
from django.utils.text import slugify
from parler.models import TranslatableModel, TranslatedFields

from apps.shared.models import TrackingModel


class UAVCategory(TrackingModel, TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=255, unique=True),
        slug=models.SlugField(max_length=255, unique=True),
    )

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.username)
        super().save(*args, **kwargs)
