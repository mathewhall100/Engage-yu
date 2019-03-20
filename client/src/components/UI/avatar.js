import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
};

const ImageAvatars = (props) => {
    const { classes } = props;
    return (
        <span className={classes.row}>
            {props.size === 'small' ?
                <Avatar alt={props.name} src={props.image} className={classes.avatar} />
                :
                <Avatar alt={props.name} src={props.image} className={classNames(classes.avatar, classes.bigAvatar)} />
            }
        </span>
    );
};

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);