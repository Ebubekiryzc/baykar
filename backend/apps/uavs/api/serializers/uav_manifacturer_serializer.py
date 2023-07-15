from apps.uavs.models import UAVManifacturer
from parler_rest.serializers import TranslatableModelSerializer, TranslatedFieldsField
from rest_framework import serializers


class UAVManifacturerSerializer(TranslatableModelSerializer):
    translations = TranslatedFieldsField(shared_model=UAVManifacturer)
    childrens = serializers.SerializerMethodField()

    class Meta:
        model = UAVManifacturer
        fields = [
            "id",
            "parent",
            "childrens",
            "created_at",
            "updated_at",
            "translations",
        ]

    def get_childrens(self, obj):
        children = obj.get_children()
        serializer = self.__class__(children, many=True)
        return serializer.data
