# -*- coding: utf-8 -*-
import json

from django.conf import settings
from django.shortcuts import HttpResponse, render
from geonode.maps.models import Map
from guardian.shortcuts import get_objects_for_user
from pyproj import Proj, transform

geoserver_url = settings.OGC_SERVER['default']['PUBLIC_LOCATION']
terria_map = "terria_map_id"
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


def reproject(x1, y1):
    geonode_projection = settings.DEFAULT_MAP_CRS
    map_projection = "EPSG:3785".lower() if int(geonode_projection.split(":")
                                                [1]) == 900913 else geonode_projection

    in_proj = Proj(init=map_projection, preserve_units=True)
    out_proj = Proj(init='epsg:4326')
    x2, y2 = transform(in_proj, out_proj, x1, y1)
    return (x2, y2)


def index(request, map_id):
    template = "cartoview_terriaJs/terria.html"
    map_id_key = request.session.get(terria_map, None)
    current_id = int(map_id_key) if map_id_key else 0
    if not current_id or current_id != map_id:
        request.session[terria_map] = map_id
    return render(request, template, context={})


def map_list(request):
    template = "cartoview_terriaJs/list.html"
    return render(request, template, context={"site_url": settings.SITEURL})


def server_config(request):
    server_config_dict = config.copy()
    server_config_dict.update({'version': "2.6.7"})
    return HttpResponse(content=json.dumps(server_config_dict),
                        content_type='application/json')


def proxyabledomains(request):
    return HttpResponse(content=json.dumps(config),
                        content_type='application/json')


def terria_json(request):
    map_id = request.session.get(terria_map, None)
    permitted_ids = get_objects_for_user(request.user,
                                         'base.view_resourcebase').values('id')
    config = {

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
            if map_id and int(map_id) == map.id:
                layer_item.update({"isShown": True, "isEnabled": True})
            layers.append(layer_item)

        if map_id and int(map_id) == map.id:
            x, y = reproject(map.center_x, map.center_y)
            config.update({"homeCamera": {
                "west": x,
                "south": y,
                "east": x,
                "north": y}})
        map_item.update({"items": layers})
        catalog.append(map_item)
    maps_catalog.update({"items": catalog})
    config.update({"catalog": [maps_catalog]})
    return HttpResponse(content=json.dumps(config),
                        content_type='application/json')
