# Generated by Django 3.2.5 on 2023-02-10 17:35

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('EZkidsApp', '0016_alter_announcement_announcementtime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='announcementTime',
            field=models.DateTimeField(default=datetime.datetime(2023, 2, 10, 17, 35, 24, 586295, tzinfo=utc)),
        ),
    ]