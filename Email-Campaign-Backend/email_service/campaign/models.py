from django.db import models


class EmailTemplate(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    title = models.CharField(max_length=64)
    content = models.TextField(blank=False)

    class Meta:
        app_label = 'campaign'
        db_table = 'email_template'

    def __str__(self):
        return "{title}".format(title=self.title)


class EmailCampaign(models.Model):
    status = models.IntegerField(choices=[(0, 'Saved'), (1, 'Sent')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    email = models.ForeignKey('campaign.EmailTemplate', models.PROTECT,)
    title = models.CharField(max_length=64)
    subject = models.CharField(max_length=128)
    from_name = models.CharField(max_length=64)
    from_mail = models.CharField(max_length=64)
    reply_mail = models.CharField(max_length=64)
    reply_name = models.CharField(max_length=64)
    email_to = models.TextField(blank=False)

    class Meta:
        app_label = 'campaign'
        db_table = 'email_campaign'

    def __str__(self):
        return "{title}".format(title=self.title)
