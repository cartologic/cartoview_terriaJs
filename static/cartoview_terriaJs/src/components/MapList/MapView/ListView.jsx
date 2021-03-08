import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core'
import ListItem from './ListItem/ListItem'
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
    table: {
        minWidth: 650,
    },
    mapRow: {
        '&:hover': {
            backgroundColor: '#3BBDD4',
        },
    }
})

const ListView = ({ classes, maps, urls, openSnack }) => {
    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Map</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Publication Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        maps.map(mapEl => (
                            <TableRow key={mapEl.id} className={classes.mapRow}>
                                <ListItem openSnack={openSnack} urls={urls} map={mapEl}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

ListView.propTypes = {
    classes: PropTypes.object.isRequired,
    maps: PropTypes.array.isRequired,
    urls: PropTypes.object.isRequired,
    openSnack: PropTypes.func.isRequired
}

export default withStyles(styles)(ListView)
