# Generated by Django 4.1.5 on 2023-01-31 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rent', '0002_alter_rent_duration_rent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rent',
            name='duration_rent',
        ),
        migrations.AddField(
            model_name='rent',
            name='cost',
            field=models.FloatField(blank=True, default=0, max_length=255, null=True),
        ),
    ]