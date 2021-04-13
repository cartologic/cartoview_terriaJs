import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import classNames from "classnames";
import "inobounce";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import Branding from "./CustomComponents/Branding/Branding";
import arrayContains from "terriajs/lib/Core/arrayContains";
import DragDropFile from "terriajs/lib/ReactViews/DragDropFile.jsx";
import DragDropNotification from "terriajs/lib/ReactViews/DragDropNotification.jsx";
import ExplorerWindow from "terriajs/lib/ReactViews/ExplorerWindow/ExplorerWindow.jsx";
import FeatureInfoPanel from "terriajs/lib/ReactViews/FeatureInfo/FeatureInfoPanel.jsx";
import FeedbackForm from "terriajs/lib/ReactViews/Feedback/FeedbackForm.jsx";
import MapColumn from "terriajs/lib/ReactViews/StandardUserInterface/MapColumn.jsx";
import MapInteractionWindow from "terriajs/lib/ReactViews/Notification/MapInteractionWindow.jsx";
import MapNavigation from "terriajs/lib/ReactViews/Map/MapNavigation.jsx";
import ExperimentalFeatures from "terriajs/lib/ReactViews/Map/ExperimentalFeatures.jsx";
import MenuBar from "./CustomComponents/MenuBar";
import MobileHeader from "./CustomComponents/MobileHeader";
import Notification from "terriajs/lib/ReactViews/Notification/Notification.jsx";
import ObserveModelMixin from "terriajs/lib/ReactViews/ObserveModelMixin";
import ProgressBar from "terriajs/lib/ReactViews/Map/ProgressBar.jsx";
import SidePanel from "terriajs/lib/ReactViews/SidePanel/SidePanel.jsx";
import processCustomElements from "terriajs/lib/ReactViews/StandardUserInterface/processCustomElements";
import FullScreenButton from "terriajs/lib/ReactViews/SidePanel/FullScreenButton.jsx";
import StoryPanel from "terriajs/lib/ReactViews/Story/StoryPanel.jsx";
import StoryBuilder from "terriajs/lib/ReactViews/Story/StoryBuilder.jsx";
import ToolPanel from "terriajs/lib/ReactViews/ToolPanel.jsx";
import SatelliteGuide from "terriajs/lib/ReactViews/Guide/SatelliteGuide.jsx";
import WelcomeMessage from "terriajs/lib/ReactViews/WelcomeMessage/WelcomeMessage.jsx";
import InternetExplorerOverlay from "terriajs/lib/ReactViews/InternetExplorerOverlay/InternetExplorerOverlay.jsx";
import { Small, Medium } from "terriajs/lib/ReactViews/Generic/Responsive";
import Styles from "terriajs/lib/ReactViews/StandardUserInterface/standard-user-interface.scss";

import "./global.scss";
import "../Models/i18n";

export const showStoryPrompt = (viewState, terria) => {
  terria.configParameters.showFeaturePrompts &&
    terria.configParameters.storyEnabled &&
    terria.stories.length === 0 &&
    viewState.toggleFeaturePrompt("story", true);
};
const animationDuration = 250;
/** blah */
const StandardUserInterface = createReactClass({
  displayName: "StandardUserInterface",
  mixins: [ObserveModelMixin],
  propTypes: {
    /**
     * Terria instance
     */
    terria: PropTypes.object.isRequired,
    /**
     * All the base maps.
     */
    allBaseMaps: PropTypes.array,
    viewState: PropTypes.object.isRequired,
    minimumLargeScreenWidth: PropTypes.number,
    version: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]),
    t: PropTypes.func.isRequired
  },
  getDefaultProps() {
    return { minimumLargeScreenWidth: 768 };
  },
  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillMount() {
    const { t } = this.props;
    const that = this;
    // only need to know on initial load
    this.dragOverListener = e => {
      if (
        !e.dataTransfer.types ||
        !arrayContains(e.dataTransfer.types, "Files")
      ) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "copy";
      that.acceptDragDropFile();
    };
    this.resizeListener = () => {
      this.props.viewState.useSmallScreenInterface = this.shouldUseMobileInterface();
    };
    window.addEventListener("resize", this.resizeListener, false);
    this.resizeListener();
    if (
      this.props.terria.configParameters.storyEnabled &&
      this.props.terria.stories &&
      this.props.terria.stories.length &&
      !this.props.viewState.storyShown
    ) {
      this.props.viewState.notifications.push({
        title: t("sui.notifications.title"),
        message: t("sui.notifications.message"),
        confirmText: t("sui.notifications.confirmText"),
        denyText: t("sui.notifications.denyText"),
        confirmAction: () => {
          this.props.viewState.storyShown = true;
        },
        denyAction: () => {
          this.props.viewState.storyShown = false;
        },
        type: "story",
        width: 300
      });
    }
  },
  componentDidMount() {
    this._wrapper.addEventListener("dragover", this.dragOverListener, false);
    showStoryPrompt(this.props.viewState, this.props.terria);

    // eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
    const { currentLanguage } = globalURLs;
    i18next.changeLanguage(currentLanguage);
    document.body.dir = i18next.dir();

    // eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
    const { mapBboxNull } = globalURLs;
    if (mapBboxNull === 1){
      this.props.viewState.notifications.push({
        title: "Error loading initialization source",
        message: "Map BBox is not valid.",
      });
    }
  },
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeListener, false);
    document.removeEventListener("dragover", this.dragOverListener, false);
  },
  acceptDragDropFile() {
    this.props.viewState.isDraggingDroppingFile = true;
    // if explorer window is already open, we open my data tab
    if (this.props.viewState.explorerPanelIsVisible) {
      this.props.viewState.openUserData();
    }
  },
  shouldUseMobileInterface() {
    return document.body.clientWidth < this.props.minimumLargeScreenWidth;
  },
  render() {
    const { t } = this.props;
    const customElements = processCustomElements(
      this.props.viewState.useSmallScreenInterface,
      this.props.children
    );
    const terria = this.props.terria;
    const allBaseMaps = this.props.allBaseMaps;
    const showStoryBuilder =
      this.props.viewState.storyBuilderShown &&
      !this.shouldUseMobileInterface();
    const showStoryPanel =
      this.props.terria.configParameters.storyEnabled &&
      this.props.terria.stories.length &&
      this.props.viewState.storyShown &&
      !this.props.viewState.explorerPanelIsVisible &&
      !this.props.viewState.storyBuilderShown;
    return (
      <div className={Styles.storyWrapper}>
        <InternetExplorerOverlay viewState={this.props.viewState} />
        <WelcomeMessage viewState={this.props.viewState} />
        <div
          className={classNames(Styles.uiRoot, {
            [Styles.withStoryBuilder]: showStoryBuilder
          })}
          ref={w => (this._wrapper = w)}
        >
          <div className={Styles.ui}>
            <div className={Styles.uiInner}>
              <If
                condition={
                  !this.props.viewState.hideMapUi() &&
                  !this.props.viewState.showToolPanel()
                }
              >
                <Small>
                  <MobileHeader
                    terria={terria}
                    menuItems={customElements.menu}
                    viewState={this.props.viewState}
                    version={this.props.version}
                    allBaseMaps={allBaseMaps}
                  />
                </Small>
                <Medium>
                  <div
                    className={classNames(
                      Styles.sidePanel,
                      this.props.viewState.topElement === "SidePanel"
                        ? "top-element"
                        : "",
                      {
                        [Styles.sidePanelHide]: this.props.viewState
                          .isMapFullScreen
                      }
                    )}
                    tabIndex={0}
                    onClick={() => {
                      this.props.viewState.topElement = "SidePanel";
                    }}
                  >
                    <Branding />
                    <SidePanel
                      terria={terria}
                      viewState={this.props.viewState}
                    />
                  </div>
                </Medium>
              </If>
              <If condition={this.props.viewState.showToolPanel()}>
                <ToolPanel viewState={this.props.viewState} />
              </If>
              <Medium>
                <div
                  className={classNames(Styles.showWorkbenchButton, {
                    [Styles.showWorkbenchButtonisVisible]: this.props.viewState
                      .isMapFullScreen,
                    [Styles.showWorkbenchButtonisNotVisible]: !this.props
                      .viewState.isMapFullScreen
                  })}
                >
                  <FullScreenButton
                    terria={this.props.terria}
                    viewState={this.props.viewState}
                    minified={false}
                    btnText={t("sui.showWorkbench")}
                    animationDuration={animationDuration}
                  />
                </div>
              </Medium>
              <section className={Styles.map}>
                <ProgressBar terria={terria} />
                <MapColumn
                  terria={terria}
                  viewState={this.props.viewState}
                  customFeedbacks={customElements.feedback}
                />
                <main>
                  <ExplorerWindow
                    terria={terria}
                    viewState={this.props.viewState}
                  />
                  <If
                    condition={
                      this.props.terria.configParameters.experimentalFeatures &&
                      !this.props.viewState.hideMapUi()
                    }
                  >
                    <ExperimentalFeatures
                      terria={terria}
                      viewState={this.props.viewState}
                      experimentalItems={customElements.experimentalMenu}
                    />
                  </If>
                </main>
              </section>
            </div>
          </div>
          <If condition={!this.props.viewState.hideMapUi()}>
            <div
              className={classNames({
                [Styles.explorerPanelIsVisible]: this.props.viewState
                  .explorerPanelIsVisible
              })}
            >
              <MenuBar
                terria={terria}
                viewState={this.props.viewState}
                allBaseMaps={allBaseMaps}
                menuItems={customElements.menu}
                animationDuration={animationDuration}
              />
              <MapNavigation
                terria={terria}
                viewState={this.props.viewState}
                navItems={customElements.nav}
              />
            </div>
          </If>
          <Notification viewState={this.props.viewState} />
          <SatelliteGuide terria={terria} viewState={this.props.viewState} />
          <MapInteractionWindow
            terria={terria}
            viewState={this.props.viewState}
          />
          <If
            condition={
              !customElements.feedback.length &&
              this.props.terria.configParameters.feedbackUrl &&
              !this.props.viewState.hideMapUi()
            }
          >
            <aside className={Styles.feedback}>
              <FeedbackForm viewState={this.props.viewState} />
            </aside>
          </If>
          <div
            className={classNames(
              Styles.featureInfo,
              this.props.viewState.topElement === "FeatureInfo"
                ? "top-element"
                : "",
              {
                [Styles.featureInfoFullScreen]: this.props.viewState
                  .isMapFullScreen
              }
            )}
            tabIndex={0}
            onClick={() => {
              this.props.viewState.topElement = "FeatureInfo";
            }}
          >
            <FeatureInfoPanel
              terria={terria}
              viewState={this.props.viewState}
            />
          </div>
          <DragDropFile
            terria={this.props.terria}
            viewState={this.props.viewState}
          />
          <DragDropNotification
            lastUploadedFiles={this.props.viewState.lastUploadedFiles}
            viewState={this.props.viewState}
            t={this.props.t}
          />
          {showStoryPanel && (
            <StoryPanel terria={terria} viewState={this.props.viewState} />
          )}
        </div>
        {this.props.terria.configParameters.storyEnabled && (
          <StoryBuilder
            isVisible={showStoryBuilder}
            terria={terria}
            viewState={this.props.viewState}
            animationDuration={animationDuration}
          />
        )}
      </div>
    );
  }
});
export const StandardUserInterfaceWithoutTranslation = StandardUserInterface;
export default withTranslation()(StandardUserInterface);
