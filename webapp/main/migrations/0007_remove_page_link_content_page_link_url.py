# Generated by Django 5.0.3 on 2024-12-14 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_page_link_content_page_link_title_alter_page_content'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='link_content',
        ),
        migrations.AddField(
            model_name='page',
            name='link_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
