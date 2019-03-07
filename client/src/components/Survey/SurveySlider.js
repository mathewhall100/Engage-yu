import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

const times = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "pam", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am" ]


const styles = {

  slider1: {
    width: "102%",
    position: "relative",
    top: 16,
    left: -8,
  },
  slider2: {
    width: "102%",
    position: "relative",
    top: -16,
    left: -8,
  },
  sliderHint1: {
    position: "relative",
    top: 18
  },
  sliderHint2: {
    position: "relative",
    top: -18,
    marginRight: -10,
  },
  sliderTable: {
    width: "100%",
    height: 60,
    tableLayout: "fixed",
    borderCollapse: "collapse",
    textAlign: "center",
    fontSize: 12,
  },
  sliderTableCellBorder: {
    borderleft: "1px solid rgb(0, 100, 0, 0.5)",
    borderRight: "1px solid rgb(0, 100, 0, 0.5)", 
    borderTop: "2px solid #dddddd"
  },
  sliderTableNumeralSize: {
    fontSize: 16,
  },
};

class FormTimeSliderV2 extends React.Component {

  state = {
    sliderValue1: 0,
    sliderValue2: 20,
    sliderTimes: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "pam", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am" ]
  };

  handleSliderChange1 = (event, sliderValue1) => {
    this.setState({ sliderValue1: sliderValue1 > (this.state.sliderValue2-1) ? this.state.sliderValue2 - 1 : sliderValue1 });
  };

  handleSliderChange2 = (event, sliderValue2) => {
    this.setState({ sliderValue2: sliderValue2 < (this.state.sliderValue1 + 1) ? this.state.sliderValue1 + 1 : sliderValue2 });
  };

  render() {
    const { classes } = this.props;
    const { sliderValue1, sliderValue2 } = this.state;

    return (
      <div>
       <div>
          <Typography className={classes.sliderHint1} align='left' variant="subheading" gutterBottom id="label">Select Start Time (blue dot):</Typography>
            <Slider className={classes.slider1} value={sliderValue1} reverse min={20} max={0} step={1} onChange={this.handleSliderChange1} />
        </div>

        <table className={classes.sliderTable}>
          <tbody>
            <tr>
              {this.state.sliderTimes.map((time, index) => {
                return(

                  <td key={index}
                    className={classes.sliderTableCellBorder} 
                    style={{backgroundColor:  this.state.sliderValue1 > index || this.state.sliderValue2 < index ? "#eeeeee" : "#4CAF50"}}
                  > 
                    <span className={classes.sliderTableNumeralSize}>{time.slice(0, time.length-2)}</span>
                    <br />
                    {time.slice(-2)}
                  </td>

                )
              })}
            
            </tr> 
          </tbody>
        </table>

        <div>
          <Slider className={classes.slider2} value={sliderValue2} min={0} max={20} step={1} onChange={this.handleSliderChange2} />
          <Typography className={classes.sliderHint2} id="label" variant="subheading" gutterBottom align="right" >Select End Time (blue dot) </Typography>
        </div>

        {/* {times[this.state.sliderValue1]} - {times[this.state.sliderValue2]} */}

      </div>

    );
  }
}

FormTimeSliderV2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FormTimeSliderV2);