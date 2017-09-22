from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from .views import server_config, proxyabledomains, terria_json
from . import APP_NAME, views

urlpatterns = patterns('',
                       url(r'^$', TemplateView.as_view(
                           template_name='cartoview_terriaJs/terria.html'),
                           name='%s.index' % APP_NAME),
                       url(r'^serverconfig/$', server_config,
                           name='%s.config' % APP_NAME),
                       url(r'^proxyabledomains/$', server_config,
                           name='%s.proxy' % APP_NAME),
                       url(r'^init/terria.json$', terria_json,
                           name='%s.json' % APP_NAME)
                       )
