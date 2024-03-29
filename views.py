from django.conf import settings
from django.urls import re_path
from django.shortcuts import HttpResponse, get_object_or_404, render
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.utils.translation import get_language
from geonode.layers.models import Layer
from geonode.maps.models import Map
from guardian.shortcuts import get_objects_for_user
from typing import Dict, Any

from . import APP_NAME

_templates = {
    "terria_template": "TerriaMap/terria.html",
    "map_list_template": "TerriaMap/list.html",
    "terria_help_template": "TerriaMap/help/help.html",
}
_config = {
    'allowProxyFor': [
        "nicta.com.au",
        "gov.au",
        "csiro.au",
        "arcgis.com",
        "argo.jcommops.org",
        "www.abc.net.au",
        "geoserver.aurin.org.au",
        "mapsengine.google.com",
        "s3-ap-southeast-2.amazonaws.com",
        "adelaidecitycouncil.com",
        "www.dptiapps.com.au",
        "geoserver-123.aodn.org.au",
        "geoserver.imos.org.au",
        "nci.org.au",
        "static.nationalmap.nicta.com.au",
        "githubusercontent.com",
        "gov",
        "gov.uk",
        "gov.nz"
    ],
    'proxyAllDomains': False
}


def get_layer_metadata(request, layer_id=None):
    """metadata_xml"""
    layer = get_object_or_404(Layer, pk=layer_id)
    layer_metadata = layer.metadata_xml
    return HttpResponse(layer_metadata, content_type="application/xml")


class CartoviewTerriaMap(object):
    def __init__(self, templates=None, config=None):
        if templates is None:
            templates = _templates
        if config is None:
            config = _config
        self.terria_template = templates.get('terria_template', None)
        self.map_list_template = templates.get('map_list_template', None)
        self.geoserver_url = settings.OGC_SERVER['default']['PUBLIC_LOCATION']
        self.terria_map = "terria_map_id"
        self.main_config = config
        self.server_config = self.main_config.copy()
        self.server_config: Dict[str, Any]
        self.server_config.update({'version': "2.6.7"})

    def index_page(self, request, map_id):
        """
        View for terria map viewer.
        """
        template = self.terria_template
        map_id_key = request.session.get(self.terria_map, None)
        current_id = int(map_id_key) if map_id_key else 0
        if not current_id or current_id != map_id:
            request.session[self.terria_map] = map_id
        map_element = Map.objects.get(id=map_id)
        mapBboxNull = 0
        for bboxElement in map_element.bbox:
            if bboxElement is None:
                mapBboxNull = 1
                break
        context = {
            'mapTitle': map_element.title,
            'mapBboxNull': mapBboxNull,
            'site_url': settings.SITEURL,
            'mapId': map_id,
            'currentLanguage': get_language(),
            'current_username': request.user.username,
            'app_name': APP_NAME,
        }
        return render(request, template, context)

    def map_list(self, request):
        """
        View for terria map launcher.
        """
        template = self.map_list_template
        context = {
            'site_url': settings.SITEURL,
            'current_username': request.user.username,
            'app_name': APP_NAME,
        }
        return render(request, template, context)

    def server_config_view(self, request):
        return JsonResponse(self.server_config)

    def proxyable_domains(self, request):
        return JsonResponse(self.main_config)

    def build_main_layers_catalog(self, permitted_ids, current_map_id, access_token=None, config=None):
        """
        Build Terria catalog to get all public layers.
        """
        if config is None:
            config = {}
        maps = Map.objects.all()
        for map_element in maps:
            if current_map_id and int(current_map_id) == map_element.id:
                config.update(
                    {
                        "homeCamera": {
                            "south": map_element.center_y - 10,
                            "west": map_element.center_x - 10,
                            "north": map_element.center_y + 10,
                            "east": map_element.center_x + 10,
                        },
                    }
                )
        layers = Layer.objects.all()
        layers_catalog = {
            "name": "Available Layers",
            "type": "group",
            "preserveOrder": True,
            "isOpen": True
        }
        catalog = []
        for layer_element in layers:
            if layer_element.alternate is not None:
                workspace, name = layer_element.alternate.split(':')
            else:
                workspace, name = layer_element.typename.split(':')
            layer_item = {
                "name": layer_element.title,
                "metadataUrl": "{}{}/{}/wms?request=GetCapabilities&version=1.1.0&access_token={}".format(self.geoserver_url, workspace, name, access_token),
                "url": "{}{}/{}/wms?&access_token={}".format(self.geoserver_url, workspace, name, access_token),
                "description": layer_element.abstract,
                "type": "wms",
                "isGeoServer": True,
                "layers": name,
                "opacity": 0.8,
            }
            current_map_obj = Map.objects.get(id=current_map_id)
            if layer_element in set(current_map_obj.local_layers):
                layer_item.update({"isShown": True})
            catalog.append(layer_item)
        layers_catalog.update({"items": catalog})

        config.update({"catalog": [layers_catalog]})
        return config

    def build_map_catalog(self, map_obj, current_map_id, access_token):
        """
        Return layers of a particular map in terria catalog format.
        """
        layers = []
        for layer in map_obj.local_layers:
            if layer.alternate is not None:
                workspace, name = layer.alternate.split(':')
            else:
                workspace, name = layer.typename.split(':')
            layer_item = {
                "name": layer.title,
                "metadataUrl": "{}{}/{}/wms?request=GetCapabilities&version=1.1.0&access_token={}".format(self.geoserver_url, workspace, name, access_token),
                "url": "{}{}/{}/wms?&access_token={}".format(self.geoserver_url, workspace, name, access_token),
                "description": layer.abstract,
                "type": "wms",
                "isGeoServer": True,
                "layers": name,
                "opacity": 0.8,
            }
            if current_map_id and int(current_map_id) == map_obj.id:
                layer_item.update({"isShown": True})
            layers.append(layer_item)
        return layers

    def build_main_catalog(self, permitted_ids, current_map_id, access_token=None, config=None):
        """
        Build Terria catalog to get all public maps.
        """
        if config is None:
            config = {}
        maps = Map.objects.filter(id__in=permitted_ids)
        maps_catalog = {
            "name": "Cartoview Maps",
            "type": "group",
            "preserveOrder": True,
            "isOpen": True
        }
        catalog = []
        for map_element in maps:
            map_item = {
                "name": map_element.title,
                "type": "group",
                "isOpen": False
            }
            layers_as_catalog_item = self.build_map_catalog(
                map_element, current_map_id, access_token)
            if current_map_id and int(current_map_id) == map_element.id:
                config.update(
                    {
                        "homeCamera": {
                            "south": map_element.center_y - 10,
                            "west": map_element.center_x - 10,
                            "north": map_element.center_y + 10,
                            "east": map_element.center_x + 10,
                        },
                    }
                )
            map_item.update({"items": layers_as_catalog_item})
            catalog.append(map_item)
        maps_catalog.update({"items": catalog})
        config.update({"catalog": [maps_catalog]})
        return config

    def terria_json(self, request):
        """
        Return terria catalog in JSON format.
        """
        access_token = request.session.get('access_token', None)
        map_id = request.session.get(self.terria_map, None)
        permitted_ids = get_objects_for_user(request.user, 'base.view_resourcebase').values('id')
        # catalog = self.build_main_catalog(permitted_ids, map_id, access_token)
        catalog = self.build_main_layers_catalog(permitted_ids, map_id, access_token)
        return JsonResponse(catalog)

    def get_urls_patterns(self):
        url_patterns = [
            re_path(r'^$', self.map_list, name='%s.index' % APP_NAME),
            re_path(r'^(?P<map_id>\d+)$', self.index_page, name='%s.list' % APP_NAME),
            re_path(r'^serverconfig/$', self.server_config_view, name='%s.config' % APP_NAME),
            re_path(r'^proxyabledomains/$', self.proxyable_domains, name='%s.proxy' % APP_NAME),
            re_path(r'^metadata/(?P<layer_id>\d+)$', get_layer_metadata, name='%s.metadata' % APP_NAME),
            re_path(r'^init/terria.json$', self.terria_json, name='%s.json' % APP_NAME),
            re_path(r'^help/help.html', TemplateView.as_view(template_name=_templates.get('terria_help_template', None)), name='terria_help'),
        ]
        return url_patterns


CARTOVIEW_TERRIA = CartoviewTerriaMap()
