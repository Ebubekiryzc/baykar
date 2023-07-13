from rest_framework import serializers
from django.contrib.auth import get_user_model


class CustomUserUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    username = serializers.CharField(required=False)
    password = serializers.CharField(min_length=8, write_only=True, required=False)
    profile_photo = serializers.ImageField()

    class Meta:
        model = get_user_model()
        fields = (
            "email",
            "username",
            "password",
            "first_name",
            "last_name",
            "contact_number",
            "address",
            "biography",
            "profile_photo",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for field, value in validated_data.items():
            if value is not None:
                setattr(instance, field, value)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance
