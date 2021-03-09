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
        color: '#3f4854'
    },
    sortButton: {
        marginRight: '20px',
        padding: 5,
        backgroundColor: '#f5f8fa',
        borderRadius: 4,
        fontSize: 15,
        fontWeight: 500,
        color: '#3f4854',
        '&:hover, &:focus': {
            backgroundColor: '#e5e5e5'
        },
        ['@media (max-width: 768px)']: {
            margin: '0px 14px',
        }
    },
    filterButton: {
        margin: '0px 10px 0px 40px',
        padding: 5,
        backgroundColor: '#f5f8fa',
        fontSize: 15,
        color: '#3f4854',
        '&:hover, &:focus': {
            backgroundColor: '#e5e5e5'
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
});

export default styles;