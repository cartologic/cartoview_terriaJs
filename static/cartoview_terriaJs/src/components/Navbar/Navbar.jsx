import {
    Chip,
    ClickAwayListener,
    FormControl,
    FormControlLabel,
    Grow,
    Hidden,
    Paper,
    Popper,
    RadioGroup,
    Toolbar,
    Typography
} from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SortIcon from '@material-ui/icons/Sort'
import StyledRadio from '../StyledRadio/StyledRadio'
import ToggleView from './ToggleView'
import styles from './Styles'
import terriaLogo from '../../../img/terria-logo.png'
import { withStyles } from '@material-ui/core/styles'


const Navbar = ({ classes, sortMapsBy, handleChange, mapsView, handleChangeMapsView }) => {
    const [openSortMenu, setOpenSortMenu] = useState(false)
    const anchorSortRef = useRef(null)

    const handleToggle = () => {
        setOpenSortMenu((prevOpenSortMenu) => !prevOpenSortMenu)
    }
    const handleSortMenuClose = event => {
        if (anchorSortRef.current && anchorSortRef.current.contains(event.target)) {
            return
        }
        setOpenSortMenu(false)
    }

    const prevOpenSortMenu = useRef(openSortMenu)
    useEffect(() => {
        if (prevOpenSortMenu.current === true && openSortMenu === false) {
            anchorSortRef.current.focus()
        }
        prevOpenSortMenu.current = openSortMenu
    }, [openSortMenu])

    return (
        <Toolbar disableGutters>
            <img src={terriaLogo} alt="Terria Maps list" className={classes.media}/>
            <Typography variant="h5" type="title" color="inherit" noWrap className={classes.title}>
                Terria Map
            </Typography>
            <Hidden smDown>
                <ToggleView handleChangeMapsView={handleChangeMapsView} mapsView={mapsView}/>
            </Hidden>
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
        </Toolbar>
    )
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    sortMapsBy: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    mapsView: PropTypes.string.isRequired,
    handleChangeMapsView: PropTypes.func.isRequired
}

export default withStyles(styles)(Navbar)