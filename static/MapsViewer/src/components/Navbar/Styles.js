const styles = () => ({
    navLink: {
        '&:hover': {
            transform: 'translateY(-10px)',
        },
    },
    media: {
        height: 40,
        margin: "0px 20px",
        ['@media (max-width: 768px)']: {
            margin: '0px 14px',
        }
    },
    title: {
        flexGrow: 1
    }
})

export default styles
