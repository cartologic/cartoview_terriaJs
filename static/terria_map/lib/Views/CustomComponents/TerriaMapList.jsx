import PropTypes from 'prop-types';
import React from "react";
import {withTranslation} from "react-i18next";
import Styles from "terriajs/lib/ReactViews/Map/menu-button.scss";
import Icon from "terriajs/lib/ReactViews/Icon";

const TerriaMapList = props => {
    const {t} = props;
    const {terriaAppURL} = globalURLs;
    return (
        <div>
            <a
                className={Styles.btnAboutLink}
                href={terriaAppURL}
                title={t("TerriaMapsList.caption")}
            >
                <Icon glyph={Icon.GLYPHS.externalLink}/>
                <span>{t("TerriaMapsList.caption")}</span>
            </a>
        </div>
    );
};

TerriaMapList.propTypes = {
    t: PropTypes.func.isRequired
};

export default withTranslation()(TerriaMapList);
