from apps.uavs.models import UAVManifacturer
from django import forms
from parler.forms import TranslatableModelForm


class UAVManifacturerForm(TranslatableModelForm):
    slug = forms.SlugField()

    class Meta:
        model = UAVManifacturer
        fields = "__all__"
