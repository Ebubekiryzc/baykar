from apps.shared.api.serializers import ImageSerializer
from apps.uavs.models import UAV
from parler_rest.serializers import TranslatableModelSerializer, TranslatedFieldsField

from rest_framework import serializers


class UAVSerializer(TranslatableModelSerializer):
    translations = TranslatedFieldsField(shared_model=UAV)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = UAV
        fields = [
            "id",
            "translations",
            "uav_category",
            "uav_manifacturer",
            "weight",
            "images",
            "created_at",
            "updated_at",
        ]
