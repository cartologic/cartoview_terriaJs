import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStylesFacebook = makeStyles(() => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: '#8b9198',
    },
    top: {
        color: '#3f4854',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

const FacebookCircularProgress = props => {
    const classes = useStylesFacebook();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center'
    },
});

const CustomizedCircularProgress = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FacebookCircularProgress/>
        </div>
    );
};

export default CustomizedCircularProgress;
