from rest_framework import viewsets

from apps.uavs.api.permissions import IsAdminUserOrReadOnly
from apps.uavs.api.serializers import (UAVCategorySerializer,
                                       UAVManifacturerSerializer,
                                       UAVSerializer)
from apps.uavs.models import UAV, UAVCategory, UAVManifacturer


class UAVViewSet(viewsets.ModelViewSet):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class UAVCategoryViewSet(viewsets.ModelViewSet):
    queryset = UAVCategory.objects.all()
    serializer_class = UAVCategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]


class UAVManifacturerViewSet(viewsets.ModelViewSet):
    queryset = UAVManifacturer.objects.all()
    serializer_class = UAVManifacturerSerializer
    permission_classes = [IsAdminUserOrReadOnly]
