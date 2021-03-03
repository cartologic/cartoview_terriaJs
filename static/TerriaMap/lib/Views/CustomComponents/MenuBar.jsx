import React from "react";
import createReactClass from "create-react-class";
import {withTranslation, Trans} from "react-i18next";
import PropTypes from "prop-types";
import classNames from "classnames";
import triggerResize from "terriajs/lib/Core/triggerResize";
import HelpMenuPanelBasic from "terriajs/lib/ReactViews/HelpScreens/HelpMenuPanelBasic.jsx";
import SettingPanel from "terriajs/lib/ReactViews/Map/Panels/SettingPanel.jsx";
import SharePanel from "terriajs/lib/ReactViews/Map/Panels/SharePanel/SharePanel.jsx";
import ToolsPanel from "terriajs/lib/ReactViews/Map/Panels/ToolsPanel/ToolsPanel.jsx";
import Icon from "terriajs/lib/ReactViews/Icon.jsx";
import ObserveModelMixin from "terriajs/lib/ReactViews/ObserveModelMixin";
import Prompt from "terriajs/lib/ReactViews/Generic/Prompt";
import Styles from "terriajs/lib/ReactViews/Map/menu-bar.scss";

// The map navigation region
const MenuBar = createReactClass({
    displayName: "MenuBar",
    mixins: [ObserveModelMixin],

    propTypes: {
        terria: PropTypes.object,
        viewState: PropTypes.object.isRequired,
        allBaseMaps: PropTypes.array,
        animationDuration: PropTypes.number,
        menuItems: PropTypes.arrayOf(PropTypes.element),
        t: PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            menuItems: []
        };
    },

    handleClick() {
        this.props.viewState.topElement = "MenuBar";
    },

    onStoryButtonClick() {
        this.props.viewState.storyBuilderShown = !this.props.viewState
            .storyBuilderShown;
        this.props.terria.currentViewer.notifyRepaintRequired();
        // Allow any animations to finish, then trigger a resize.
        setTimeout(function () {
            triggerResize();
        }, this.props.animationDuration || 1);
        this.props.viewState.toggleFeaturePrompt("story", false, true);
    },
    dismissAction() {
        this.props.viewState.toggleFeaturePrompt("story", false, true);
    },
    dismissSatelliteGuidanceAction() {
        this.props.viewState.toggleFeaturePrompt("mapGuidesLocation", true, true);
    },
    render() {
        const {t} = this.props;
        const satelliteGuidancePrompted = this.props.terria.getLocalProperty(
            "satelliteGuidancePrompted"
        );
        const mapGuidesLocationPrompted = this.props.terria.getLocalProperty(
            "mapGuidesLocationPrompted"
        );
        const storyEnabled = this.props.terria.configParameters.storyEnabled;
        const enableTools = this.props.terria.getUserProperty("tools") === "1";

        const promptHtml =
            this.props.terria.stories.length > 0 ? (
                <Trans i18nKey="story.promptHtml1">
                    <div>
                        You can view and create stories at any time by clicking here.
                    </div>
                </Trans>
            ) : (
                <Trans i18nKey="story.promptHtml2">
                    <div>
                        <small>INTRODUCING</small>
                        <h3>Data Stories</h3>
                        <div>
                            Create and share interactive stories directly from your map.
                        </div>
                    </div>
                </Trans>
            );
        const delayTime =
            storyEnabled && this.props.terria.stories.length > 0 ? 1000 : 2000;
        return (
            <div
                className={classNames(
                    Styles.menuArea,
                    this.props.viewState.topElement === "MenuBar" ? "top-element" : ""
                )}
                onClick={this.handleClick}
            >
                <ul className={Styles.menu}>
                    <If condition={storyEnabled}>
                        <li className={Styles.menuItem}>
                            <button
                                className={Styles.storyBtn}
                                type="button"
                                onClick={this.onStoryButtonClick}
                                aria-expanded={this.props.viewState.storyBuilderShown}
                            >
                                <Icon glyph={Icon.GLYPHS.story}/>
                                <span>{t("story.story")}</span>
                            </button>
                            {storyEnabled &&
                            this.props.viewState.featurePrompts.indexOf("story") >= 0 && (
                                <Prompt
                                    content={promptHtml}
                                    displayDelay={delayTime}
                                    dismissText={t("story.dismissText")}
                                    dismissAction={this.dismissAction}
                                />
                            )}
                        </li>
                    </If>
                    <li className={Styles.menuItem}>
                        <SettingPanel
                            terria={this.props.terria}
                            allBaseMaps={this.props.allBaseMaps}
                            viewState={this.props.viewState}
                        />
                    </li>
                    <li className={Styles.menuItem}>
                        <SharePanel
                            terria={this.props.terria}
                            viewState={this.props.viewState}
                        />
                    </li>
                    <li className={Styles.menuItem}>
                        <HelpMenuPanelBasic
                            terria={this.props.terria}
                            viewState={this.props.viewState}
                        />
                        {this.props.terria.configParameters.showFeaturePrompts &&
                        satelliteGuidancePrompted &&
                        !mapGuidesLocationPrompted &&
                        !this.props.viewState.showSatelliteGuidance && (
                            <Prompt
                                content={
                                    <div>
                                        <Trans i18nKey="satelliteGuidance.menuTitle">
                                            You can access map guides at any time by looking in the{" "}
                                            <strong>help menu</strong>.
                                        </Trans>
                                    </div>
                                }
                                displayDelay={1000}
                                dismissText={t("satelliteGuidance.dismissText")}
                                dismissAction={this.dismissSatelliteGuidanceAction}
                            />
                        )}
                    </li>
                    {enableTools && (
                        <li className={Styles.menuItem}>
                            <ToolsPanel
                                terria={this.props.terria}
                                viewState={this.props.viewState}
                            />
                        </li>
                    )}
                    <If condition={!this.props.viewState.useSmallScreenInterface}>
                        <For each="element" of={this.props.menuItems} index="i">
                            <li className={Styles.menuItem} key={i}>
                                {element}
                            </li>
                        </For>
                    </If>
                </ul>
            </div>
        );
    }
});

export default withTranslation()(MenuBar);
