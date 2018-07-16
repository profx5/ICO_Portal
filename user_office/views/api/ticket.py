from oslash import Right
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.response import Response
from rest_framework.decorators import action

from helpdesk.models import Ticket, FollowUp
from .auth import KYCAndLoginPermission
from user_office.services import CreateSupportTicket, CommentTicket


class TicketListSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'title', 'created', 'status')


class TicketCraeteSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('title', 'description')


class FollowUpSerializer(ModelSerializer):
    sender = SerializerMethodField()

    class Meta:
        model = FollowUp
        fields = ('id', 'date', 'comment', 'sender')

    def get_sender(self, instance):
        if instance.user:
            return instance.user.get_full_name()


class TicketRetrieveSerializer(ModelSerializer):
    public_follow_ups = FollowUpSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'created', 'status', 'public_follow_ups')


class CommentSerializer(ModelSerializer):
    class Meta:
        model = FollowUp
        fields = ('comment',)


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
            serializer = TicketRetrieveSerializer(ticket)

            return Response(serializer.data, status=201)
        else:
            return Response('Error while creating comment', status=500)
