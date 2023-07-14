from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from parler.admin import TranslatableAdmin

from apps.shared.admin import ImageInline
from apps.uavs.models import *


# Register your models here.
@admin.register(UAV)
class UAVAdmin(TranslatableAdmin):
    list_display = [
        "id",
        "name",
        "slug",
        "uav_manifacturer",
        "weight",
        "created_at",
        "updated_at",
    ]
    list_filter = ["uav_manifacturer", "uav_category", "created_at", "updated_at"]
    search_fields = ["name", "slug"]
    inlines = [ImageInline]

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("name",)}


@admin.register(UAVCategory)
class UAVCategoryAdmin(TranslatableAdmin):
    list_display = ["id", "name", "slug", "created_at", "updated_at"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["name", "slug"]

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("name",)}


@admin.register(UAVManifacturer)
class UAVManifacturerAdmin(DraggableMPTTAdmin, TranslatableAdmin):
    list_display = [
        "tree_actions",
        "indented_title",
        "id",
        "name",
        "slug",
    ]
    list_display_links = ["indented_title"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["name", "slug"]

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("name",)}
