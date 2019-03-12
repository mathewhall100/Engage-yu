import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

const styles = {
	// AM/PM vs 24HR toggle styles
	toggleClock: {
		float: "right",
		padding: "2px 5px 2px 5px",
		fontSize: "13px",
		color: "#888",
		fontWeight: "bold",
		'&:hover': {
		   color: "black",
		   cursor: "pointer",
		   backgroundColor: "#eee",
        },
	},
    // Slider styles
    slider1: {
        width: "98%",
		position: "relative",
		top: 1,
    },
    slider2: {
        width: "98%",
		position: "relative",
		top: -1,
        left: 16,
    },
    slider1Hint: {
		fontWeight: 400
	},
    slider2Hint: {
        position: "relative",
		top: 4,
		fontWeight: 400
	},
    sliderTable: {
        width: "100%",
        height: 60,
		tableLayout: "fixed",
		border: "2px solid #333",
        borderCollapse: "collapse",
        textAlign: "center",
        fontSize: 12,
    },
    tableCellActive: {
        borderleft: "1px solid rgb(0, 100, 0, 1)",
        borderRight: "1px solid rgb(0, 100, 0, 1)", 
        borderTop: "2px solid #333333",
		borderBottom: "2px solid #333333",
		backgroundColor: "#4CAF50"
    },
    tableCellInactive: {
        borderleft: "1px solid rgb(0, 0, 0, 0.1)",
        borderRight: "1px solid rgb(0, 0, 0, 0.1)", 
        borderTop: "2px solid #333",
		borderBottom: "2px solid #333",
		backgroundColor: "#eeeeee"
    },
    tableNumeralActive: {
		font: "roboto",
		fontWeight: "bold",
		fontSize: 18,
		lineHeight: 0.8
    },
    tableNumeralInactive: {
		font: "roboto",
		opacity: .5,
		fontSize: 18,
		lineHeight: 0.8
    },
};

const sliderTheme = createMuiTheme({
    overrides: {
        MuiSlider: {
			track: {
				height: "30px",
				opacity: 0
			},
			trackAfter: {
				opacity: 0
			},
		}
    }
})

const sliderTimesAMPM = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am"]
const sliderTimes24HR = ["0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "0100", "0200"]

class SurveySlider extends React.Component {

	state = {
		sliderTimes: sliderTimesAMPM,
		toggleClock: "24hr",
		sliderValue1: 0,
		sliderValue2: 20,
	};

	// Slider controls

	handleSliderChange1 = (event, sliderValue1) => {
		this.setState({sliderValue1: sliderValue1 > (this.state.sliderValue2-1) ? this.state.sliderValue2 - 1 : sliderValue1})
		this.props.sliderValues(sliderValue1, this.state.sliderValue2)
	};
	
	handleSliderChange2 = (event, sliderValue2) => {
		this.setState({ sliderValue2: sliderValue2 < (this.state.sliderValue1 + 1) ? this.state.sliderValue1 + 1 : sliderValue2})
		this.props.sliderValues(this.state.sliderValue1, sliderValue2)
	};

	toggleClock = () => {
		this.setState({
			toggleClock: this.state.toggleClock === "24hr" ?  "am/pm" : "24hr",
			sliderTimes: this.state.toggleClock === "24hr" ? sliderTimes24HR : sliderTimesAMPM
		})
	}

	render() {
		const { classes } = this.props;
		const { sliderValue1, sliderValue2 } = this.state;

		return (
			<React.Fragment>

				<div>
					<Typography className={classes.slider1Hint} variant="body2" inline gutterBottom >Start time (slide blue dot)</Typography>

					<span className={classes.toggleClock} onClick={() => this.toggleClock()}><span style={{color: this.state.toggleClock === "am/pm" ? "black" : null}}>24HR</span></span>
					<span className={classes.toggleClock} onClick={() => this.toggleClock()}><span style={{color: this.state.toggleClock === "24hr" ? "black" : null}}>AM/PM</span></span>
					
					<MuiThemeProvider theme={sliderTheme}>
							<Slider className={classes.slider1} name="slider1" value={sliderValue1} min={0} max={20} step={1} onChange={this.handleSliderChange1} />
					</MuiThemeProvider>
				</div>

				<table className={classes.sliderTable}>
					<tbody>
						<tr>
							{this.state.sliderTimes.map((time, index) => {
								return(
									<td key={index}
											className={this.state.sliderValue1 > index || this.state.sliderValue2 < index ? classes.tableCellInactive : classes.tableCellActive}
									> 
										<span className={this.state.sliderValue1 > index || this.state.sliderValue2 < index ? classes.tableNumeralInactive : classes.tableNumeralActive}>
											{time.slice(0, time.length-2)}
											<br />
											<span style={{fontSize: "14px"}}>{time.slice(-2)}</span>
										</span>
									</td>
								)
							})}
						</tr> 
					</tbody>
				</table>

				<div>
					<MuiThemeProvider theme={sliderTheme}>
						<Slider className={classes.slider2} name="slider2" value={sliderValue2} min={0} max={20} step={1} onChange={this.handleSliderChange2} />
					</MuiThemeProvider>
					<Typography className={classes.slider2Hint} variant="body2" gutterBottom align="right" >End time (slide blue dot) </Typography>
				</div>

		</React.Fragment>

		);
	}
}

SurveySlider.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SurveySlider);