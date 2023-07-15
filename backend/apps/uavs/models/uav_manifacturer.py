from apps.shared.models import TrackingModel
from apps.uavs.managers import UAVManifacturerManager
from django.db import models
from django.utils.text import slugify
from mptt.models import MPTTModel, TreeForeignKey
from parler.models import TranslatableModel, TranslatedFields


class UAVManifacturer(TrackingModel, TranslatableModel, MPTTModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=255),
        slug=models.SlugField(max_length=255),
    )
    parent = TreeForeignKey("self", on_delete=models.PROTECT, null=True, blank=True)

    objects = UAVManifacturerManager()

    class MPTTMeta:
        order_insertion_by = ["id"]

    def __str__(self) -> str:
        return str(self.id)

    # def _to_str(self) -> str:
    #     ancestors = self.get_ancestors(ascending=False, include_self=True)
    #     return " > ".join([ancestor.translations.name for ancestor in ancestors])
