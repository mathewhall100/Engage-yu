import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class EditPatientFailedDialog extends React.Component {
  state = {
    open: true
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
                <p>A problem was encountered and the patient's details were not updated.</p>
                
                <p>Click 'Return' to review and try again, 'Cancel' to return to the patient menu</p>
            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus onClick={event => this.setState({ open: false }) }>Try again</Button> 
                <Button color="primary" component={Link} to='/admin/find' >Cancel</Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

EditPatientFailedDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(EditPatientFailedDialog);