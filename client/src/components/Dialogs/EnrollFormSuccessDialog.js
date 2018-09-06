import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class EnrollFormSuccessDialog extends React.Component {
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

            <DialogTitle id="responsive-dialog-title">Success!</DialogTitle>

            <DialogContent>
                <p>New patient {this.props.name} successfully enrolled with the following details:</p>
                <table>
                    <tbody>
                        <tr><td>Name: </td><td>{this.props.name}</td></tr>
                        <tr><td>DOB: </td><td>{this.props.dob}</td></tr>
                        <tr><td>Gender: </td><td>{this.props.gender}</td></tr>
                        <tr><td>Email: </td><td>{this.props.email}</td></tr>
                        <tr><td>Contact phone: </td><td>{this.props.phone}</td></tr>
                        <tr><td>Hospital number: </td><td>{this.props.hospId}</td></tr>
                        <tr><td>Primary provider: </td><td>{this.props.provider}</td></tr>
                    </tbody>
                </table>
                <p>Click 'Done' to return to dashboard, 'Create Diary' to create a new diary exercise for this patient</p>
            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus component={Link} to='/admin/dashboard'>
                Done
                </Button>
                <Button color="primary" component={Link} to='/admin/dashboard' >
                Create diary
                </Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

EnrollFormSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(EnrollFormSuccessDialog);