# Generated by Django 5.0 on 2023-12-08 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DailyDream',
            fields=[
                ('dreamId', models.AutoField(primary_key=True, serialize=False)),
                ('dreamType', models.CharField(max_length=300)),
                ('dreamThing', models.CharField(max_length=900)),
            ],
        ),
    ]
