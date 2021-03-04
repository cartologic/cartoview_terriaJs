import { DialogActions, DialogContent, DialogTitle } from "./DialogComponents"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Chip from '@material-ui/core/Chip'
import Dialog from "@material-ui/core/Dialog"
import Divider from "@material-ui/core/Divider"
import PropTypes from 'prop-types'
import React from "react"
import ShareIcon from "@material-ui/icons/Share"
import ShortTextIcon from "@material-ui/icons/ShortText"
import StarIcon from "@material-ui/icons/Star"
import TodayIcon from "@material-ui/icons/Today"
import Typography from "@material-ui/core/Typography"
import VisibilityIcon from "@material-ui/icons/Visibility"
import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
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
    },
    statisticsBoxWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    statisticsBox: {
        margin: 5
    },
    chip: {
        margin: theme.spacing(0.5),
        '&:hover': {
            backgroundColor: '#124e96'
        }
    },
})

const StyleChip = withStyles({
    root: {
        color:'#fff',
        backgroundColor: '#09274b'
    }
})(Chip)

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
                <Box className={classes.statisticsBoxWrapper}>
                    <img
                        alt="Map Thumbnail"
                        src={map.thumbnail_url || "/static/cartoview_terriaJs/img/no-img.png"}
                        title={map.title}
                    />
                    <div className={classes.statisticsBox}>
                        <StyleChip
                            className={classes.chip}
                            color="primary"
                            icon={<VisibilityIcon/>}
                            label={map.popular_count}
                            title="Views count"
                        />
                        <StyleChip
                            className={classes.chip}
                            color="primary"
                            icon={<ShareIcon/>}
                            label={map.share_count}
                            title="Share count"
                        />
                        <StyleChip
                            className={classes.chip}
                            color="primary"
                            icon={<StarIcon/>}
                            label={map.rating}
                            title="Rating count"
                        />
                    </div>
                </Box>
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
