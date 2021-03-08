import {
    Avatar,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    TableCell
} from '@material-ui/core'
import React, { Fragment, useRef, useState } from 'react'
import DescriptionIcon from '@material-ui/icons/Description'
import DialogWrapper from '../../../Dialog/DialogWrapper'
import IconButton from '@material-ui/core/IconButton'
import LaunchIcon from '@material-ui/icons/Launch'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import ShareIcon from '@material-ui/icons/Share'
import Typography from '@material-ui/core/Typography'
import copy from 'copy-to-clipboard'
import { cyan } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
    mapTitle: {
        cursor: 'pointer'
    },
    avatar: {
        backgroundColor: cyan[500],
        float: 'right'
    },
    menuItemButton: {
        color: '#3BBDD4',
        padding: '1px 10px',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    menuItemIcon: {
        marginLeft: -16
    },
    menuItemText: {
        marginLeft: 16
    },
})

const ListItem = ({ classes, urls, map, openSnack }) => {
    const anchorRef = useRef()
    const [openMapMenu, setOpenMapMenu] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const handleToggle = () => {
        setOpenMapMenu(!openMapMenu)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpenMapMenu(false)
    }

    const copyTo = (id) => {
        copy(urls.getTerriaUrl(id))
    }

    const handleDialogToggle = () => {
        setOpenDialog(!openDialog)
    }
    
    return (
        <Fragment>
            <TableCell 
                component="th" 
                scope="row"
                title={`Open ${map.title} map`}
                onClick={() => window.location.href = urls.getTerriaUrl(map.id)}
                className={classes.mapTitle}
            >
                {map.title}
            </TableCell>
            <TableCell align="right">
                <Avatar
                    aria-label="Recipe"
                    className={classes.avatar}
                    title={map.owner__username}>
                    {map.owner__username[0].toUpperCase()}
                </Avatar>
            </TableCell>
            <TableCell align="right">
                {new Date(map.date).toDateString()}
            </TableCell>
            <TableCell align="right">
                <IconButton
                    ref={anchorRef}
                    aria-label="list"
                    aria-controls={openMapMenu ? 'menu-list-grow' : undefined}
                    onClick={handleToggle}
                >
                    <MoreVertIcon />
                </IconButton>
                <Popper
                    open={openMapMenu}
                    anchorEl={anchorRef.current}
                    placement='bottom'
                    transition
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={openMapMenu} id="menu-list-grow">
                                        <MenuItem>
                                            <IconButton
                                                className={classes.menuItemButton}
                                                onClick={() => window.open(urls.getTerriaUrl(map.id), '_blank')}
                                                aria-label="Open in browser"
                                            >
                                                <LaunchIcon className={classes.menuItemIcon}/>
                                                <Typography
                                                    variant="subtitle2"
                                                    className={classes.menuItemText}
                                                >
                                                    Open Terria Map
                                                </Typography>
                                            </IconButton>
                                        </MenuItem>
                                        <MenuItem>
                                            <IconButton
                                                className={classes.menuItemButton}
                                                onClick={() => {copyTo(map.id); openSnack()}}
                                                aria-label="Share app URL"
                                            >
                                                <ShareIcon className={classes.menuItemIcon}/>
                                                <Typography
                                                    variant="subtitle2"
                                                    className={classes.menuItemText}
                                                >
                                                    Share app URL
                                                </Typography>
                                            </IconButton>
                                        </MenuItem>
                                        <MenuItem>
                                            <IconButton
                                                className={classes.menuItemButton}
                                                onClick={handleDialogToggle}
                                                aria-label="Map description"
                                            >
                                                <DescriptionIcon className={classes.menuItemIcon}/>
                                                <Typography
                                                    variant="subtitle2"
                                                    className={classes.menuItemText}
                                                    aria-haspopup="true"
                                                >
                                                    Show map details
                                                </Typography>
                                                <DialogWrapper
                                                    map={map}
                                                    mapDetailsURL={urls.getMapDetailsUrl(map.id)}
                                                    openDialog={openDialog}
                                                    onDialogChange={handleDialogToggle}
                                                />
                                            </IconButton>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </TableCell>
        </Fragment>
    )
}

ListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    openSnack: PropTypes.func.isRequired
}

export default withStyles(styles)(ListItem)