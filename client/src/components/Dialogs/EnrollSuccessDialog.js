import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid"
import withMobileDialog from '@material-ui/core/withMobileDialog';
import LinkBtn from '../Buttons/linkBtn'

const styles = () => ({
    root: {
        padding: "40px",
        maxWidth: "600px"
    },

})

class EnrollSuccessDialog extends React.Component {

  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
    
  };

  render() {
    const { classes, fullScreen, info} = this.props;

    return (
      <div>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          disableBackdropClick 
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
            <div className={classes.root}>
                <DialogTitle id="responsive-dialog-title">Success!</DialogTitle>

                <DialogContent>
                    <Typography variant="body1">New patient successfully enrolled with the following details:</Typography>
                        <br /><br />
                        <Grid container spacing={24} >
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" gutterBottom>Name:</Typography> 
                                <Typography variant="subtitle2" gutterBottom>DOB: </Typography>
                                <Typography variant="subtitle2" gutterBottom>Gender</Typography>
                                <Typography variant="subtitle2" gutterBottom>Email: </Typography>
                                <Typography variant="subtitle2" gutterBottom>Contact phone: </Typography>
                                <Typography variant="subtitle2" gutterBottom>Hospital number:</Typography>
                                <Typography variant="subtitle2" gutterBottom>Primary provider:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" gutterBottom>{info.firstname} {info.lastname}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.dob}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.gender}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.email}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.phone}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.hospital_id}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.primary_provider_name}</Typography>
                            </Grid>
                        </Grid>
                    <br /><br />
                    <Typography variant="body1">
                        Click 'done' to return to dashboard, 'create Diary' to create a new diary exercise for this patient or, if any of the details above are incorrect, click 'edit' to make changes.
                    </Typography>
                </DialogContent>

                <DialogActions style={{margin: "0 20px 20px 0"}}>
                    <LinkBtn url='/admin/dashboard' text="done" />
                    <LinkBtn url='/admin/survey' text="create diary card" />
                    <LinkBtn url='/admin/updatepatient' text="edit" />
                </DialogActions>
            </div>

        </Dialog>
      </div>
    );
  }
}

EnrollSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

EnrollSuccessDialog = withStyles(styles)(EnrollSuccessDialog)
export default withMobileDialog()(EnrollSuccessDialog);