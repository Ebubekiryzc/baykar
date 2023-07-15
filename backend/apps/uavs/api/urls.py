from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.uavs.api.views import *

router = DefaultRouter()
router.register(r"uavs", UAVViewSet, basename="uav")
router.register(r"uav-categories", UAVCategoryViewSet, basename="uav-category")
router.register(
    r"uav-manifacturers", UAVManifacturerViewSet, basename="uav-manifacturer"
)
router.register(
    r"uav-manifacturers-without-parent",
    UAVManifacturersWithNoParentViewSet,
    basename="uav-manifacturer-with-no-parent",
)

urlpatterns = [path("", include(router.urls))]
