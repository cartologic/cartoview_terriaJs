import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./maps.scss";
import classNames from "classnames";
import axios from "axios";
import { withTranslation } from "react-i18next";

const Maps = (props) => {
    const dropdownTheme = {
        inner: Styles.dropdownInner,
        icon: "gallery",
    };

    const [maps, setMaps] = useState([]);
    const { t } = props;
    // eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
    const { mapsApiUrl, getTerriaUrl, currentMapId } = globalURLs;

    useEffect(() => {
        axios(mapsApiUrl).then(response => {
            const allMaps = response.data.objects;
            const filteredMaps = allMaps.filter(mapEl => mapEl.id !== currentMapId);
            setMaps(filteredMaps);
        });
    }, []);

    return (
        <MenuPanel
            theme={dropdownTheme}
            btnText={t("mapPanel.btnText")}
            smallScreen={props.smallScreen}
            viewState={props.viewState}
            btnTitle={t("mapPanel.btnTitle")}
        >
            <label className={PanelStyles.heading}>{t("mapPanel.panelLabel")}</label>
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
        </MenuPanel>
    );
};

Maps.propTypes = {
    viewState: PropTypes.object.isRequired,
    smallScreen: PropTypes.bool,
    t: PropTypes.func.isRequired
};

export default withTranslation()(Maps);
