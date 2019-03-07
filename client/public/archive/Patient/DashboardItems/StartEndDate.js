import React, { Component } from 'react'; 
import moment from 'moment';

class StartEndDate extends Component {

    render(){
        const {start_time, start_date, end_time, end_date, requesting_provider_firstname, requesting_provider_lastname} = this.props
        //console.log(this.props.start_date);
        return(
            <div>
                <p>
                    You are filling questionnaires for this period </p>
                <p>{moment(start_date).utc().format('MM-DD-YYYY')} {moment(start_time, "hhmm").format('hh:mm A')} - {moment(end_date).utc().format('MM-DD-YYYY')} {moment(end_time, "hhmm").format('hh:mm A')}</p>

                <br />
                <p>
                    This questionnaire is conducted by Dr {requesting_provider_firstname} {requesting_provider_lastname}
                </p>
            </div>
    )
    }
}

export default StartEndDate;