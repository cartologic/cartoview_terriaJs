import React from "react";
import { withTranslation } from "react-i18next";
import MenuButton from "terriajs/lib/ReactViews/Map/MenuButton";

const AboutButton = () => {
    const { t } = this.props;
    return (
        <MenuButton
            caption={t("about.caption")}
            href="https://nationalmap.gov.au/about.html"
        />
    );
};

export default withTranslation()(AboutButton);
