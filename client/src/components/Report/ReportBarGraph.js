import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer} from 'recharts';


class ReportBarGraph extends Component {

    displayGraphCalc = (data, question) => {
        //console.log("graphdataIn: ", data)
        let array = [];
        data.map((d, index) => {
            return (
                array.push({
                    time: `${d.time.slice(0, 2)}:${d.time.slice(-2)}`,
                    ans1: d.questions[question].answers[0],
                    ans2: d.questions[question].answers[1],
                    ans3: d.questions[question].answers[2],
                    ans4: d.questions[question].answers[3],
                    ans5: d.questions[question].answers[4],
                })
            )
        })
        return array;
    }

    render () {

        return (

            <React.Fragment>
                {this.props.displayData && <ResponsiveContainer width="100%" height={this.props.height}>
                
                <BarChart data={this.displayGraphCalc(this.props.displayData, this.props.displayQuestion)} margin={{top: 20, right: 0, left: 15, bottom: 30}}>
                    
                    <XAxis dataKey="time" angle={-45} textAnchor="end" fontFamily="Roboto"/>
                    <YAxis hide={true}/>
                    <Legend layout='vertical' align='right' verticalAlign='top' 
                        payload={[
                            { id: 'ans1', value: this.props.question.answers[0], type: 'square', color: 'green' },
                            { id: 'ans2', value: this.props.question.answers[1], type: 'square', color: '#ffc200' },
                            { id: 'ans3', value: this.props.question.answers[2], type: 'square', color: 'orange' },
                            { id: 'ans4', value: this.props.question.answers[3], type: 'square', color: 'red' },
                            { id: 'ans5', value: this.props.question.answers[4], type: 'square', color: 'grey' },
                        ]} 
                        wrapperStyle={{
                            paddingLeft: "15px",
                            lineHeight: "20px",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Roboto",
                            color: "#333333"
                        }}
                    />
                    <Bar dataKey="ans5" stackId="a" fill="grey" />
                    <Bar dataKey="ans4" stackId="a" fill="red" />
                    <Bar dataKey="ans3" stackId="a" fill="orange" />
                    <Bar dataKey="ans2" stackId="a" fill="#ffc200" />
                    <Bar dataKey="ans1" stackId="a" fill="green" />
                </BarChart> 

                </ResponsiveContainer> }
            </React.Fragment>
        )
    }
}

export default ReportBarGraph



                      