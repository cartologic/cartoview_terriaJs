const styles = () => ({
    settingWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 10,
        ['@media (max-width: 768px)']: {
            justifyContent: 'center'
        }
    },
    sortIcon: {
        color: '#fff'
    },
    sortButton: {
        marginRight: '20px',
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
    filterButton: {
        margin: '0px 10px 0px 40px',
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
