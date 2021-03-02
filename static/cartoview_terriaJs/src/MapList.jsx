import React, { useEffect, useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import MapCard from './MapCard'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import terriaLogo from '../img/terria-logo.png'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    close: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    rootGrid: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    cardGrid: {
        ['@media (max-width: 1024px)']: {
            minWidth: '33.333333%'
        }
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 80px)',
        marginTop: 80,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    media: {
        height: 40,
        margin: "0px 20px"
    },
})

const MapList = ({ classes, urls }) => {
    const [maps, setMaps] = useState([])
    const [snackOpen, setSnackOpen] = useState(false)

    const getMaps = () => {
        fetch(urls.mapsApiUrl)
            .then(response => response.json())
            .then(data => setMaps(data.objects))
    }

    useEffect(() => {
        getMaps()
    }, [])

    const handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackOpen(false)
    }

    const handleSnackOpen = () => setSnackOpen(true)

    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar className={classes.appBar}>
                    <Toolbar disableGutters={true}>
                        <img src={terriaLogo} alt="Terria Maps list" className={classes.media}/>
                        <Typography variant="h5" type="title" color="inherit" noWrap>
                                Terria Map
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <Grid container direction={"row"} className={classes.rootGrid} spacing={4}>
                        {maps.map((obj, i) => {
                            return (
                                <Grid key={i} item xs={12} sm={6} md={3} lg={3} className={classes.cardGrid}>
                                    <MapCard openSnack={handleSnackOpen} urls={urls} map={obj}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        open={snackOpen}
                        onClose={handleRequestClose}
                        autoHideDuration={3000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">URL Copied to Clipboard</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={handleRequestClose}
                            >
                                <CloseIcon/>
                            </IconButton>,
                        ]}
                    />
                </main>
            </div>
        </div>
    )
}

MapList.propTypes = {
    classes: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired
}

export default withStyles(styles)(MapList)
