# Generated by Django 5.1.2 on 2024-12-09 14:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_remove_user_groups_remove_user_is_staff_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='user_id',
            new_name='id',
        ),
    ]
