from oslash import Right, Left
from django.db import DatabaseError

from ico_portal.utils.datetime import datetime
from helpdesk.models import Queue, Ticket, FollowUp


class _Base:
    def get_or_create_queue(self, args):
        slug = args['queue__slug']
        title = args['queue__title']

        queue = Queue.objects.filter(slug=slug)

        if queue.exists():
            return Right(dict(args, queue=queue.first()))
        else:
            queue = Queue(slug=slug, title=title)

            try:
                queue.save()

                return Right(dict(args, queue=queue))
            except DatabaseError as e:
                return Left(f'Error while craeting Queue, {e}')

    def create_ticket(self, args):
        ticket = Ticket(title=args['title'],
                        created=datetime.utcnow(),
                        status=Ticket.OPEN_STATUS,
                        queue=args['queue'],
                        reporter=args['reporter'])

        try:
            ticket.save()

            return Right(dict(args, ticket=ticket))
        except DatabaseError as e:
            return Left(f'Error while saving Ticket, {e}')


class CreateSupportTicket(_Base):
    queue_spec = {
        'queue__slug': 'support',
        'queue__title': 'Support'
    }

    def create_description(self, args):
        follow_up = FollowUp(ticket=args['ticket'],
                             title='Comment',
                             comment=args['description'],
                             public=True,
                             user=args['reporter'])

        try:
            follow_up.save()

            return Right(dict(args, follow_up=follow_up))
        except DatabaseError as e:
            return Left(f'Error while creating FollowUp, {e}')

    def __call__(self, reporter, title, description):
        return Right(dict(title=title,
                          reporter=reporter,
                          description=description,
                          **self.queue_spec)) | \
                          self.get_or_create_queue | \
                          self.create_ticket | \
                          self.create_description


class CommentTicket:
    def __call__(self, investor, ticket, comment):
        followup = FollowUp(ticket=ticket,
                            title='Comment',
                            comment=comment,
                            public=True,
                            user=investor)

        try:
            followup.save()

            return Right({'followup': followup})
        except DatabaseError as e:
            return Left(f'Error while creating FollowUp, {e}')


class CreateKYCTicket(_Base):
    queue_spec = {
        'queue__slug': 'kyc-requests',
        'queue__title': 'KYC Requests'
    }

    title_template = 'KYC request for user {username}'

    def get_title(self, args):
        title = self.title_template.format(username=args['kyc'].investor.email)

        return Right(dict(args, title=title))

    def create_kyc_comment(self, args):
        follow_up = FollowUp(ticket=args['ticket'],
                             title='KYC link',
                             comment=args['ticket'].reporter_kyc_url,
                             public=False)

        try:
            follow_up.save()

            return Right(dict(args, follow_up=follow_up))
        except DatabaseError as e:
            return Left(f'Error while saving FollowUp, {e}')

    def set_ticket_id(self, args):
        kyc = args['kyc']

        try:
            kyc.ticket = args['ticket']
            kyc.save()

            return Right(args)
        except DatabaseError as e:
            return Left(f'Error while saving KYC, {e}')

    def __call__(self, kyc):
        return Right(dict(kyc=kyc,
                          reporter=kyc.investor,
                          **self.queue_spec)) | \
                          self.get_or_create_queue | \
                          self.get_title | \
                          self.create_ticket | \
                          self.create_kyc_comment | \
                          self.set_ticket_id


class UpdateKYCTicket:
    follow_up_title = 'User updated KYC data'

    def find_ticket(self, args):
        ticket = args['kyc'].ticket

        if ticket:
            return Right(dict(args, ticket=ticket))
        else:
            return Left('Ticket not found')

    def create_follow_up(self, args):
        follow_up = FollowUp(ticket=args['ticket'],
                             title=self.follow_up_title,
                             public=False)

        try:
            follow_up.save()

            return Right(dict(args, follow_up=follow_up))
        except DatabaseError as e:
            return Left(f'Error while saving FollowUp, {e}')

    def __call__(self, kyc):
        return Right({'kyc': kyc}) | \
            self.find_ticket | \
            self.create_follow_up
