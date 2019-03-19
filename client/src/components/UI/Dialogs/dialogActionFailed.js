import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography}from '@material-ui/core';


class DialogActionFailed extends React.Component {
  
  state = {
    open: true
  };

  render() {
    const { fullScreen, text1, cancelUrl } = this.props;

    return (
      <div>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          disableBackdropClick 
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >

            <DialogTitle id="responsive-dialog-title">Failed!</DialogTitle>

            <DialogContent>
                <Typography variant="subtitle1">{text1}.</Typography>
                <Typography variant="subtitle1">Click 'Return' to review and try again, or 'Cancel' to quit</Typography>
            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus onClick={event => this.setState({ open: false }) }>Try again</Button> 
                <Button color="primary" component={Link} to={cancelUrl} >Cancel</Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

DialogActionFailed.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(DialogActionFailed);