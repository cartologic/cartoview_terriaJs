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
})

export default styles
