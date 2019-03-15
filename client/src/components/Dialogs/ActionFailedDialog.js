import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';

class ActionFailedDialog extends React.Component {
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

ActionFailedDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ActionFailedDialog);