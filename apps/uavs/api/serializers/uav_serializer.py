from apps.shared.api.serializers import ImageSerializer
from apps.uavs.models import UAV
from apps.uavs.api.serializers import UAVCategorySerializer, UAVManifacturerSerializer

from rest_framework import serializers


class UAVSerializer(serializers.ModelSerializer):
    uav_category = UAVCategorySerializer()
    uav_manifacturer = UAVManifacturerSerializer()
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = UAV
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "uav_category",
            "uav_manifacturer",
            "weight",
            "images",
            "created_at",
            "updated_at",
        ]
