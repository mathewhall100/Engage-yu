import React, { Component} from 'react'
import { withStyles, Paper, Fade, Popper} from '@material-ui/core';


const styles = (theme) =>  ({
// Popper
    popperRight: {
        zIndex: 1,
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "8px",
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-1em',
            height: '1em', //3
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.primary.main} transparent transparent`,
            },
        },
    },
    popperTop: {
        zIndex: 1,
        marginBottom: '12px',
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "8px",
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginLeft: "-12px",
            marginBottom: '-1em',
            height: '1em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
            },
          },
      },
    popperLeft: {
        zIndex: 1,
        marginRight: '25px',
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "8px",
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginTop: "-15px",
            marginRight: "-1em",
            height: '1em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: ` transparent transparent transparent ${theme.palette.primary.main}`,
            },
          },
      },
      arrow: {
        position: 'absolute',
        fontSize: 14,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
      },
})

class PopperCustom extends Component {

    state = {
        arrowRef: null
    }
  
    // Popper arrow 
    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    render() {
        const { classes, placement, width="320px" } = this.props

        return (

            <Popper 
            open={this.props.popperOpen} 
            anchorEl={this.props.anchorEl} 
            placement={placement} 
            className={placement === "right" ? classes.popperRight : placement === "left" ? classes.popperLeft : classes.popperTop}
            modifiers={{
                arrow: {
                    enabled: true,
                    element: this.state.arrowRef,
                },
                flip: {
                    enabled: false,
                },
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'scrollParent',
                }
                }}
            >
                <span className={classes.arrow} ref={this.handleArrowRef} />
                <Paper style={{width: width, padding: "20px"}}>
                    <Fade in={this.props.popperOpen} timeout={400}>
                        <div> 
                          {this.props.children}
                        </div>
                    </Fade>
                </Paper>
            </Popper>

        )
    }
}

export default  withStyles(styles, { withTheme: true })(PopperCustom);