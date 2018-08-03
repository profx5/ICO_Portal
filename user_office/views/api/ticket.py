from oslash import Right
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.fields import FileField
from rest_framework.response import Response
from rest_framework.decorators import action

from helpdesk.models import Ticket, FollowUp, Attachment
from .auth import KYCAndLoginPermission
from user_office.services.ticket import CreateSupportTicket, CommentTicket, ValidationErrorLeft


class TicketListSerializer(ModelSerializer):
    last_reply_by = SerializerMethodField()
    last_reply_at = SerializerMethodField()

    def get_last_reply_by(self, instance):
        public_replies = instance.followup_set.filter(public=True)

        if public_replies.exists():
            return public_replies.last().user.get_full_name()

    def get_last_reply_at(self, instance):
        public_replies = instance.followup_set.filter(public=True)

        if public_replies.exists():
            return public_replies.last().date

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'created', 'status', 'last_reply_by', 'last_reply_at')


class TicketCraeteSerializer(ModelSerializer):
    attachment = FileField(required=False)

    class Meta:
        model = Ticket
        fields = ('title', 'description', 'attachment')


class AttachmentSerializer(ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('file', 'filename', 'mime_type')


class FollowUpSerializer(ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True, source='attachment_set')
    sender = SerializerMethodField()

    class Meta:
        model = FollowUp
        fields = ('id', 'date', 'comment', 'sender', 'attachments')

    def get_sender(self, instance):
        if instance.user:
            return instance.user.get_full_name()


class TicketRetrieveSerializer(ModelSerializer):
    public_follow_ups = FollowUpSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'created', 'status', 'public_follow_ups')


class CommentSerializer(ModelSerializer):
    attachment = FileField(required=False)

    class Meta:
        model = FollowUp
        fields = ('comment', 'attachment')


class TicketViewSet(GenericViewSet):
    permission_classes = (KYCAndLoginPermission,)

    serializer_action_map = {
        'list': TicketListSerializer,
        'retrieve': TicketRetrieveSerializer,
        'create': TicketCraeteSerializer,
        'comment': CommentSerializer
    }

    def get_queryset(self):
        return Ticket.objects.filter(reporter=self.request.user).order_by('-followup__date')

    def get_serializer_class(self):
        return self.serializer_action_map.get(self.action)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        ticket = get_object_or_404(queryset, pk=pk)

        serializer = self.get_serializer(ticket)

        return Response(serializer.data)

    def create(self, request):
        result = CreateSupportTicket()(reporter=request.user,
                                       title=request.data['title'],
                                       description=request.data['description'],
                                       attached_files=request.FILES.getlist('attachment'))

        if isinstance(result, Right):
            serializer = TicketRetrieveSerializer(result.value.ticket)

            return Response(serializer.data, status=201)
        elif isinstance(result, ValidationErrorLeft):
            return Response(result.value, status=400)
        else:
            return Response('Error while creating Ticket', status=500)

    @action(methods=['post'], detail=True)
    def comment(self, request, pk=None):
        queryset = self.get_queryset()
        ticket = get_object_or_404(queryset, pk=pk)

        result = CommentTicket()(investor=request.user,
                                 ticket=ticket,
                                 comment=request.data['comment'],
                                 attached_files=request.FILES.getlist('attachment'))

        if isinstance(result, Right):
            serializer = TicketRetrieveSerializer(ticket)

            return Response(serializer.data, status=201)
        elif isinstance(result, ValidationErrorLeft):
            return Response(result.value, status=400)
        else:
            return Response('Error while creating comment', status=500)
