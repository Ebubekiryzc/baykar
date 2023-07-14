from django.contrib import admin
from apps.uav_rentals.models import *


# Register your models here.
@admin.register(UAVRental)
class UAVRentalAdmin(admin.ModelAdmin):
    list_display = ["id", "uav", "renter", "created_at", "updated_at"]
    list_filter = ["renter", "created_at", "updated_at"]
