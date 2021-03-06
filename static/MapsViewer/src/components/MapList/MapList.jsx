import {
    AppBar,
    Box,
    IconButton,
    Snackbar,
    SnackbarContent,
    Typography
} from '@material-ui/core'
import React, {Fragment, useEffect, useState} from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CustomizedCircularProgress from '../CircularProgress/CustomCircularProgress'
import GridView from './MapView/GridView'
import ListView from './MapView/ListView'
import MapSettings from './MapSettings/MapSettings'
import Navbar from '../Navbar/Navbar'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import axios from 'axios'
import styles from './Styles'
import {withStyles} from '@material-ui/core/styles'

const MAPS_LIMIT = 8

const MapList = ({classes, urls}) => {
    const [maps, setMaps] = useState([])
    const [loadingMaps, setLoadingMaps] = useState(true)
    const [mapsOffset, setMapsOffset] = useState(0)
    const [totalMapsCount, setTotalMapsCount] = useState(0)
    const [mapsView, setMapsView] = useState('grid')
    const [sortMapsBy, setSortMapsBy] = useState('-date')
    const [filterMapsBy, setFilterMapsBy] = useState('')
    const [snackOpen, setSnackOpen] = useState(false)

    const paginate = (e, selectedPageNumber) => setMapsOffset(Math.ceil((selectedPageNumber - 1) * MAPS_LIMIT))

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
        let params = {
            order_by: sortMapsBy,
            limit: MAPS_LIMIT,
            offset: mapsOffset
        }
        if ( filterMapsBy !== '' ){
            params.owner__username__in = filterMapsBy
        }
        else {
            if ("owner__username__in" in params){
                delete params.owner__username__in
            }
        }
        axios(urls.mapsApiUrl, { params })
            .then(response => {
                setMaps(response.data.objects)
                setTotalMapsCount(response.data.meta["total_count"])
                setLoadingMaps(false)
            })
    }

    useEffect(() => {
        getMaps()
    }, [sortMapsBy, filterMapsBy, mapsOffset])

    const handleChange = event => {
        setSortMapsBy(event.target.value)
    }

    const handleFilterChange = event => setFilterMapsBy(event.target.value)

    const handleChangeMapsView = (event, nextView) => {
        setMapsView(nextView)
    }

    const pagesCount = Math.ceil(totalMapsCount/MAPS_LIMIT)

    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar className={classes.appBar} position="static">
                    <Navbar
                        mapsView={mapsView}
                        handleChangeMapsView={handleChangeMapsView}
                    />
                </AppBar>
                <main className={classes.content}>
                    <MapSettings
                        sortMapsBy={sortMapsBy}
                        handleChange={handleChange}
                        filterMapsBy={filterMapsBy}
                        handleFilterChange={handleFilterChange}
                        currentUsername={urls.currentUsername}
                        newMapURL={urls.newMap}
                    />
                    {
                        loadingMaps ? (
                            <CustomizedCircularProgress />
                        ):(
                            <Box>
                                {
                                    maps.length !== 0 ? (
                                        <Fragment>
                                            {
                                                mapsView === 'grid' ?
                                                    <GridView maps={maps} handleSnackOpen={handleSnackOpen} urls={urls}/>
                                                    :
                                                    <ListView maps={maps} urls={urls} openSnack={handleSnackOpen}/>
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
                                        </Fragment>
                                    ):(
                                        <Typography variant="h3" gutterBottom className={classes.noMaps}>
                                            There are no available maps
                                        </Typography>
                                    )
                                }
                            </Box>
                        )
                    }
                    {
                        pagesCount > 1 &&
                        <Pagination
                            variant="outlined"
                            shape="rounded"
                            className={classes.pagination}
                            count={pagesCount}
                            onChange={paginate}
                        />
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
