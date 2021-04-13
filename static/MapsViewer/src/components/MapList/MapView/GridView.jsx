import { Grid } from '@material-ui/core'
import MapCard from '../../MapCard/MapCard'
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
    rootGrid: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    cardGrid: {
        ['@media (max-width: 1024px)']: {
            minWidth: '33.333333%'
        }
    }
})

const GridView = ({ classes, maps, urls, handleSnackOpen }) => {
    return (
        <Grid container direction={"row"} className={classes.rootGrid} spacing={4}>
            {maps.map((obj, i) => {
                return (
                    <Grid key={i} item xs={12} sm={6} md={3} lg={3} className={classes.cardGrid}>
                        <MapCard openSnack={handleSnackOpen} urls={urls} map={obj}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

GridView.propTypes = {
    classes: PropTypes.object.isRequired,
    maps: PropTypes.array.isRequired,
    urls: PropTypes.object.isRequired,
    handleSnackOpen: PropTypes.func.isRequired
}

export default withStyles(styles)(GridView)
