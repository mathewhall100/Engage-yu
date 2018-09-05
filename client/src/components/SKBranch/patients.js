import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
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
        console.log("in render , " , this.props);
        return(
            <div>
                <Console title={this.props.title} />
            </div>

        );
        
    }
}
SKBranch.PropTypes = {
    classes : PropTypes.object.isRequired
}


export default withStyles(styles)(SKBranch);