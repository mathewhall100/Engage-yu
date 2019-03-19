import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography} from '@material-ui/core';
import BtnLink from './Buttons/btnLink'

const styles = () => ({
    fwMedium: {
        fontWeight: 500,
      },
    backBtn: {
        margin: "8px 0 0 0"
    }
  });

class DetailsBar extends Component {

    getSpacing = (grid) => { 
        let itemsConcat = ""
        let gridL = 0
        this.props.items.map((i) => { return itemsConcat += i.text})
        if (itemsConcat.length > 70) {gridL = 10}
            else if (itemsConcat.length > 45) {gridL = 8}
            else {gridL = 6}
        if (grid === "large") return gridL
            else return (12-gridL)
    }

    render () {
        const { classes, items } = this.props;
        return (
            <Grid container spacing={24}>
                <Grid item xs={this.getSpacing("large")}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                        { items.map((i, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    {i.caption !== "btn" ?
                                        <div>
                                            <Typography variant="caption">{i.caption}</Typography>
                                            <Typography variant="h6" className={classes.fwMedium}>{i.text}</Typography>
                                        </div>
                                        : null 
                                    }
                                </React.Fragment>
                            )
                         })}
                    </div>
                </Grid>
                <Grid item xs={this.getSpacing("small")}>  
                    { items.map((i, idx) => {
                        return (
                            <React.Fragment key={idx}>      
                                {i.text === "close" ?
                                    <Typography align="right" className={classes.backBtn} >
                                        <BtnLink url={i.url} text="close"/>
                                    </Typography>
                                    : null 
                                }

                            </React.Fragment>
                        )
                    })} 
                </Grid>
            </Grid>
        )
    }
}


DetailsBar.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
  };
  
  DetailsBar = withStyles(styles)(DetailsBar)
  export default DetailsBar