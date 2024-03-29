# Terria Map

![Terria logo](./static/terria_map/terria-logo.png "Terria logo")

This is a django app that is configured to run on [Cartoview](https://cartoview.net/) to display [GeoNode](https://github.com/GeoNode/geonode) maps using [TerriaJS library](https://github.com/TerriaJS/TerriaJS).

It uses the starting project of TerriaJS, [TerriaMap](https://github.com/TerriaJS/TerriaMap) which is a catalog-based web geospatial visualisation platform.

## Getting Started

The following steps describe how to run this app in Cartoview for development purposes.

1. Clone this repository inside the pre-installed cartoview, apps directory (e.g. `installed-cartoview/apps/`) with the name **terria_map**.
    ```shell
    git clone https://github.com/cartologic/cartoview_terriaJs.git terria_map
    ```
2. Navigate to `static/terria_map` directory,
    - Run `npm install` to install the Terria Map dependencies It's recommended to use [NodeJS v10.24.1](https://nodejs.org/download/release/v10.24.1/).
    - Then run `npm run gulp` to build a standard version of Terria Map. You can otherwise build a minified release build by running `npm run gulp release`.
3. Adjust any configuration that should be done for installing a normal Cartoview app for development.
    - Add the app details to the `apps.json` found in `cartoview/apps` directory.
    ```json
    "terria_map": {
        "active": true,
        "order": 1,
        "pending": false
    }
    ```
    - Open django admin page (e.g. `/admin`) and create an entry for the app with its details in the `Apps` model.
    
    **Note:** Make sure to use **terria_map** as name instead of TerriaMap and mark the app as a `Single instance`.
    ![Terria app in admin](https://user-images.githubusercontent.com/30727109/132563178-3c9ad85b-251d-450e-bc79-f6e2b9ec15dd.png)
    ![Terria app in admin](https://user-images.githubusercontent.com/30727109/132563211-9cdb899d-cf5c-4682-940c-e5891b769c26.png)
4. Restart Cartoview.

Now, you should have the app installed. You can start adding layers and creating maps in [GeoNode](https://github.com/GeoNode/geonode) to be able to show them in the app.

## Components

This app consists of the following:
* A **landing page** that shows all the created maps, built as a single page application using [React](https://reactjs.org/).
* The **Terria Map** itself displaying GeoNode maps.

At `views.py`, you can find all the views that are responsible for delivering the necessary configurations to run the maps. Such as the main catalog that holds the layers for each created map in GeoNode.

You can access the code of **Terria Map** and make any edits to the UI of the original app. But you have to build it again using the command `npm run gulp`.

## Changes

This app is configured to run in a django environment so to handle static files like the build, there are some changes that are made inside **terria_map**.

1. **index.js**:
```
var terriaOptions = {
    baseUrl: '/static/terria_map/wwwroot/build/TerriaJS' # Instead of 'build/TerriaJS'
};
```
```
module.exports = terria.start({
    ...
    configUrl: '/static/terria_map/wwwroot/config.json' # Instead of 'config.json'
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
            publicPath: hot ? 'http://localhost:3003/build/' : '/static/terria_map/wwwroot/build/' # Instead of 'build/'
            ...
        },
        ...
    }
    ...
}
```

3. Move **wwwroot/index.html** to `templates` directory, rename it **terria.html**, and update any static file import.

## TerriaMap Localization

If you want to add a translation for a particular language, you may follow [this guide](static/terria_map/README.md#localization) of how to add a new language to Terria map.

## Limitations

TerriaJS comes with a Node.js-based web server, called [terria-server](https://github.com/TerriaJS/terriajs-server) that offers many useful features like serving static files and a proxy service that allows TerriaJS to access geospatial data servers that don't support CORS.

As this app is intended to run in a django environment, **terria-server** is not available to use in the app yet.

For information about the importance of terria server, please refer to [TerriaJS documentation](https://docs.terria.io/guide/deploying/deploying-terriamap/#using-any-web-server).
