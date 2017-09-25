import Card, { CardActions, CardContent, CardHeader, CardMedia } from 'material-ui/Card'

import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import OpenIcon from 'material-ui-icons/OpenInBrowser'
import PropTypes from 'prop-types'
import React from 'react'
import ShareIcon from 'material-ui-icons/Share';
import Typography from 'material-ui/Typography'
import classnames from 'classnames'
import copy from 'copy-to-clipboard'
import { cyan } from 'material-ui/colors'
import { withStyles } from 'material-ui/styles'

const styles = theme => ( {
    card: {
        width: '100%'
    },
    rootGrid: {
        flexGrow: 1
    },
    media: {
        height: 194,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create( 'transform', {
            duration: theme.transitions.duration.shortest,
        } ),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: cyan[ 500 ],
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    gridItem: {
        textAlign: 'center'
    }
} )
class MapCard extends React.Component {
    state = { expanded: false }
    handleExpandClick = ( ) => {
        this.setState( { expanded: !this.state.expanded } )
    }
    copyTo = ( id ) => {
        const { urls } = this.props
        copy( urls.getTerriaUrl( id ) )
    }
    render( ) {
        const { classes, urls } = this.props
        const { map, openSnack } = this.props
        return (
            <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {map.owner__username[0].toUpperCase()}
              </Avatar>
            }
            title={map.title}
            subheader={new Date(map.date).toDateString()}
          />
          <CardMedia
            className={classes.media}
            image={map.thumbnail_url||"/static/cartoview_terriaJs/img/no-img.png"}
            title="Contemplative Reptile"
          />
          <CardActions disableActionSpacing>
            <IconButton color="primary" onClick={()=>window.location.href=urls.getTerriaUrl(map.id)} aria-label="Open in browser">
              <OpenIcon />
            </IconButton>
            <IconButton color="accent" onClick={()=>{this.copyTo(map.id);openSnack()}} aria-label="Open in browser">
              <ShareIcon/>
            </IconButton>
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph type="body2">
                Description:
              </Typography>
              <Typography paragraph>
                {map.abstract===""? "No Description": map.abstract}
              </Typography>
              <Grid container direction={"row"} className={classes.rootGrid} spacing={16}>
                    <Grid item xs={12} sm={6} md={6} lg={6} className={classes.gridItem}>
                        <Button onClick={()=>window.location.href=urls.getTerriaUrl(map.id)} color="primary" className={classes.button}>
                            Open
                        </Button>
                    </Grid> 
                    <Grid item xs={12} sm={6} md={6} lg={6} className={classes.gridItem}>
                        <Button onClick={()=>window.location.href=urls.getMapDetailsUrl(map.id)} color="accent" className={classes.button}>
                            Details
                        </Button>
                    </Grid> 
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </div>
        )
    }
}
MapCard.propTypes = {
    classes: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    openSnack: PropTypes.func.isRequired
}
export default withStyles( styles )( MapCard )
