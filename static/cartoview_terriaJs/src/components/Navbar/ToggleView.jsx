import GridOnIcon from '@material-ui/icons/GridOn'
import PropTypes from 'prop-types'
import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ViewListIcon from '@material-ui/icons/ViewList'

const ToggleView = ({ mapsView, handleChangeMapsView}) => {
    return(
        <ToggleButtonGroup value={mapsView} exclusive onChange={handleChangeMapsView}>
            <ToggleButton value="grid" aria-label="grid">
                <GridOnIcon/>
            </ToggleButton>
            <ToggleButton value="list" aria-label="list">
                <ViewListIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

ToggleView.propTypes = {
    mapsView: PropTypes.string.isRequired,
    handleChangeMapsView: PropTypes.func.isRequired
}

export default ToggleView
