import {Card, CardHeader, CardMedia} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import DescriptionIcon from '@material-ui/icons/Description'
import DialogWrapper from '../Dialog/DialogWrapper'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import LaunchIcon from '@material-ui/icons/Launch'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import PropTypes from 'prop-types'
import React from 'react'
import ShareIcon from '@material-ui/icons/Share'
import Typography from '@material-ui/core/Typography'
import copy from 'copy-to-clipboard'
import {cyan} from '@material-ui/core/colors'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
    card: {
        width: '100%',
        minHeight: 290,
        height: 300,
        boxShadow: 'none',
        border: '1px solid #DFE1E5',
        '&:hover': {
            border: '1px solid #3BBDD4',
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 19px -7px #3BBDD4'
        }
    },
    media: {
        height: 194,
        cursor: 'pointer'
    },
    avatar: {
        backgroundColor: cyan[500],
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
    mapDescribtion: {
        padding: 10
    }
})

class MapCard extends React.Component {
    constructor(props) {
        super(props)
        this.anchorRef = React.createRef()
    }
    
    state = {
        open: false,
        anchorEl: null,
        openDialog: false
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleClose = (event) => {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return
        }
        this.setState({
            open: false
        })
    }
    copyTo = (id) => {
        const {urls} = this.props
        copy(urls.getTerriaUrl(id))
    }
    handleDialogToggle = () => {
        this.setState({
            openDialog: !this.state.openDialog
        })
    }

    render() {
        const {classes, urls} = this.props
        const {map, openSnack} = this.props

        return (
            <Card
                className={classes.card}
                title={`Open ${map.title} map`}
            >
                <CardMedia
                    className={classes.media}
                    image={map.thumbnail_url || "/static/cartoview_terriaJs/img/no-img.png"}
                    onClick={() => window.location.href = urls.getTerriaUrl(map.id)}
                />
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {map.owner__username[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <div>
                            <IconButton
                                ref={this.anchorRef}
                                aria-label="settings"
                                aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                                onClick={this.handleToggle}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Popper open={this.state.open} anchorEl={this.anchorRef.current} placement='bottom' transition>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList autoFocusItem={this.state.open} id="menu-list-grow">
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
                                                            onClick={() => {this.copyTo(map.id); openSnack()}}
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
                                                            onClick={this.handleDialogToggle}
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
                                                                openDialog={this.state.openDialog}
                                                                onDialogChange={this.handleDialogToggle}
                                                            />
                                                        </IconButton>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    }
                    title={map.title}
                    subheader={new Date(map.date).toDateString()}
                />
            </Card>
        )
    }
}

MapCard.propTypes = {
    classes: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    openSnack: PropTypes.func.isRequired
}

export default withStyles(styles)(MapCard)
