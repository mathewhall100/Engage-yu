import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class SurveySaveSuccessDialog extends React.Component {
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
                <p>New diary card successfully created for {this.props.name}.</p>
                <p>This entry will appear in the active diary cards las 'pending' and become 'active' once the patient logs in and starts to enter their symptom information.</p>
                <p>You can edit this diary card by selcting it from the lst of diary cards on the dashboard. </p>               

                <br /><br />

            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus component={Link} to='/admin/dashboard'>
                Done
                </Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

SurveySaveSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(SurveySaveSuccessDialog);