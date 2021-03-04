import {
    AppBar,
    Grid,
    IconButton,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CustomizedCircularProgress from '../CircularProgress/CustomCircularProgress'
import MapCard from '../MapCard/MapCard'
import Navbar from '../Navbar/Navbar'
import PropTypes from 'prop-types'
import axios from 'axios'
import styles from './Styles'
import {withStyles} from '@material-ui/core/styles'

const MapList = ({classes, urls}) => {
    const [maps, setMaps] = useState([])
    const [loadingMaps, setLoadingMaps] = useState(true)
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

    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar className={classes.appBar} position="static">
                    <Navbar sortMapsBy={sortMapsBy} handleChange={handleChange}/>
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
