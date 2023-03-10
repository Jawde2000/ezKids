# Generated by Django 3.2.5 on 2023-02-18 19:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('EZkidsApp', '0019_auto_20230211_0257'),
    ]

    operations = [
        migrations.CreateModel(
            name='BankName',
            fields=[
                ('bankID', models.CharField(editable=False, max_length=8, primary_key=True, serialize=False, unique=True)),
                ('bankName', models.TextField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='class',
            name='className',
            field=models.CharField(default='-', max_length=16),
        ),
        migrations.AlterField(
            model_name='subjectgrade',
            name='subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='EZkidsApp.subject'),
        ),
        migrations.AlterUniqueTogether(
            name='attendance',
            unique_together={('created_date_only', 'children', 'class_Belong')},
        ),
        migrations.RemoveField(
            model_name='attendance',
            name='subject',
        ),
    ]
