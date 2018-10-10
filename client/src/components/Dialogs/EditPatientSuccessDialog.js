import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { fetchPatientData } from '../../actions/index';

class EditPatientSuccessDialog extends React.Component {
    state = {
        open: true
     };

    handleClose(event)  {
        this.props.fetchPatientData(this.props.patientId) 
        this.setState({ open: false }) 
    }

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
                <p>Patient details successfully updated and will be effective immediately </p>
                <p>Only one field can be updated at a time. If you need to update additional fileds for this patient, please click 'More to update'.</p>
                <p>Click 'Done to return to the patient menu.</p>               

                <br /><br />

            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus component={Link} to='/admin/find'>Done</Button>
                <Button color="primary" onClick={event => {this.handleClose(event) }} >More to update</Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

EditPatientSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        user: state.user
    }
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchPatientData }, dispatch);
}

EditPatientSuccessDialog = connect(mapStateToProps, mapDispatchToProps)(EditPatientSuccessDialog)
export default withMobileDialog()(EditPatientSuccessDialog);