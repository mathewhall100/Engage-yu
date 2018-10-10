import React, { Component } from 'react';
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
        return(
            <div>
                <Console {...this.props } title={this.props.title} />
            </div>

        );
        
    }
}


export default withStyles(styles)(SKBranch);