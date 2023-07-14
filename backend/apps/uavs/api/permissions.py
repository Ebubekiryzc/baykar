from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):
    message = "Only admin users can create/update/delete this object."

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
