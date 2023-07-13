from django.contrib.contenttypes.admin import GenericTabularInline
from apps.shared.models import Image


# Register your models here.
class ImageInline(GenericTabularInline):
    model = Image
