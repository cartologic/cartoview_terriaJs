import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import GridIcon from 'material-ui-icons/GridOn'
import IconButton from 'material-ui/IconButton'
import LayerIcon from 'material-ui-icons/Layers'
import MapIcon from 'material-ui-icons/Map'
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'
const icons = {
    "maps": <MapIcon/>,
    "layers": <LayerIcon/>,
    "apps": <GridIcon/>
}
const drawerWidth = 240
const styles = theme => ( {
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
} )
class SideDrawer extends React.Component {
    renderListItem = ( key ) => {
        const { urls } = this.props
        return <ListItem onClick={()=> window.location.href=urls[key]} key={key} button>
        <ListItemIcon>
            {icons[key]}
        </ListItemIcon>
        <ListItemText primary={ key[0].toUpperCase() + key.substr(1)} />
      </ListItem>
    }
    render( ) {
        const { classes, open, handleDrawerClose, urls } = this.props
        return (
            <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={open}>
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
              <ListItem onClick={()=> window.location.href=urls.maps} button>
                <ListItemIcon>
                    <MapIcon/>
                </ListItemIcon>
              <ListItemText primary={"Maps"} />
              </ListItem>
              <ListItem onClick={()=> window.location.href=urls.Layers} button>
                <ListItemIcon>
                    <MapIcon/>
                </ListItemIcon>
              <ListItemText primary={"Layers"} />
              </ListItem>
              <ListItem onClick={()=> window.location.href=urls.apps} button>
                <ListItemIcon>
                    <GridIcon/>
                </ListItemIcon>
              <ListItemText primary={"Apps"} />
            </ListItem>
            
             </List>
             <Divider />
            </div>
          </Drawer>
        )
    }
}
SideDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles( styles )( SideDrawer )
