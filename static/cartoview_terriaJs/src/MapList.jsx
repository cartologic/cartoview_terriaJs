import AppBar from 'material-ui/AppBar'
import CloseIcon from 'material-ui-icons/Close';
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import MapCard from './MapCard'
import MenuIcon from 'material-ui-icons/Menu'
import PropTypes from 'prop-types'
import React from 'react'
import SideDrawer from './SideDrawer'
import Snackbar from 'material-ui/Snackbar';
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
const drawerWidth = 240
const styles = theme => ( {
    root: {
        width: '100%',
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    rootGrid: {
        flexGrow: 1
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create( [ 'margin', 'width' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        } ),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create( [ 'margin', 'width' ], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        } ),
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
        marginLeft: `-${drawerWidth+1}px`,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create( 'margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        } ),
        height: 'calc(100% - 56px)',
        marginTop: 56,
    [ theme.breakpoints.up( 'sm' ) ]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    contentShift: {
        marginLeft: 0,
        transition: theme.transitions.create( 'margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        } ),
    },
} )
class PersistentDrawer extends React.Component {
    state = {
        open: false,
        maps: [ ],
        snackOpen: false
    };
    componentWillMount = ( ) => {
        this.getMaps( )
    }
    getMaps = ( ) => {
        const { urls } = this.props
        fetch( urls.mapsApiUrl ).then( ( response ) => response.json( ) )
            .then(
                ( data ) => {
                    this.setState( { maps: data.objects } )
                } )
    }
    handleDrawerOpen = ( ) => {
        this.setState( { open: true } )
    }
    handleRequestClose = ( event, reason ) => {
        if ( reason === 'clickaway' ) {
            return
        }
        this.setState( { snackOpen: false } )
    }
    handleSnackOpen = ( ) => {
        this.setState( { snackOpen: true } )
    }
    handleDrawerClose = ( ) => {
        this.setState( { open: false } )
    }
    render( ) {
        const { classes, urls } = this.props
        return (
            <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Cartoview Terria Map
              </Typography>
            </Toolbar>
          </AppBar>
          <SideDrawer urls={urls} open={this.state.open} handleDrawerClose={this.handleDrawerClose} />
          <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
                <Grid container direction={"row"} className={classes.rootGrid} spacing={16}>
                        {this.state.maps.map((obj,i)=>{
                            return(
                                <Grid key={i} item xs={12} sm={6} md={3} lg={3}>
                                    <MapCard openSnack={this.handleSnackOpen} urls={urls} map={obj} />
                                </Grid> 
                            )
                        })}
                </Grid>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
                    open={this.state.snackOpen}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">URL Copied to Clipboard</span>}
                    action={[
                            <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                            >
                            <CloseIcon />
                            </IconButton>,
                        ]}
                    />
          </main>
        </div>
      </div>
        )
    }
}
PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired
}
export default withStyles( styles )( PersistentDrawer )
