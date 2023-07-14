from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.uav_rentals.api.views import *

router = DefaultRouter()
router.register(r"uav-rentals", UAVRentalViewSet, basename="uav-rentals")

urlpatterns = [path("", include(router.urls))]
