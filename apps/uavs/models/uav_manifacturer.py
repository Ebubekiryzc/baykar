from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

from apps.shared.models import TrackingModel


class UAVManifacturer(TrackingModel, MPTTModel):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    parent = TreeForeignKey("self", on_delete=models.PROTECT, null=True, blank=True)

    class MPTTMeta:
        order_insertion_by = ["id"]

    def __str__(self) -> str:
        ancestors = self.get_ancestors(ascending=False, include_self=True)
        return " > ".join([ancestor.name for ancestor in ancestors])
