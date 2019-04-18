import React, { Component } from 'react';
import { withStyles }  from '@material-ui/core';
import bannerImg from '../../img/dashboardBannnerImage.PNG';

const styles = theme => ({
    bannerImg: {
        height: "100%",
        padding: "40px",
        borderRadius: "8px",
        backgroundImage: `url(${bannerImg})`,
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
    },
    bannerEmpty: {
        height: "100%",
        padding: "60px",
        borderRadius: "8px",
        backgroundColor: "#FEFEFE"
    },
});

class LoginBanner extends Component {

    render () {
        const { classes, backgroundImage=true, opacity=1.0 } = this.props;

        return( 
            <div className={backgroundImage ? classes.bannerImg : classes.bannerEmpty} style={{opacity: opacity}}>   
                {this.props.children} 
            </div>
        );
    }
}
LoginBanner = withStyles(styles)(LoginBanner)
export default LoginBanner;