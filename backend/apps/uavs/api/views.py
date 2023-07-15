from apps.uavs.api.helpers import UAVPagination
from apps.uavs.api.permissions import IsAdminUserOrReadOnly
from apps.uavs.api.serializers import (
    UAVCategorySerializer,
    UAVManifacturerSerializer,
    UAVSerializer,
)
from apps.uavs.models import UAV, UAVCategory, UAVManifacturer
from rest_framework import filters, viewsets


class UAVViewSet(viewsets.ModelViewSet):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    pagination_class = UAVPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    lookup_field = "slug"


class UAVCategoryViewSet(viewsets.ModelViewSet):
    queryset = UAVCategory.objects.all()
    serializer_class = UAVCategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    lookup_field = "slug"


class UAVManifacturerViewSet(viewsets.ModelViewSet):
    queryset = UAVManifacturer.objects.all()
    serializer_class = UAVManifacturerSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    lookup_field = "slug"


class UAVManifacturersWithNoParentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UAVManifacturer.objects.filter(parent__isnull=True)
    serializer_class = UAVManifacturerSerializer
