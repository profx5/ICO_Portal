import factory


class PhaseFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'user_office.Phase'

    name = factory.Sequence(lambda n: "Phase %03d" % n)
    bonus_percents = factory.Sequence(lambda n: 100 - n * 10)
