import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinkBtn from '../Buttons/linkBtn'

const styles = () => ({
    fwMedium: {
        fontWeight: 500,
      },
    backBtn: {
        margin: "6px 20px 0 0"
    }
  });

class PatientDetailsBar extends Component {

    render () {
        const { classes, items, url } = this.props;
        return (
            <Grid container spacing={24}>

                { items.map((i, idx) => {
                    return (
                        <Grid item xs={i.spacing} key={idx}>
                            {i.caption !== "btn" ?
                                <React.Fragment>
                                    <Typography variant="caption">{i.caption}</Typography>
                                    <Typography variant="h6" className={classes.fwMedium}>{i.text}</Typography>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                     {i.text === "close" ?
                                        <Typography align="right" className={classes.backBtn} >
                                            <LinkBtn url={i.url} text="close"/>
                                        </Typography>
                                        : 
                                        i.text ? i.text : null 
                                    }
                                </React.Fragment>
                            }
                        </Grid>
                    )
                })}
            </Grid>
        );
    }
}


PatientDetailsBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  PatientDetailsBar = withStyles(styles)(PatientDetailsBar)
  export default PatientDetailsBar