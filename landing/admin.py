from django.contrib import admin
from .models import Milestone


class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('label', 'current',)

    class Meta:
        model = Milestone


admin.site.register(Milestone, MilestoneAdmin)
