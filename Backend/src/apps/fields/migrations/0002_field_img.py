# Generated by Django 4.1.5 on 2023-03-29 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fields', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='field',
            name='img',
            field=models.CharField(blank=True, default='https://media.istockphoto.com/id/1355687112/photo/various-sport-equipment-gear.jpg?b=1&s=170667a&w=0&k=20&c=hEADFXL4HG9mF94yC5g3JA8lMHn8OZg7hRLoiel_L48=', max_length=200),
        ),
    ]