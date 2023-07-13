from django.urls import path

from apps.accounts.api.views import (BlacklistTokenView,
                                     CustomUserCreateAPIView,
                                     CustomUserUpdateAPIView)

urlpatterns = [
    path("register/", CustomUserCreateAPIView.as_view(), name="register-user"),
    path("update-user/<str:pk>/", CustomUserUpdateAPIView.as_view(), name="update-user"),
    path("logout/blacklist/", BlacklistTokenView.as_view(), name="blacklist"),
]
