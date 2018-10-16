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

import { providerDetails } from '../../actions/index';
import providerAPI from "../../utils/provider.js";

class EditProviderSuccessDialog extends React.Component {
    state = {
        open: true
     };

    handleClose(event)  {

        providerAPI.findById(this.props.providerId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.props.providerDetails({provider: res.data});
                this.setState({provider: res.data})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
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
                <p>Provider details successfully updated and will be effective immediately </p>
                <p>Only one field can be updated at a time. If you need to update additional fileds for this provider, please click 'More to update'.</p>
                <p>Click 'Done to return to the provider menu.</p>               

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

EditProviderSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ providerDetails }, dispatch);
}

EditProviderSuccessDialog = connect(mapStateToProps, mapDispatchToProps)(EditProviderSuccessDialog)
export default withMobileDialog()(EditProviderSuccessDialog);