from rest_framework import serializers

from apps.uavs.models import UAVManifacturer


class UAVManifacturerSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    image = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = UAVManifacturer
        fields = [
            "id",
            "name",
            "slug",
            "parent",
            "children",
            "created_at",
            "updated_at",
        ]

    def get_children(self, obj):
        serializer = self.__class__(obj.children.all(), many=True)
        return serializer.data
