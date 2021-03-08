# Terria Map

![Terria logo](./static/TerriaMap/terria-logo.png "Terria logo")

This is a django app that is configured to run on [Cartoview](https://cartoview.net/) to display [GeoNode](https://github.com/GeoNode/geonode) maps using [TerriaJS library](https://github.com/TerriaJS/TerriaJS).

It uses the starting project of TerriaJS, [TerriaMap](https://github.com/TerriaJS/TerriaMap) which is a catalog-based web geospatial visualisation platform.

## Getting Started

The following steps describe how to run this app in Cartoview for development purposes.

1. Clone this repository.
2. Navigate to `static/TerriaMap` directory,
    - Run `npm install` to install the TerriaMap dependencies.
    - Then run `npm run gulp` to build a standard version of TerriaMap. You can otherwise build a minified release build by running `npm run gulp release`.
3. Adjust any configuration that should be done for installing a normal Cartoview app for development.
    - Add the app details to the `apps.json` found in `cartoview/apps` directory.
    ```json
    "cartoview_terriaJs": {
        "active": true,
        "order": 1,
        "pending": false
    }
    ```
    - Create an entry for the app with its details in Django admin in the `Apps` model.
        > **Note:** Make sure to mark the app as a `Single instance`.
4. Restart Cartoview.

Now, you should have the app installed. You can start adding layers and creating maps in [GeoNode](https://github.com/GeoNode/geonode) to be able to show them in the app.

## Components

This app consists of the following:
* A **landing page** that shows all the created maps, built as a single page application using [React](https://reactjs.org/).
* The **TerriaMap** itself displaying GeoNode maps.

At `views.py`, you can find all the views that are responsible for delivering the necessary configurations to run the maps. Such as the main catalog that holds the layers for each created map in GeoNode.

You can access the code of **TerriaMap** and make any edits to the UI of the original app. But you have to build it again using the command `npm run gulp`.

## Changes

This app is configured to run in a django environment so to handle static files like the build, there are some changes that are made inside **TerriaMap**.

1. **index.js**:
```
var terriaOptions = {
    baseUrl: '/static/TerriaMap/wwwroot/build/TerriaJS' # Instead of 'build/TerriaJS'
};
```
```
module.exports = terria.start({
    ...
    configUrl: '/static/TerriaMap/wwwroot/config.json' # Instead of 'config.json'
    ...
});
```

2. **buildprocess/webpack.config.js**:
```
module.exports = function(devMode, hot) {
    ...
    var config = {
        ...
        output: {
            ...
            publicPath: hot ? 'http://localhost:3003/build/' : '/static/TerriaMap/wwwroot/build/' # Instead of 'build/'
            ...
        },
        ...
    }
    ...
}
```

3. Move **wwwroot/index.html** to `templates` directory, rename it **terria.html**, and update any static file import.

## TerriaMap Localization

If you want to add a translation for a particular language, you may follow [this guide](static/TerriaMap/README.md#localization) of how to add a new language to Terria map.

## Limitations

TerriaJS comes with a Node.js-based web server, called [terria-server](https://github.com/TerriaJS/terriajs-server) that offers many useful features like serving static files and a proxy service that allows TerriaJS to access geospatial data servers that don't support CORS.

As this app is intended to run in a django environment, **terria-server** is not available to use in the app yet.

For information about the importance of terria server, please refer to [TerriaJS documentation](https://docs.terria.io/guide/deploying/deploying-terriamap/#using-any-web-server).