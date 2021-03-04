import {
    Avatar,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { cyan } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
    table: {
        minWidth: 650,
    },
    avatar: {
        backgroundColor: cyan[500],
        float: 'right'
    }
})

const ListView = ({ classes, maps }) => {
    return (
        <TableContainer component={Paper}>
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
                            <TableRow key={mapEl.id}>
                                <TableCell component="th" scope="row">
                                    {mapEl.title}
                                </TableCell>
                                <TableCell align="right">
                                    <Avatar
                                        aria-label="Recipe"
                                        className={classes.avatar}
                                        title={mapEl.owner__username}>
                                        {mapEl.owner__username[0].toUpperCase()}
                                    </Avatar>
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(mapEl.date).toDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

ListView.propTypes = {
    classes: PropTypes.object.isRequired,
    maps: PropTypes.array.isRequired
}

export default withStyles(styles)(ListView)
