from rest_framework import serializers

from apps.shared.models import Image


class ImageSerializer(serializers.ModelSerializer):
    content_type = serializers.SerializerMethodField()
    object_id = serializers.SerializerMethodField()
    content_object = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = ["image", "content_type", "object_id", "content_object"]

    def get_content_type(self, obj):
        return str(obj.content_type)

    def get_object_id(self, obj):
        return str(obj.object_id)

    def get_content_object(self, obj):
        return str(obj.content_object)
