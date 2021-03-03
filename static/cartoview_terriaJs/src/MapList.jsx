import {
    AppBar,
    Chip,
    ClickAwayListener,
    FormControl,
    FormControlLabel,
    Grid,
    Grow,
    IconButton,
    Paper,
    Popper,
    RadioGroup,
    Snackbar,
    SnackbarContent,
    Toolbar,
    Typography
} from '@material-ui/core'
import React, {useEffect, useRef, useState} from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CustomizedCircularProgress from './CircularProgress/CustomCircularProgress'
import MapCard from './MapCard'
import PropTypes from 'prop-types'
import SortIcon from '@material-ui/icons/Sort'
import StyledRadio from './StyledRadio'
import axios from 'axios'
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
    title: {
        flexGrow: 1
    },
    sortButton: {
        margin: '0px 80px',
        padding: 5,
        backgroundColor: '#09274b',
        fontSize: 15,
        color: '#fff',
        '&:hover, &:focus': {
            backgroundColor: '#124e96'
        },
        ['@media (max-width: 768px)']: {
            margin: '0px 14px',
        }
    },
    sortIcon: {
        color: '#fff'
    },
    radioGroup: {
        margin: 10
    },
    formControlLabel: {
        marginLeft: 0,
        marginRight: 6,
    },
    cardGrid: {
        ['@media (max-width: 1024px)']: {
            minWidth: '33.333333%'
        }
    },
    snackBarBg: {
        backgroundColor: '#09274b'
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
    content: {
        width: '100%',
        flexGrow: 1,
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
        margin: "0px 20px",
        ['@media (max-width: 768px)']: {
            margin: '0px 14px',
        }
    },
})

const MapList = ({classes, urls}) => {
    const [openSortMenu, setOpenSortMenu] = useState(false)
    const [maps, setMaps] = useState([])
    const [loadingMaps, setLoadingMaps] = useState(true)
    const [sortMapsBy, setSortMapsBy] = useState('-date')
    const [snackOpen, setSnackOpen] = useState(false)
    const anchorSortRef = useRef(null)

    const handleSnackOpen = () => setSnackOpen(true)

    const handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackOpen(false)
    }

    const getMaps = () => {
        if (!loadingMaps){
            setLoadingMaps(true)
        }
        axios(urls.mapsApiUrl, {
            params: {
                order_by: sortMapsBy,
            },
        })
            .then(response => {
                setMaps(response.data.objects)
                setLoadingMaps(false)
            })
    }

    useEffect(() => {
        getMaps()
    }, [sortMapsBy])

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

    const handleChange = event => {
        setSortMapsBy(event.target.value)
    }

    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar disableGutters={true}>
                        <img src={terriaLogo} alt="Terria Maps list" className={classes.media}/>
                        <Typography variant="h5" type="title" color="inherit" noWrap className={classes.title}>
                            Terria Map
                        </Typography>
                        <Chip
                            icon={<SortIcon className={classes.sortIcon}/>}
                            label="Sort By"
                            className={classes.sortButton}
                            onClick={handleToggle}
                            ref={anchorSortRef}
                        />
                        <Popper open={openSortMenu} anchorEl={anchorSortRef.current} role={undefined} transition
                            disablePortal>
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
                </AppBar>
                <main className={classes.content}>
                    {
                        loadingMaps ? (
                            <CustomizedCircularProgress />
                        ) : (
                            <div>
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
                                >
                                    <SnackbarContent
                                        className={classes.snackBarBg}
                                        aria-describedby="message-id"
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
                                </Snackbar>
                            </div>
                        )
                    }
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
