# Generated by Django 3.2.5 on 2023-01-22 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EZkidsApp', '0003_user_is_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='children',
            name='childGender',
            field=models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female')], max_length=1),
        ),
    ]
