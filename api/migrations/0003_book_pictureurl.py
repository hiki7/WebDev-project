# Generated by Django 4.2.4 on 2024-04-24 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_category_book_category_user_password_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='pictureUrl',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
