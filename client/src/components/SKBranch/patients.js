import React, { Component } from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Console from '../Patient/Console';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#1a242b",
        },
        hover: {},
    },
});

class SKBranch extends Component {
    
    render () {
        const { classes } = this.props;
        return(
            <div>
                <Console {...this.props } title={this.props.title} />
            </div>

        );
        
    }
}
SKBranch.propTypes = {
    classes : propTypes.object.isRequired
}


export default withStyles(styles)(SKBranch);