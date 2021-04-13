import {cyan} from '@material-ui/core/colors'

const styles = () => ({
    card: {
        width: '100%',
        minHeight: 290,
        height: 300,
        boxShadow: 'none',
        border: '1px solid #DFE1E5',
        '&:hover': {
            border: '1px solid #3BBDD4',
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 19px -7px #3BBDD4'
        }
    },
    media: {
        height: 194,
        cursor: 'pointer'
    },
    avatar: {
        backgroundColor: cyan[500],
    },
    menuItemButton: {
        color: '#3BBDD4',
        padding: '1px 10px',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    menuItemIcon: {
        marginLeft: -16
    },
    menuItemText: {
        marginLeft: 16
    },
    mapDescribtion: {
        padding: 10
    }
})

export default styles
