from django.shortcuts import render
# Create your views here.
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from .models import EmailCampaign, EmailTemplate
from django.core.mail import EmailMessage
from django.db import transaction


class CampaignViewSet(GenericViewSet):
    http_method_names = ["get", "post"]

    @transaction.atomic()
    @action(methods=["post"], detail=False, url_path="create-template")
    def create_template(self, request):
        data = request.data
        title = data.get('title', '')
        content = data.get('content', '<p></p>')
        if title=='' or content=='':
            return Response({"message":"One of the fields is empty."})
        if title not in EmailTemplate.objects.values_list('title',flat=True):
            email_template = EmailTemplate.objects.create(title=title, content=content)
            return Response({'id': email_template.id,"message":"success"})
        else:
            return Response({"message":"Already exists"})

    @transaction.atomic()
    @action(methods=['post'], detail=False, url_path="create-campaign")
    def create_campaign(self, request):
        try:
            data = request.data
            email_id = data.get('email_id')
            title = data.get('title')
            subject = data.get('subject')
            from_name = data.get('from_name')
            from_mail =data.get('from_mail')
            reply_mail = data.get('reply_mail')
            reply_name = data.get('reply_name')

            check_in = [title, subject, from_mail, from_name, reply_mail, data.get('to_Email')]
            if ( (any(x is None for x in check_in )) or
            ( any(x is '' for x in check_in )) ):
                return Response({"message":"One/more of the fields is empty."})

            email_to = ''
            for email in data.get('to_Email'):
                email_to +=str(email)+','
            email_to = email_to [:-1]
            
            email_template = EmailTemplate.objects.get(title = email_id)
            if title not in EmailCampaign.objects.values_list('title',flat=True):
                email_campaign = EmailCampaign.objects.create(
                title= title,subject=subject,from_name=from_name,from_mail=from_mail,
                reply_mail=reply_mail, reply_name=reply_name,email_to=email_to, email=email_template,
                status=0,
                )
                return Response({'campaign_name': title,"message":"success"})
            else:
                return Response({'message': 'Campaign already exists'}) 
        except Exception as e:
            print(e)
            return Response({"message":'Error'})

    @transaction.atomic()
    @action(methods=['post'], detail=False, url_path="edit-campaign")
    def edit_campaign(self, request):
        data = request.data

        email_id = data.get('email_id')
        title = data.get('title')
        subject = data.get('subject')
        from_name = data.get('from_name')
        from_mail = data.get('from_mail')
        reply_mail = data.get('reply_mail')
        reply_name = data.get('reply_name')
        
        check_in = [title, subject, from_mail, from_name, reply_mail,data.get('to_Email')]
        if ( (any(x is None for x in check_in )) or
            ( any(x is '' for x in check_in )) ):
            return Response({"message":"One/more of the fields is empty."})
        email_to = ''
        for email in data.get('to_Email'):
            email_to +=str(email)+','
        email_to = email_to [:-1]

        email_template = EmailTemplate.objects.get(title=email_id)
        email_campaign = EmailCampaign.objects.filter(title=title).update(
            title=title, subject=subject, from_name=from_name, from_mail=from_mail,
            reply_mail=reply_mail, reply_name=reply_name, email_to=email_to, email=email_template,
        )
        
        return Response({"email_campaign_title": title,"message":"success"})

    
    @action(methods=['post'], detail=False, url_path="send-campaign")
    def send_campaign(self, request):
        # import pdb
        # pdb.set_trace()
        data = request.data
        email_campaign_id = data.get('title')
        email_campaign = EmailCampaign.objects.get(title=email_campaign_id)
        
        email = EmailMessage(
            subject = email_campaign.subject,
            body = email_campaign.email.content,
            from_email = email_campaign.from_mail,
            to = email_campaign.email_to.split(','),
            reply_to = [email_campaign.reply_mail])
        email.content_subtype = "html"
        email.send()
        return Response({'message': 'success'})


    @action(methods=['get'], detail=False, url_path="get-all-campaign")
    def get_all_campaigns(self, request):
        email_campaigns = EmailCampaign.objects.all()
        campaign_data = []
        for email_campaign in email_campaigns:
            campaign_info = {}
            campaign_info['id'] = email_campaign.id
            campaign_info['title'] = email_campaign.title
            campaign_info['email'] = email_campaign.email.title
            campaign_info['subject'] = email_campaign.subject
            campaign_info['from'] = email_campaign.from_mail
            campaign_info['reply'] = email_campaign.reply_mail
            campaign_info['email_to'] = email_campaign.email_to
            campaign_data.append(campaign_info)
        return Response({'campaign_data': campaign_data})

    @action(methods=['get'], detail=False, url_path="get-all-emails")
    def get_all_emails(self, request):
        email_campaigns = EmailTemplate.objects.all()
        campaign_data = []
        for email_campaign in email_campaigns:
            campaign_info = {}
            campaign_info['id'] = email_campaign.id
            campaign_info['title'] = email_campaign.title
            campaign_info['content'] = email_campaign.content
            campaign_data.append(campaign_info)
        # print(campaign_data)
        return Response({'campaign_data': campaign_data})

    @action(methods=['get'], detail=False, url_path="get-email-campaign")
    def get_email_campaign(self, request):
        campaign_id = request.GET.get('email_campaign_id')
        email_campaign = EmailCampaign.objects.filter(title=campaign_id)
        if email_campaign:
            return Response({'email_sent': email_campaign[0].email_to})
