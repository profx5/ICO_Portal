from oslash import Right
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.fields import FileField
from rest_framework.response import Response
from rest_framework.decorators import action

from helpdesk.models import Ticket, FollowUp, Attachment
from helpdesk.lib import process_attachments
from .auth import KYCAndLoginPermission
from user_office.services import CreateSupportTicket, CommentTicket


class TicketListSerializer(ModelSerializer):
    last_reply_by = SerializerMethodField()
    last_reply_at = SerializerMethodField()

    def get_last_reply_by(self, instance):
        if instance.followup_set.exists():
            return instance.followup_set.last().user.get_full_name()

    def get_last_reply_at(self, instance):
        if instance.followup_set.exists():
            return instance.followup_set.last().date

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'created', 'status', 'last_reply_by', 'last_reply_at')


class TicketCraeteSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('title', 'description')


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
    attachment = FileField()

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
        return Ticket.objects.filter(reporter=self.request.user)

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
                                       description=request.data['description'])

        if isinstance(result, Right):
            serializer = TicketRetrieveSerializer(result.value['ticket'])

            return Response(serializer.data, status=201)
        else:
            return Response('Error while creating Ticket', status=500)

    @action(methods=['post'], detail=True)
    def comment(self, request, pk=None):
        queryset = self.get_queryset()
        ticket = get_object_or_404(queryset, pk=pk)

        result = CommentTicket()(investor=request.user,
                                 ticket=ticket,
                                 comment=request.data['comment'])

        if isinstance(result, Right):
            process_attachments(result.value.followup, request.FILES.getlist('attachment'))
            serializer = TicketRetrieveSerializer(ticket)

            return Response(serializer.data, status=201)
        else:
            return Response('Error while creating comment', status=500)
