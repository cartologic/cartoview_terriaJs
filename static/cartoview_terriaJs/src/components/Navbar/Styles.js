const styles = () => ({
    media: {
        height: 40,
        margin: "0px 20px",
        ['@media (max-width: 768px)']: {
            margin: '0px 14px',
        }
    },
    title: {
        flexGrow: 1
    },
    sortIcon: {
        color: '#fff'
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
    radioGroup: {
        margin: 10
    },
    formControlLabel: {
        marginLeft: 0,
        marginRight: 6,
    },
})

export default styles
