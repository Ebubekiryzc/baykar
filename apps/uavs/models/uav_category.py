from django.db import models
from apps.shared.models import TrackingModel


class UAVCategory(TrackingModel):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
