from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from apps.uavs.models import UAVCategory, UAVManifacturer
from apps.shared.models import TrackingModel


class UAV(TrackingModel):
    name = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    uav_category = models.ForeignKey(
        UAVCategory, on_delete=models.PROTECT, related_name="uavs"
    )
    uav_manifacturer = models.ForeignKey(
        UAVManifacturer, on_delete=models.PROTECT, related_name="uavs"
    )
    weight = models.FloatField()
    images = GenericRelation("shared.Image")

    def __str__(self) -> str:
        return self.name
