import React, { PureComponent }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
    },
})

class MainBtn extends PureComponent {

    render() {

        const { classes } = this.props

        return (
            <Button size="small" className={classes.root} onClick={() => this.handleClick()}>
                {btn}
            </Button>
        )
    }
}



Panel.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles, { withTheme: true })(MainBtn);