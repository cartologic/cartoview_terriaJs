import 'typeface-roboto'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import PersistentDrawer from './MapList'
import React from 'react'
import { cyan } from 'material-ui/colors';
import { render } from 'react-dom'

const theme = createMuiTheme( {
    palette: {
        type: 'light',
        primary:{...cyan}
    },
} );
class CartoviewTerriaViewer {
    constructor( domId,urls ) {
        this.domId = domId
        this.urls=urls
    }
    set config( config ) {
        this.appConfig = config
    }
    view( ) {
        render(
            <MuiThemeProvider theme={theme}>
      <PersistentDrawer urls={this.urls} />
      </MuiThemeProvider>,
            document.getElementById( this.domId ) )
    }
}
global.CartoviewTerriaViewer = CartoviewTerriaViewer
