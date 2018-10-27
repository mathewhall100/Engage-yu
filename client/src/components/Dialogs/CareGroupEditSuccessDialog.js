import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { careGroup } from '../../actions/index';
import provider_groupAPI from "../../utils/provider_group.js";

class CareGroupEditSuccessDialog extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {

    provider_groupAPI.findById(this.props.careGroupId)
      .then(res => {
          console.log("res.data: ", res.data);
          this.props.careGroup({careGroup: res.data});
          this.setState({careGroup: res.data})
      })
      .catch(err => {
          console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
          console.log(err);
  })
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
                <p>New care group, {this.props.name}, has been successfully updated.</p>
                <br />
                <p>Click 'Done' to return to the care group menu.</p>
            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus onClick={event => this.handleClose()}>
                Done
                </Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

CareGroupEditSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  // console.log("State : ", state);
  return {
      user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ careGroup }, dispatch);
}

CareGroupEditSuccessDialog = connect(mapStateToProps, mapDispatchToProps)(CareGroupEditSuccessDialog)
export default withMobileDialog()(CareGroupEditSuccessDialog);