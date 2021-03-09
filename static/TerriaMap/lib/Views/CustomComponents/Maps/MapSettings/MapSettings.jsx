import {
    Box,
    Chip,
    ClickAwayListener,
    FormControl,
    FormControlLabel,
    Grow,
    Paper,
    Popper,
    RadioGroup
} from '@material-ui/core';
import React, {useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import SortIcon from '@material-ui/icons/Sort';
import {withStyles} from '@material-ui/core/styles';
import StyledRadio from './StyledRadio';
import styles from './Styles';

const MapSettings = ({ classes, sortMapsBy, handleSortByChange, filterMapsBy, handleFilterChange, currentUsername }) => {
    const [openSortMenu, setOpenSortMenu] = useState(false);
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const anchorSortRef = useRef(null);
    const anchorFilterRef = useRef(null);
    const { t } = useTranslation();

    const handleToggle = () => {
        setOpenSortMenu((prevOpenSortMenu) => !prevOpenSortMenu);
    };
    const handleSortMenuClose = event => {
        if (anchorSortRef.current && anchorSortRef.current.contains(event.target)) {
            return;
        }
        setOpenSortMenu(false);
    };
    const handleFilterToggle = () => {
        setOpenFilterMenu((prevOpenSortMenu) => !prevOpenSortMenu);
    };
    const handleFilterMenuClose = event => {
        if (anchorFilterRef.current && anchorFilterRef.current.contains(event.target)) {
            return;
        }
        setOpenFilterMenu(false);
    };

    return (
        <Box className={classes.settingWrapper}>
            <Chip
                icon={<FilterListIcon className={classes.sortIcon}/>}
                label={t("mapPanel.settings.filter")}
                className={classes.filterButton}
                onClick={handleFilterToggle}
                ref={anchorFilterRef}
            />
            <Popper
                open={openFilterMenu}
                anchorEl={anchorFilterRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleFilterMenuClose}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="order by"
                                        name="order by"
                                        value={filterMapsBy}
                                        onChange={handleFilterChange}
                                        className={classes.radioGroup}
                                    >
                                        <FormControlLabel
                                            value=""
                                            control={<StyledRadio/>}
                                            label={t("mapPanel.settings.allMaps")}
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            value={currentUsername}
                                            control={<StyledRadio/>}
                                            label={t("mapPanel.settings.myMaps")}
                                            className={classes.formControlLabel}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <Chip
                icon={<SortIcon className={classes.sortIcon}/>}
                label={t("mapPanel.settings.sort")}
                className={classes.sortButton}
                onClick={handleToggle}
                ref={anchorSortRef}
            />
            <Popper
                open={openSortMenu}
                anchorEl={anchorSortRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleSortMenuClose}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="order by"
                                        name="order by"
                                        value={sortMapsBy}
                                        onChange={handleSortByChange}
                                        className={classes.radioGroup}
                                    >
                                        <FormControlLabel
                                            value="-date"
                                            control={<StyledRadio/>}
                                            label={t("mapPanel.settings.mostRecent")}
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            value="date"
                                            control={<StyledRadio/>}
                                            label={t("mapPanel.settings.lessRecent")}
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            value="title"
                                            control={<StyledRadio/>}
                                            label={t("mapPanel.settings.aZ")}
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            value="-title"
                                            control={<StyledRadio/>}
                                            label={t("mapPanel.settings.zA")}
                                            className={classes.formControlLabel}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
};

MapSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    sortMapsBy: PropTypes.string.isRequired,
    handleSortByChange: PropTypes.func.isRequired,
    filterMapsBy: PropTypes.string.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    currentUsername: PropTypes.string.isRequired,
};

export default withStyles(styles)(MapSettings);