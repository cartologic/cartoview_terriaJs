import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./maps.scss";
import MapSettings from "./MapSettings/MapSettings";
import CustomizedCircularProgress from './CircularProgress/CustomCircularProgress';
import classNames from "classnames";
import axios from "axios";
import {withTranslation} from "react-i18next";

const Maps = (props) => {
    const dropdownTheme = {
        inner: Styles.dropdownInner,
        icon: "gallery",
    };

    const [maps, setMaps] = useState([]);
    const [loadingMaps, setLoadingMaps] = useState(true);
    const [sortMapsBy, setSortMapsBy] = useState('-date');
    const [filterMapsBy, setFilterMapsBy] = useState('');
    const { t } = props;
    // eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
    const { mapsApiUrl, getTerriaUrl, currentMapId, newMap, currentUsername } = globalURLs;

    const getMaps = () => {
        if (!loadingMaps){
            setLoadingMaps(true);
        }
        const params = {
            order_by: sortMapsBy,
        };
        if ( filterMapsBy !== '' ){
            params.owner__username__in = filterMapsBy;
        }
        else {
            if ("owner__username__in" in params){
                delete params.owner__username__in;
            }
        }
        axios(mapsApiUrl, { params })
            .then(response => {
                const allMaps = response.data.objects;
                const filteredMaps = allMaps.filter(mapEl => mapEl.id !== currentMapId);
                setMaps(filteredMaps);
                setLoadingMaps(false);
            });
    };

    useEffect(() => {
        getMaps();
    }, [sortMapsBy, filterMapsBy]);

    const handleSortByChange = event => setSortMapsBy(event.target.value);
    const handleFilterChange = event => setFilterMapsBy(event.target.value);

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
                        filterMapsBy={filterMapsBy}
                        handleFilterChange={handleFilterChange}
                        currentUsername={currentUsername}
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
                    loadingMaps ? (
                        <CustomizedCircularProgress />
                    ):(
                        maps.length !== 0 ? (
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
                        ):(
                            <p className={Styles.noMaps}>There are no available maps</p>
                        )
                    )
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
