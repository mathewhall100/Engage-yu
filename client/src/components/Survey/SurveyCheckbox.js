import React, { PureComponent } from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const checkboxTheme = createMuiTheme({
    palette: {
        secondary: { main: '#009900' }, // This is just green.A700 as hex.
      },
})

class SurveyCheckbox extends PureComponent {  

    render () {

        const { checked, item } = this.props

        return (
            <MuiThemeProvider theme={checkboxTheme}>
                <Checkbox  
                    checked={checked} 
                    onClick={(event) => this.props.checkboxClick(event, item)} /> 
            </MuiThemeProvider>
        )
    }
};

export default SurveyCheckbox;