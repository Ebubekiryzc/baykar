from apps.shared.models import TrackingModel
from django.db import models
from parler.models import TranslatableModel, TranslatedFields


class UAVCategory(TrackingModel, TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=255, unique=True),
        slug=models.SlugField(max_length=255, unique=True),
    )

    def __str__(self) -> str:
        return str(self.id)
