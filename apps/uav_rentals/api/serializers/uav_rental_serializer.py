from rest_framework import serializers

from apps.uav_rentals.models import UAVRental


class UAVRentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UAVRental
        fields = [
            "id",
            "uav",
            "renter",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
        ]
