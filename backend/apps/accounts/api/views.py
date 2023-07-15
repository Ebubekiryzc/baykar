from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.api.permissions import IsNotAuthenticated, IsOwnerOrReadOnly
from apps.accounts.api.serializers import (CustomUserCreateSerializer,
                                           CustomUserUpdateSerializer)
from apps.accounts.models import CustomUser


class CustomUserCreateAPIView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsNotAuthenticated]
    serializer_class = CustomUserCreateSerializer


class CustomUserUpdateAPIView(UpdateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CustomUserUpdateSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_update(self, serializer):
        return super().perform_update(serializer)


class BlacklistTokenView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
