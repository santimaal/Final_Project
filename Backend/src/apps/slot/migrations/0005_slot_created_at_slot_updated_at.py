# Generated by Django 4.1.5 on 2023-01-26 19:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('slot', '0004_remove_slot_created_at_remove_slot_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='slot',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.AddField(
            model_name='slot',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
