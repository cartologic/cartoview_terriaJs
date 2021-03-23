import PropTypes from 'prop-types';
import React from "react";
import { withTranslation } from "react-i18next";
import MenuButton from "terriajs/lib/ReactViews/Map/MenuButton";

const AboutButton = props => {
    const { t } = props;
    return (
        <MenuButton
            caption={t("about.caption")}
            href="https://nationalmap.gov.au/about.html"
        />
    );
};

AboutButton.propTypes = {
    t: PropTypes.object.isRequired
};

export default withTranslation()(AboutButton);
