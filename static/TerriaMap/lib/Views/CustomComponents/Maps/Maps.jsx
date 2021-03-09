import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./maps.scss";
import MapSettings from "./MapSettings/MapSettings";
import classNames from "classnames";
import axios from "axios";
import {withTranslation} from "react-i18next";

const Maps = (props) => {
    const dropdownTheme = {
        inner: Styles.dropdownInner,
        icon: "gallery",
    };

    const [maps, setMaps] = useState([]);
    const [sortMapsBy, setSortMapsBy] = useState('-date');
    const { t } = props;
    // eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
    const { mapsApiUrl, getTerriaUrl, currentMapId, newMap } = globalURLs;

    const getMaps = () => {
        const params = {
            order_by: sortMapsBy,
        };
        axios(mapsApiUrl, { params })
            .then(response => {
                const allMaps = response.data.objects;
                const filteredMaps = allMaps.filter(mapEl => mapEl.id !== currentMapId);
                setMaps(filteredMaps);
            });
    };

    useEffect(() => {
        getMaps();
    }, [sortMapsBy]);

    const handleSortByChange = event => setSortMapsBy(event.target.value);

    return (
        <MenuPanel
            theme={dropdownTheme}
            btnText={t("mapPanel.btnText")}
            smallScreen={props.viewState.useSmallScreenInterface}
            viewState={props.viewState}
            btnTitle={t("mapPanel.btnTitle")}
        >
            <div className={classNames(PanelStyles.section)}>
                <div className={Styles.headingWrapper}>
                    <h2>{t("mapPanel.panelLabel")}</h2>
                    <MapSettings
                        sortMapsBy={sortMapsBy}
                        handleSortByChange={handleSortByChange}
                    />
                    <button
                        onClick={() => window.open(newMap, '_blank')}
                        className={Styles.createMap}
                        title={t("mapPanel.createMap")}
                    >
                        {t("mapPanel.createMap")}
                    </button>
                </div>
                <p>{t("mapPanel.panelDescription")}</p>
                {
                    maps.map(mapElement => {
                        return (
                            <div className={classNames(PanelStyles.section, Styles.section)} key={mapElement.id}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={getTerriaUrl(mapElement.id)}
                                >
                                    <img
                                        className={Styles.image}
                                        src={mapElement.thumbnail_url || "../../../../wwwroot/images/no-img.png"}
                                        alt={mapElement.title}
                                    />
                                </a>

                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={Styles.link}
                                    href={getTerriaUrl(mapElement.id)}
                                >
                                    {mapElement.title}
                                </a>

                                <p>
                                    {mapElement.abstract === "" ? "No Description provided." : mapElement.abstract}
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        </MenuPanel>
    );
};

Maps.propTypes = {
    viewState: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default withTranslation()(Maps);
