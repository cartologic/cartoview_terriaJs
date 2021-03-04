import { DialogActions, DialogContent, DialogTitle } from "./DialogComponents"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import Divider from "@material-ui/core/Divider"
import PropTypes from 'prop-types'
import React from "react"
import ShortTextIcon from "@material-ui/icons/ShortText"
import TodayIcon from "@material-ui/icons/Today"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

const styles = () => ({
    headline: {
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        marginRight: 5
    },
    divider: {
        width: '100%',
        margin: '10px 0'
    }
})

const DialogWrapper = ({classes, map, mapDetailsURL, openDialog, onDialogChange}) => {

    return (
        <Dialog
            open={openDialog}
            onClose={onDialogChange}
            aria-labelledby="customized-dialog-title"
            fullWidth
        >
            <DialogTitle
                id="customized-dialog-title"
                onToggle={onDialogChange}
            >
                Map details
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h5" gutterBottom>
                    {map.title}
                </Typography>

                <Typography variant="body1" className={classes.headline}>
                    <ShortTextIcon className={classes.icon}/>
                    Description:
                </Typography>
                <Typography gutterBottom variant="body1">
                    {map.abstract === "" ? "No Description" : map.abstract}
                </Typography>

                <Divider light className={classes.divider}/>

                <Typography variant="body1" className={classes.headline}>
                    <TodayIcon className={classes.icon}/>
                    Publication Date:
                </Typography>
                <Typography gutterBottom variant="body1">
                    {new Date(map.date).toDateString()}
                </Typography>

                <Divider light className={classes.divider}/>

                <Typography variant="body1" className={classes.headline}>
                    <AccountCircleIcon className={classes.icon}/>
                    Owner:
                </Typography>
                <Typography gutterBottom variant="body1">
                    {map.owner__username}
                </Typography>

                <Divider light className={classes.divider}/>
                
                <img
                    alt="Map Thumbnail"
                    src={map.thumbnail_url || "/static/cartoview_terriaJs/img/no-img.png"}
                    title={map.title}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => window.location.href = mapDetailsURL}
                    color="primary"
                    title={`Open more details for ${map.title} map`}
                >
                    More details
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DialogWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    mapDetailsURL: PropTypes.string.isRequired,
    openDialog: PropTypes.bool.isRequired,
    onDialogChange: PropTypes.func.isRequired
}

export default withStyles(styles)(DialogWrapper)
