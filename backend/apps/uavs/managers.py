from mptt.managers import TreeManager
from parler.managers import TranslatableManager, TranslatableQuerySet


class UAVManifacturerManager(TreeManager, TranslatableManager):
    _queryset_class = TranslatableQuerySet

    def get_queryset(self):
        return self._queryset_class(self.model, using=self._db).order_by(
            self.tree_id_attr, self.left_attr
        )

    def get_query_set(self):
        return self.get_queryset()

    def as_manager(cls):
        manager = super().as_manager()
        manager._queryset_class = cls._queryset_class
        return manager

    as_manager.queryset_only = False
