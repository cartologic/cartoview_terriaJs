import React from "react";
import defined from "terriajs-cesium/Source/Core/defined";
import createReactClass from "create-react-class";

import PropTypes from "prop-types";

import ObserveModelMixin from "terriajs/lib/ReactViews/ObserveModelMixin";
import classNames from "classnames";
import MobileMenuItem from "terriajs/lib/ReactViews/Mobile/MobileMenuItem";
import SettingPanel from "terriajs/lib/ReactViews/Map/Panels/SettingPanel.jsx";
import SharePanel from "terriajs/lib/ReactViews/Map/Panels/SharePanel/SharePanel.jsx";
import HelpMenuPanelBasic from "terriajs/lib/ReactViews/HelpScreens/HelpMenuPanelBasic.jsx";
import Maps from "./Maps/Maps";
import Terria from "terriajs/lib/Models/Terria";
import {withTranslation} from "react-i18next";

import ViewState from "terriajs/lib/ReactViewModels/ViewState";

import Styles from "terriajs/lib/ReactViews/Mobile/mobile-menu.scss";

const MobileMenu = createReactClass({
    displayName: "MobileMenu",
    mixins: [ObserveModelMixin],

    propTypes: {
        menuItems: PropTypes.arrayOf(PropTypes.element),
        viewState: PropTypes.instanceOf(ViewState).isRequired,
        showFeedback: PropTypes.bool,
        terria: PropTypes.instanceOf(Terria).isRequired,
        allBaseMaps: PropTypes.array.isRequired,
        t: PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            menuItems: [],
            showFeedback: false
        };
    },

    toggleMenu() {
        this.props.viewState.mobileMenuVisible = !this.props.viewState
            .mobileMenuVisible;
    },

    getInitialState() {
        return {};
    },

    onFeedbackFormClick() {
        this.props.viewState.feedbackFormIsVisible = true;
        this.props.viewState.mobileMenuVisible = false;
    },

    hideMenu() {
        this.props.viewState.mobileMenuVisible = false;
    },

    runStories() {
        this.props.viewState.storyBuilderShown = false;
        this.props.viewState.storyShown = true;
        this.props.viewState.mobileMenuVisible = false;
    },
    dismissSatelliteGuidanceAction() {
        this.props.viewState.toggleFeaturePrompt("mapGuidesLocation", true, true);
    },

    render() {
        const {t} = this.props;
        const hasStories =
            this.props.terria.configParameters.storyEnabled &&
            defined(this.props.terria.stories) &&
            this.props.terria.stories.length > 0;
        // return this.props.viewState.mobileMenuVisible ? (
        return (
            <div>
                <If condition={this.props.viewState.mobileMenuVisible}>
                    <div className={Styles.overlay} onClick={this.toggleMenu}/>
                </If>
                <div
                    className={classNames(Styles.mobileNav, {
                        [Styles.mobileNavHidden]: !this.props.viewState.mobileMenuVisible
                    })}
                >
                    <div onClick={this.hideMenu}>
                        <SettingPanel
                            terria={this.props.terria}
                            allBaseMaps={this.props.allBaseMaps}
                            viewState={this.props.viewState}
                        />
                    </div>
                    <div onClick={this.hideMenu}>
                        <SharePanel
                            terria={this.props.terria}
                            viewState={this.props.viewState}
                        />
                    </div>
                    <div onClick={this.hideMenu}>
                        <HelpMenuPanelBasic
                            terria={this.props.terria}
                            viewState={this.props.viewState}
                        />
                    </div>
                    <div onClick={this.hideMenu}>
                        <Maps
                            viewState={this.props.viewState}
                        />
                    </div>
                    <For each="menuItem" of={this.props.menuItems}>
                        <div onClick={this.hideMenu} key={menuItem.key}>
                            {menuItem}
                        </div>
                    </For>
                    <If condition={this.props.showFeedback}>
                        <MobileMenuItem
                            onClick={this.onFeedbackFormClick}
                            caption={t("feedback.feedbackBtnText")}
                        />
                    </If>
                    <If condition={hasStories}>
                        <MobileMenuItem
                            onClick={this.runStories}
                            caption={t("story.mobileViewStory", {
                                storiesLength: this.props.terria.stories.length
                            })}
                        />
                    </If>
                </div>
            </div>
        );
    }
});

export default withTranslation()(MobileMenu);
