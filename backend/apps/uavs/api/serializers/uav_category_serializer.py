from apps.uavs.models import UAVCategory
from rest_framework import serializers


class UAVCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UAVCategory
        fields = [
            "id",
            "name",
            "slug",
            "created_at",
            "updated_at",
        ]
