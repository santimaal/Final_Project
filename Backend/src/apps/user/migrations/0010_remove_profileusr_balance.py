# Generated by Django 4.1.5 on 2023-03-29 16:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_profileusr_balance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profileusr',
            name='balance',
        ),
    ]
