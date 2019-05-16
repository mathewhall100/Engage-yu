import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { selectConsoleTitle } from '../../actions'
import BtnLink from '../UI/Buttons/btnLink';
import ConsoleTitle from '../Console/ConsoleTitle'
import AccountActivity from './Activity'
import AccountChangePassword from './ChangePassword'
import AccountUpdateDetails from './UpdateDetails'
import AccountCloseAccount from './AccountCloseAccount'

const styles = (theme) => ({
    titleBox: {
        margin: "36px 24px 0 0",
        [theme.breakpoints.down('md')]: {
            marginLeft: "0px"
        }
    },
    title: {
        margin: "0 0 0 40px",
        [theme.breakpoints.down('md')]: {
            marginLeft: "60px"
        }
    },
    menuBox: {
        minHeight: "360px",
        marginTop: "40px",
        paddingRight: "20px",
        borderRight: "2px solid rgba(45, 64, 75, 0.3)", // theme.palette.primary.main with opacity 0.5
        [theme.breakpoints.down('md')]: {
            marginLeft: "22px"
        }
    },
    menuItemBox: {
        width: "100%",
        minHeight: "65px",
        borderTop: "2px solid #fafafa",
        borderBottom: "2px solid #fafafa",
        backgroundColor: "#FAFAFA",
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer"
        },
    },
    mainBox: {
        margin: "60px 0 0 40px"
    },
    backBtn: {
        marginTop: "8px"
    }
});

class Account extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "My Account"}));
    };

    state = {
        selected: [true, false, false]
    }

    handleSelected = (index) => {
        console.log("index: ", index)
        let tempArray = [];
        tempArray[index] = true
        this.setState({selected: tempArray})
    }

    render () {
        const { classes } = this.props;
        const { selected } = this.state;

        const RenderMenuItem = (props) => 
            <div className={classes.menuItemBox} style={{backgroundColor: props.selected ? "#EEE" : null}} onClick = {() => props.handleSelected(props.index)}>
                <br />
                <Typography variant="subtitle1" style={{marginLeft: "60px"}}>{props.text}</Typography>
            </div>
        
        return (
            <Fragment>

                <div className={classes.titleBox} style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                    <div className={classes.title}>
                        <ConsoleTitle />
                    </div>
                    <div className={classes.backBtn}>
                        <BtnLink url={"/admin"} text="go back"/>
                    </div>
                </div>

                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <div className={classes.menuBox}>
                            <RenderMenuItem text="My Activity" selected={selected[0]} index={0} handleSelected={this.handleSelected} />
                            <RenderMenuItem text="Update My Details" selected={selected[1]} index={1} handleSelected={this.handleSelected} />
                            <RenderMenuItem text="Change My Password" selected={selected[2]} index={2} handleSelected={this.handleSelected} />
                            <RenderMenuItem text="Close My Account" selected={selected[3]} index={3} handleSelected={this.handleSelected} />
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className={classes.mainBox}>
                            {selected[0] && <AccountActivity />}
                            {selected[1] && <AccountUpdateDetails />}
                            {selected[2] && <AccountChangePassword />}
                            {selected[3] && <AccountCloseAccount />}
                        </div>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

Account = connect(mapStateToProps)(Account)
Account = withStyles(styles)(Account)
export default Account