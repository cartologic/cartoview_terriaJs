const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    close: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    rootGrid: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    title: {
        flexGrow: 1
    },
    sortButton: {
        margin: '0px 80px',
        padding: 5,
        backgroundColor: '#09274b',
        fontSize: 15,
        color: '#fff',
        '&:hover, &:focus': {
            backgroundColor: '#124e96'
        },
        ['@media (max-width: 768px)']: {
            margin: '0px 14px',
        }
    },
    sortIcon: {
        color: '#fff'
    },
    radioGroup: {
        margin: 10
    },
    formControlLabel: {
        marginLeft: 0,
        marginRight: 6,
    },
    cardGrid: {
        ['@media (max-width: 1024px)']: {
            minWidth: '33.333333%'
        }
    },
    snackBarBg: {
        backgroundColor: '#09274b'
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 80px)',
        marginTop: 80,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    media: {
        height: 40,
        margin: "0px 20px",
        ['@media (max-width: 768px)']: {
            margin: '0px 14px',
        }
    },
})

export default styles
