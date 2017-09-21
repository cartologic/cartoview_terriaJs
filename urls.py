from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from . import APP_NAME, views

urlpatterns = patterns('',
                       url(r'^$', TemplateView.as_view(
                           template_name='cartoview_terriaJs/terria.html'), name='%s.index' % APP_NAME)
                       )
