# Generated by Django 3.2.5 on 2023-01-31 07:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EZkidsApp', '0009_subjectgrade_subject'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='attendance',
            unique_together={('created_date', 'children')},
        ),
    ]
