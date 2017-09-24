# -*- coding: utf-8 -*-
import json

from django.shortcuts import HttpResponse
from geonode.maps.models import Map
from guardian.shortcuts import get_objects_for_user
from django.conf import settings
geoserver_url = settings.OGC_SERVER['default']['PUBLIC_LOCATION']
config = {
    'allowProxyFor': ["nicta.com.au", "gov.au", "csiro.au",
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


def server_config(request):
    server_config_dict = config.copy()
    server_config_dict.update({'version': "2.6.7"})
    return HttpResponse(content=json.dumps(server_config_dict),
                        content_type='application/json')


def proxyabledomains(request):
    return HttpResponse(content=json.dumps(config),
                        content_type='application/json')


def terria_json(request):
    permitted_ids = get_objects_for_user(request.user,
                                         'base.view_resourcebase').values('id')
    config = {
        "homeCamera": {
            "north": -8,
            "east": 158,
            "south": -45,
            "west": 109
        },
    }
    maps_catalog = {
        "name": "Cartoview Maps",
        "type": "group",
        "preserveOrder": True,
        "isOpen": True}
    catalog = []
    maps = Map.objects.filter(id__in=permitted_ids)
    for map in maps:
        map_item = {
            "name": map.title,
            "type": "group",
            "isOpen": False
        }
        layers = []
        for layer in map.local_layers:
            layer_item = {
                "name": layer.title,
                "url": "{}{}".format(geoserver_url, 'wms'),
                "description": layer.abstract,
                "type": "wms",
                "isGeoServer": True,
                "layers": layer.typename
            }
            layers.append(layer_item)
        map_item.update({"items": layers})
        catalog.append(map_item)
    maps_catalog.update({"items": catalog})
    config.update({"catalog": [maps_catalog]})
    return HttpResponse(content=json.dumps(config),
                        content_type='application/json')
