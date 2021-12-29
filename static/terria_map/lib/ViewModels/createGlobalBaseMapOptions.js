/*global require*/
const createBingBaseMapOptions = require("terriajs/lib/ViewModels/createBingBaseMapOptions");
const BaseMapViewModel = require("terriajs/lib/ViewModels/BaseMapViewModel");
const OpenStreetMapCatalogItem = require("terriajs/lib/Models/OpenStreetMapCatalogItem");

const createGlobalBaseMapOptions = function (terria, bingMapsKey) {
    const result = createBingBaseMapOptions(terria, bingMapsKey);

    const positron = new OpenStreetMapCatalogItem(terria);
    positron.name = "Positron (Light)";
    positron.url = "https://basemaps.cartocdn.com/light_all/";

    // https://cartodb.com/basemaps/ gives two different attribution strings. In any case HTML gets swallowed, so we have to adapt.
    // 1 '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy;
    //   <a href="http://cartodb.com/attributions">CartoDB</a>'
    // 2 Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">
    //   CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.
    positron.attribution = "© OpenStreetMap contributors ODbL, © CARTO CC-BY 3.0";

    positron.opacity = 1.0;
    positron.subdomains = ["a", "b", "c", "d"];
    result.push(
        new BaseMapViewModel({
            image: require("../../wwwroot/images/base-maps/positron.png"),
            catalogItem: positron,
            contrastColor: "#000000"
        })
    );

    const darkMatter = new OpenStreetMapCatalogItem(terria);
    darkMatter.name = "Dark Matter";
    darkMatter.url = "https://basemaps.cartocdn.com/dark_all/";

    darkMatter.attribution =
        "© OpenStreetMap contributors ODbL, © CARTO CC-BY 3.0";

    darkMatter.opacity = 1.0;
    darkMatter.subdomains = ["a", "b", "c", "d"];
    result.push(
        new BaseMapViewModel({
            image: require("../../wwwroot/images/base-maps/dark-matter.png"),
            catalogItem: darkMatter
        })
    );

    return result;
};

module.exports = createGlobalBaseMapOptions;
