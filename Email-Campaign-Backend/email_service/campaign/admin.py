# django/rest_framwork imports
from django.contrib import admin


# app level imports
from .models import EmailCampaign, EmailTemplate


@admin.register(EmailTemplate)
class EmailTemplateAdmin(admin.ModelAdmin):
    ordering = ('-id',)
    show_full_result_count = False

    list_display = ("id", "title", "content")


@admin.register(EmailCampaign)
class EmailCampaignAdmin(admin.ModelAdmin):
    ordering = ('-id',)
    show_full_result_count = False

    list_display = ("id", "title", "subject",)