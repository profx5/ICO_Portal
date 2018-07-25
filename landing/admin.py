from django.contrib import admin
from .models import *
from adminsortable2.admin import SortableAdminMixin
from feincms.admin import item_editor


# class NewsAdmin(SortableAdminMixin, admin.ModelAdmin):
#     list_display = ('title', 'order',)

#     class Meta:
#         model = News

# admin.site.register(News, NewsAdmin)


# class MilestoneAdmin(SortableAdminMixin, admin.ModelAdmin):
#     list_display = ('period', 'order',)

#     class Meta:
#         model = Milestone

# admin.site.register(Milestone, MilestoneAdmin)


# class DocumentAdmin(SortableAdminMixin, admin.ModelAdmin):
#     list_display = ('title', 'order',)

#     class Meta:
#         model =  Document

# admin.site.register(Document, DocumentAdmin)

from feincms.module.page.models import Page

admin.site.unregister(Page)
