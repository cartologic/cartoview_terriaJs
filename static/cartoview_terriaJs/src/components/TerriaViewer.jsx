import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import MapList from './MapList/MapList'
import React from 'react'
import { cyan } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {...cyan}
    },
})

const TerriaViewer = () => {
    // globalURLs is defined in list template.
    // eslint-disable-next-line no-undef
    const urls = globalURLs
    return (
        <MuiThemeProvider theme={theme}>
            <MapList urls={urls}/>
        </MuiThemeProvider>
    )
}

export default TerriaViewer