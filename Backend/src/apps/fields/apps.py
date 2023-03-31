from django.apps import AppConfig


class FieldConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.apps.fields'

    def ready(self):
        import src.apps.fields.signals
