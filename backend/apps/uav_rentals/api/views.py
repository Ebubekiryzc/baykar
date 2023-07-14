from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.uav_rentals.api.permissions import IsRenterOrAdminOrReadOnly
from apps.uav_rentals.api.serializers import UAVRentalSerializer
from apps.uav_rentals.models import UAVRental


class UAVRentalViewSet(viewsets.ModelViewSet):
    queryset = UAVRental.objects.all()
    serializer_class = UAVRentalSerializer
    permission_classes = [IsAuthenticated, IsRenterOrAdminOrReadOnly]
