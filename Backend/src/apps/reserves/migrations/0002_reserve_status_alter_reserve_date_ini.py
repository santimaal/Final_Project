# Generated by Django 4.1.5 on 2023-05-03 20:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reserves', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reserve',
            name='status',
            field=models.CharField(blank=True, default=2, max_length=100),
        ),
        migrations.AlterField(
            model_name='reserve',
            name='date_ini',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]