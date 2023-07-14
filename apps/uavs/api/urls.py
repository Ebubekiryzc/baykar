from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.uavs.api.views import *

router = DefaultRouter()
router.register(r"uavs", UAVViewSet, basename="uav")
router.register(r"uav-categories", UAVCategoryViewSet, basename="uav-category")
router.register(
    r"uav-manifacturers", UAVManifacturerViewSet, basename="uav-manifacturer"
)

urlpatterns = [path("", include(router.urls))]
