import { Hidden, Link, Toolbar, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import ToggleView from './ToggleView'
import styles from './Styles'
import terriaLogo from '../../../img/terria-logo.png'
import { withStyles } from '@material-ui/core/styles'

const Navbar = ({ classes, mapsView, handleChangeMapsView }) => {
    const preventDefault = (event) => event.preventDefault()

    return (
        <Toolbar disableGutters>
            <Link href="/" onClick={preventDefault} className={classes.navLink} title="Home">
                <img src={terriaLogo} alt="Terria Maps list" className={classes.media}/>
            </Link>
            <Typography variant="h5" type="title" color="inherit" noWrap className={classes.title}>
                Terria Map
            </Typography>
            <Hidden smDown>
                <ToggleView handleChangeMapsView={handleChangeMapsView} mapsView={mapsView} className={classes.toggle}/>
            </Hidden>
        </Toolbar>
    )
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    mapsView: PropTypes.string.isRequired,
    handleChangeMapsView: PropTypes.func.isRequired
}

export default withStyles(styles)(Navbar)