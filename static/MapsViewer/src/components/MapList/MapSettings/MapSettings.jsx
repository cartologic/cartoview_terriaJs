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
} from '@material-ui/core'
import React, {useRef, useState} from 'react'
import AddIcon from '@material-ui/icons/Add'
import FilterListIcon from '@material-ui/icons/FilterList'
import PropTypes from 'prop-types'
import SortIcon from '@material-ui/icons/Sort'
import StyledRadio from '../../StyledRadio/StyledRadio'
import styles from './Styles'
import { withStyles } from '@material-ui/core/styles'

const MapSettings = ({ classes, sortMapsBy, handleChange, filterMapsBy, handleFilterChange, currentUsername, newMapURL }) => {
    const [openSortMenu, setOpenSortMenu] = useState(false)
    const [openFilterMenu, setOpenFilterMenu] = useState(false)
    const anchorSortRef = useRef(null)
    const anchorFilterRef = useRef(null)

    const handleToggle = () => {
        setOpenSortMenu((prevOpenSortMenu) => !prevOpenSortMenu)
    }
    const handleFilterToggle = () => {
        setOpenFilterMenu((prevOpenSortMenu) => !prevOpenSortMenu)
    }
    const handleSortMenuClose = event => {
        if (anchorSortRef.current && anchorSortRef.current.contains(event.target)) {
            return
        }
        setOpenSortMenu(false)
    }
    const handleFilterMenuClose = event => {
        if (anchorFilterRef.current && anchorFilterRef.current.contains(event.target)) {
            return
        }
        setOpenFilterMenu(false)
    }

    return (
        <Box className={classes.settingWrapper}>
            <Chip
                icon={<AddIcon className={classes.sortIcon}/>}
                component="a"
                label="Create a new map"
                href={newMapURL}
                target="_blank"
                className={classes.newMapButton}
                clickable
            />
            <Chip
                icon={<FilterListIcon className={classes.sortIcon}/>}
                label="Filter"
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
                                        aria-label="filter by"
                                        name="filter by"
                                        value={filterMapsBy}
                                        onChange={handleFilterChange}
                                        className={classes.radioGroup}
                                    >
                                        <FormControlLabel
                                            value=""
                                            control={<StyledRadio/>}
                                            label="All maps"
                                            className={classes.formControlLabel}
                                        />
                                        <FormControlLabel
                                            disabled={!currentUsername}
                                            value={currentUsername}
                                            control={<StyledRadio/>}
                                            label="My maps"
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
                                        onChange={handleChange}
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
    )
}

MapSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    sortMapsBy: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    filterMapsBy: PropTypes.string.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    currentUsername: PropTypes.string.isRequired,
    newMapURL: PropTypes.string.isRequired
}

export default withStyles(styles)(MapSettings)