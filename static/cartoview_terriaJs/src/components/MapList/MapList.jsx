import {
    AppBar,
    Box,
    IconButton,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CustomizedCircularProgress from '../CircularProgress/CustomCircularProgress'
import GridView from './MapView/GridView'
import ListView from './MapView/ListView'
import Navbar from '../Navbar/Navbar'
import PropTypes from 'prop-types'
import axios from 'axios'
import styles from './Styles'
import {withStyles} from '@material-ui/core/styles'

const MapList = ({classes, urls}) => {
    const [maps, setMaps] = useState([])
    const [loadingMaps, setLoadingMaps] = useState(true)
    const [mapsView, setMapsView] = useState('grid')
    const [sortMapsBy, setSortMapsBy] = useState('-date')
    const [snackOpen, setSnackOpen] = useState(false)

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

    const handleChange = event => {
        setSortMapsBy(event.target.value)
    }

    const handleChangeMapsView = (event, nextView) => {
        setMapsView(nextView)
    }

    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar className={classes.appBar} position="static">
                    <Navbar
                        sortMapsBy={sortMapsBy}
                        handleChange={handleChange}
                        mapsView={mapsView}
                        handleChangeMapsView={handleChangeMapsView}
                    />
                </AppBar>
                <main className={classes.content}>
                    {
                        loadingMaps ? (
                            <CustomizedCircularProgress />
                        ) : (
                            <Box>
                                {
                                    mapsView === 'grid' ?
                                        <GridView maps={maps} handleSnackOpen={handleSnackOpen} urls={urls}/>
                                        :
                                        <ListView maps={maps}/>
                                }
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
                            </Box>
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
