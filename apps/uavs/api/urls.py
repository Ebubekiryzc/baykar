from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r"uavs", UAVViewSet, basename="uav")
router.register(r"uav-categories", UAVCategoryViewSet, basename="uav-category")
router.register(r"uav-manifacturers", UAVManifacturerViewSet, basename="uav-manifacturer")

urlpatterns = [path("api/", include(router.urls))]
