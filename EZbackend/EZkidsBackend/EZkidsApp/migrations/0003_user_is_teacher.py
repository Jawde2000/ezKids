# Generated by Django 3.2.5 on 2023-01-13 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EZkidsApp', '0002_auto_20230110_2311'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_teacher',
            field=models.BooleanField(default=False),
        ),
    ]
