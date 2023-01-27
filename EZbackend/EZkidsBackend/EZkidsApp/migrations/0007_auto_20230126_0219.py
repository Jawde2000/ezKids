# Generated by Django 3.2.5 on 2023-01-25 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('EZkidsApp', '0006_auto_20230125_1508'),
    ]

    operations = [
        migrations.AddField(
            model_name='attendance',
            name='class_Belong',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.class'),
        ),
        migrations.AddField(
            model_name='attendance',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.teacher'),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='children',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.children'),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.parent'),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.subject'),
        ),
        migrations.AlterField(
            model_name='children',
            name='class_belong',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.class'),
        ),
        migrations.AlterField(
            model_name='children',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.parent'),
        ),
        migrations.AlterField(
            model_name='class',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.teacher'),
        ),
        migrations.AlterField(
            model_name='homework',
            name='children',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.children'),
        ),
        migrations.AlterField(
            model_name='homework',
            name='subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.subject'),
        ),
        migrations.AlterField(
            model_name='homework',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.teacher'),
        ),
        migrations.AlterField(
            model_name='subjectgrade',
            name='children',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.children'),
        ),
        migrations.AlterField(
            model_name='subjectgrade',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.parent'),
        ),
        migrations.AlterField(
            model_name='subjectgrade',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='EZkidsApp.teacher'),
        ),
    ]
