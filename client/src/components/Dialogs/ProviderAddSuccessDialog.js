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

class ProviderAddSuccessDialog extends React.Component {

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
                <Typography variant="subtitle1">New provider successfully added with the following details:</Typography>
                        <br /><br />
                        <Grid container spacing={24} >
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" gutterBottom>Name:</Typography> 
                                <Typography variant="subtitle2" gutterBottom>Role </Typography>
                                <Typography variant="subtitle2" gutterBottom>Office</Typography>
                                <Typography variant="subtitle2" gutterBottom>Email: </Typography>
                                <Typography variant="subtitle2" gutterBottom>Office phone: </Typography>
                                <Typography variant="subtitle2" gutterBottom>Care group:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" gutterBottom>{info.firstname} {info.lastname}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.role}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.office_name}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.email}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.phone1}</Typography>
                                <Typography variant="subtitle2" gutterBottom>{info.caregroup}</Typography>

                            </Grid>
                        </Grid>
                    <br /><br />
                    <Typography variant="subtitle1">>
                        Click 'done' to return to dashboard or, if any of the details above are incorrect, click 'edit' to make changes.
                    </Typography>
                </DialogContent>

                <DialogActions style={{margin: "0 20px 20px 0"}}>
                    <LinkBtn url='/admin/dashboard' text="done" />
                    <LinkBtn url='/admin/provider/update' text="edit" />
                </DialogActions>
            </div>

        </Dialog>
      </div>
    );
  }
}

ProviderAddSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

ProviderAddSuccessDialog = withStyles(styles)(ProviderAddSuccessDialog)
export default withMobileDialog()(ProviderAddSuccessDialog);