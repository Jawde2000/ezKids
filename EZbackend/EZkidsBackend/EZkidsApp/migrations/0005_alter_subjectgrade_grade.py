# Generated by Django 3.2.5 on 2023-01-22 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EZkidsApp', '0004_children_childgender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subjectgrade',
            name='grade',
            field=models.CharField(blank=True, max_length=5),
        ),
    ]
