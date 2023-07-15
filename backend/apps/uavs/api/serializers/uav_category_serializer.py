from apps.uavs.models import UAVCategory
from parler_rest.serializers import (TranslatableModelSerializer,
                                     TranslatedFieldsField)
from rest_framework import serializers


class UAVCategorySerializer(TranslatableModelSerializer):
    translations = TranslatedFieldsField(shared_model=UAVCategory)

    class Meta:
        model = UAVCategory
        fields = [
            "id",
            "translations",
            "created_at",
            "updated_at",
        ]
