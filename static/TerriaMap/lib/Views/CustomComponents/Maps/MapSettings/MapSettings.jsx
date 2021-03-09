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
import PropTypes from 'prop-types';
import SortIcon from '@material-ui/icons/Sort';
import {withStyles} from '@material-ui/core/styles';
import StyledRadio from './StyledRadio';
import styles from './Styles';

const MapSettings = ({ classes, sortMapsBy, handleSortByChange }) => {
    const [openSortMenu, setOpenSortMenu] = useState(false);
    const anchorSortRef = useRef(null);

    const handleToggle = () => {
        setOpenSortMenu((prevOpenSortMenu) => !prevOpenSortMenu);
    };
    const handleSortMenuClose = event => {
        if (anchorSortRef.current && anchorSortRef.current.contains(event.target)) {
            return;
        }
        setOpenSortMenu(false);
    };

    return (
        <Box className={classes.settingWrapper}>
            <Chip
                icon={<SortIcon className={classes.sortIcon}/>}
                label="Sort By"
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
                                            label="Most recent"
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            value="date"
                                            control={<StyledRadio/>}
                                            label="Less recent"
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            value="title"
                                            control={<StyledRadio/>}
                                            label="A - Z"
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            value="-title"
                                            control={<StyledRadio/>}
                                            label="Z - A"
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
};

export default withStyles(styles)(MapSettings);