const DialogWrapperStyles = (theme) => ({
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

export default DialogWrapperStyles
