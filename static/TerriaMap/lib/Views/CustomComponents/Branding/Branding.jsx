import React from "react";
import Styles from "./branding.scss";

const Branding = () => {
    // eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
    const { mapTitle } = globalURLs;
    return (
        <div className={Styles.branding}>
            <p className={Styles.mapTitle}>{mapTitle}</p>
        </div>
    );
};

export default Branding;
