import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class RemoveProviderFailedDialog extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
    
  };

  render() {
    const { fullScreen } = this.props;

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
                <p>A problem was encountered and care group {this.props.name} has not been removed</p>
                
                <p>Click 'Cancel' to return to the care group menu</p>
            </DialogContent>

            <DialogActions>
                <Button color="primary" component={Link} to='/admin/caregroup' >
                Cancel
                </Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

RemoveProviderFailedDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(RemoveProviderFailedDialog);