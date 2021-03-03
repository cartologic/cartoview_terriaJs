from django.conf import settings
from django.urls import re_path
from django.shortcuts import HttpResponse, get_object_or_404, render
from django.http import JsonResponse
from django.views.generic import TemplateView
from geonode.layers.models import Layer
from geonode.maps.models import Map
from guardian.shortcuts import get_objects_for_user
from pyproj import Proj, transform

from . import APP_NAME

_templates = {
    "terria_template": "cartoview_terriaJs/terria.html",
    "map_list_template": "cartoview_terriaJs/list.html",
    "terria_help_template": "cartoview_terriaJs/help/help.html",
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


class CartoviewTerriaMap(object):
    def __init__(self, templates=_templates, config=_config):
        self.terria_template = _templates.get('terria_template', None)
        self.map_list_template = _templates.get('map_list_template', None)
        self.geoserver_url = settings.OGC_SERVER['default']['PUBLIC_LOCATION']
        self.terria_map = "terria_map_id"
        self.geonode_projection = settings.DEFAULT_MAP_CRS
        self.map_projection = "EPSG:3785".lower() if int(
            self.geonode_projection.split(":")[1]) == 900913 else \
            self.geonode_projection
        self.in_proj = Proj(init=self.map_projection, preserve_units=True)
        self.out_proj = Proj(init='epsg:4326')
        self.main_config = _config
        self.server_config = self.main_config.copy()
        self.server_config.update({'version': "2.6.7"})

    def reproject(self, x1, y1):
        """reproject Geonode maps center to terria
          :param x1: map.center_x
          :param y1: map.center_y
          :type x1: type int
          :type y1: type int
          :return: return projected points
          :rtype:  tuple(int,int)
        """
        x2, y2 = transform(self.in_proj, self.out_proj, x1, y1)
        return (x2, y2)

    def index_page(self, request, map_id):
        template = self.terria_template
        map_id_key = request.session.get(self.terria_map, None)
        current_id = int(map_id_key) if map_id_key else 0
        if not current_id or current_id != map_id:
            request.session[self.terria_map] = map_id
        map_element = Map.objects.get(id=map_id)
        context = {
            'mapTitle': map_element.title,
            'site_url': settings.SITEURL,
            'mapId': map_id
        }
        return render(request, template, context)

    def map_list(self, request):
        template = self.map_list_template
        return render(request, template, context={"site_url": settings.SITEURL})

    def server_config_view(self, request):
        return JsonResponse(self.server_config)

    def proxyable_domains(self, request):
        return JsonResponse(self.main_config)

    def build_map_catalog(self, map, current_map_id, access_token):
        layers = []
        for layer in map.local_layers:
            workspace, name = layer.typename.split(':')
            layer_item = {
                "name": layer.title,
                "metadataUrl": "{}{}/{}/wms?request=GetCapabilities&version=1.1.0&access_token={}".format(self.geoserver_url, workspace, name, access_token),
                "url": "{}{}/{}/wms?&access_token={}".format(self.geoserver_url, workspace, name, access_token),
                "description": layer.abstract,
                "type": "wms",
                "isGeoServer": True,
                "layers": name
            }
            if current_map_id and int(current_map_id) == map.id:
                layer_item.update({"isShown": True})
            layers.append(layer_item)
        return layers

    def layer_metadata(self, request, layer_id=None):
        """metadata_xml"""
        layer = get_object_or_404(Layer, pk=layer_id)
        layer_metadata = layer.metadata_xml
        return HttpResponse(layer_metadata, content_type="application/xml")

    def build_main_catalog(self, permitted_ids, current_map_id, access_token=None, config={}):
        maps = Map.objects.filter(id__in=permitted_ids)
        maps_catalog = {
            "name": "Cartoview Maps",
            "type": "group",
            "preserveOrder": True,
            "isOpen": True
        }
        catalog = []
        for map in maps:
            map_item = {
                "name": map.title,
                "type": "group",
                "isOpen": False
            }
            layers_as_catalog_item = self.build_map_catalog(
                map, current_map_id, access_token)
            if current_map_id and int(current_map_id) == map.id:
                x0, y0 = self.reproject(map.bbox[0], map.bbox[3])
                x1, y1 = self.reproject(map.bbox[2], map.bbox[1]) 
                config.update(
                    {
                        "homeCamera": {
                            "south": y0,
                            "west": x0,
                            "north": y1,
                            "east": x1 
                        },
                        "viewerMode": "2d",
                    }
                )
            map_item.update({"items": layers_as_catalog_item})
            catalog.append(map_item)
        maps_catalog.update({"items": catalog})
        config.update({"catalog": [maps_catalog]})
        return config

    def terria_json(self, request):
        access_token = request.session.get('access_token', None)
        map_id = request.session.get(self.terria_map, None)
        permitted_ids = get_objects_for_user(request.user, 'base.view_resourcebase').values('id')
        catalog = self.build_main_catalog(permitted_ids, map_id, access_token)
        return JsonResponse(catalog)

    def get_urls_patterns(self):
        url_patterns = [
            re_path(r'^$', self.map_list, name='%s.index' % APP_NAME),
            re_path(r'^(?P<map_id>\d+)$', self.index_page, name='%s.list' % APP_NAME),
            re_path(r'^serverconfig/$', self.server_config_view, name='%s.config' % APP_NAME),
            re_path(r'^proxyabledomains/$', self.proxyable_domains, name='%s.proxy' % APP_NAME),
            re_path(r'^metadata/(?P<layer_id>\d+)$', self.layer_metadata, name='%s.metadata' % APP_NAME),
            re_path(r'^init/terria.json$', self.terria_json, name='%s.json' % APP_NAME),
            re_path(r'^help/help.html', TemplateView.as_view(template_name=_templates.get('terria_help_template', None)),name='terria_help'),
        ]
        return url_patterns


CARTOVIEW_TERRIA = CartoviewTerriaMap()
