# Generated by Django 5.0 on 2023-12-05 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dailySleep', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailysleep',
            name='end',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='dailysleep',
            name='start',
            field=models.CharField(max_length=100),
        ),
    ]