import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography, Grid} from '@material-ui/core'
import BtnLink from '../UI/Buttons/btnLink'

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

    const RenderInfo = (props) => 
      <Grid item xs={6}>
        {props.info.map((text, idx) => {
          return (
            <Typography key={idx} variant="subtitle2" gutterBottom>{text}</Typography>
          )
        }) }
      </Grid>


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
                  <br /> <br />
                  <Grid container spacing={24} >
                          <RenderInfo info={["Name", "Role", "Office:", "Email", "Office phone:", "Care group"]} />
                          <RenderInfo info={[`${info.firstname} ${info.lastname}`, info.role, info.office.name, info.email, info.phone[0].number, info.provider_group_name]} />
                  </Grid>
                  <br /> <br />
                  <Typography variant="subtitle1">>
                    Click 'done' to return to dashboard or, if any of the details above are incorrect, click 'edit' to make changes.
                  </Typography>
                </DialogContent>

                <DialogActions style={{margin: "0 20px 20px 0"}}>
                    <BtnLink url='/admin/dashboard' text="done" />
                    <BtnLink url='/admin/provider/update' text="edit" />
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