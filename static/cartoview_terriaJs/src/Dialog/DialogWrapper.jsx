import { DialogActions, DialogContent, DialogTitle } from "./DialogComponents"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import PropTypes from 'prop-types'
import React  from "react"
import Typography from "@material-ui/core/Typography"


const DialogWrapper = ({ map, mapDetailsURL, openDialog, onDialogChange }) => {
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
                <Typography variant="h6">
                    {map.title}
                </Typography>
                <Typography gutterBottom variant="body1">
                    Description: {map.abstract === "" ? "No" +
                    " Description" : map.abstract}
                </Typography>
                <Typography gutterBottom variant="body1">
                    Publication Date: {new Date(map.date).toDateString()}
                </Typography>
                <Typography gutterBottom variant="body1">
                    Owner: {map.owner__username}
                </Typography>
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
    map: PropTypes.object.isRequired,
    mapDetailsURL: PropTypes.string.isRequired,
    openDialog: PropTypes.bool.isRequired,
    onDialogChange: PropTypes.func.isRequired
}

export default DialogWrapper
