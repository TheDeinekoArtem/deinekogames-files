# Generated by Django 5.0.3 on 2024-12-11 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_page_content_page_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='content_type',
        ),
        migrations.AddField(
            model_name='page',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='page',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
    ]
