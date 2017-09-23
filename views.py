import json

from django.shortcuts import HttpResponse, render, render_to_response


def server_config(request):
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
        'proxyAllDomains': False,
        'version': "2.6.7"
    }
    return HttpResponse(content=json.dumps(config),
                        content_type='application/json')


def proxyabledomains(request):
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
    return HttpResponse(content=json.dumps(config), content_type='application/json')


def terria_json(request):
    config = {
        "homeCamera": {
            "north": -8,
            "east": 158,
            "south": -45,
            "west": 109
        },
        "catalog": [{
                    "name": "Cartoview Demo",
                    "type": "group",
                    "preserveOrder": True,
                    "isOpen": True,
                    "items": [{
                        "name": "Cartoview",
                        "type": "group",
                        "isOpen": True,
                        "items": [{
                            "name": "All WFS Dataset",
                            "type": "wfs-getCapabilities",
                            "url": "http://try.cartoview.net/geoserver/wfs"
                        },
                            {
                            "name": "nyc_fatality_yearly",
                            "url": "http://try.cartoview.net/geoserver/gwc/service/wms",
                            "type": "wms",
                            "layers": "geonode:nyc_fatality_yearly",
                            "isGeoServer": True,
                            "availableStyles": [
                                {
                                    "name": "nyc_fatality_yearly_1502620816915",
                                    "title": "style123",
                                    "legendUrl": "http://try.cartoview.net/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=geonode%3Anyc_fatality_yearly&style=nyc_fatality_yearly_1502620816915"
                                }
                            ]
                        },
                            {
                            "name": "GeoWebCache WMS (fast)",
                            "url": "http://try.cartoview.net/geoserver/gwc/service/wms",
                            "type": "wms-getCapabilities"
                        },
                            {
                            "name": "Normal WMS (slow)",
                            "url": "http://try.cartoview.net/geoserver/wms",
                            "type": "wms-getCapabilities"
                        }
                        ]
                    }]
                    }]
    }
    return HttpResponse(content=json.dumps(config), content_type='application/json')
