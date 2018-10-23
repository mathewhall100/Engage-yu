import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'; 
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { Legend, PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

class PatientReport extends Component {  
    state ={
        episode : '',
    }
    componentDidMount() {
    }
    handleEpisodeChange = event => {
        this.setState({ [event.target.name] : event.target.value }, function() {
            console.log(this.state.episode);
        });
    }
    
    renderSelect(arrEpisodes) {
        if (arrEpisodes) {
        return(
            <div>
                <InputLabel htmlFor='episode'>Select previous session</InputLabel>
                <Select 
                    value={this.state.episode}
                    onChange={this.handleEpisodeChange}
                    inputProps={{
                        name: 'episode',
                        id : 'episode-simple',
                    }}
                >   
                    {arrEpisodes.map( (epi, index) => {
                        return(
                            <MenuItem value={epi.episode_number.toString()}>{epi.episode_number.toString()}</MenuItem>
                        )
                    })
                    }            
                </Select>
            </div>
        )}    
    }
    renderPieChart(episodes, episodeSelected) {
        if (episodeSelected) {
            console.log(episodes[episodeSelected]);
            let validRecords = this.filterByLate(episodes[episodeSelected].records, false);
            let lateRecords = this.filterByLate(episodes[episodeSelected].records, true);
            let noRecords = this.filterNoRecord(episodes[episodeSelected].records);
            let arrRecords = [
                {name : "good entry", value : validRecords.length},
                { name: "late entry", value: lateRecords.length},
                { name: "no entry", value: noRecords.length}
            ];
            return(
                <div>
                    <PieChart width={800} height={400}>
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Pie isAnimationActive={false} data={arrRecords} cx={350} cy={120} labelLine={false} outerRadius={120} fill="#8884d8" label >
                            {arrRecords.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                    </PieChart>
                </div>
            )
            
        }
    }

    filterByLate(allRecords, late){
        console.log("filter by late ", allRecords);
        let records=0;
        records= allRecords.filter( function(rec) {
            return rec.valid === true && rec.late === late;
        });
        
        return records;
    }
    filterNoRecord(allRecords){
        let records = 0;
        records = allRecords.filter( function(rec) {
            return rec.valid === false;
        });
        return records;
    }
    filterToday(allRecords){
        console.log("filter today : ", allRecords);
        let records = 0;
        
        records = allRecords.filter( function(rec) {
            return moment(rec.scheduled_datetime).isSame(moment(), 'day');
        })
        let objRecords = {
            total : records,
            validRecords : this.filterByLate(records,false),
            lateRecords : this.filterByLate(records, true),
            noRecords : this.filterNoRecord(records)
        }
        return objRecords
    }

    renderCurrentSession(curr){
        let {episode_number, start_date, end_date }= curr;
        let todayRecords = this.filterToday(curr)
        console.log("Today records : " , todayRecords);
        return(
            < Grid container spacing={24} className="test" >
                {
                    todayRecords.total.length > 0 ? 
                        <Grid item xs={12} className="test2">
                            {
                                todayRecords.validRecords.length>0 ? 
                                    <div>
                                        <h3>Entered Records</h3>
                                        {this.renderAllButtons(todayRecords.validRecords)}
                                    </div>
                                : null
                            }
                            {
                                todayRecords.lateRecords.length >0 ?
                                    <div>
                                        <h3>Late Records</h3>
                                        {this.renderAllButtons(todayRecords.lateRecords)}
                                    </div>
                                :
                                null
                            }
                            {
                                todayRecords.noRecords.length >0 ?
                                <div>
                                    <h3>Pending Records</h3>
                                    {this.renderAllButtons(todayRecords.noRecords)}
                                </div>
                                :
                                null
                            }
                        </Grid>
                    :
                        <Grid item xs={12}>
                            {this.renderNoRecordsAndContact()}
                        </Grid>                        
                }
            </Grid >
        )
            
    }
    renderAllButtons(arrRecords){
        let numberOfRows = arrRecords/4;

        for (let i = 0; i < numberOfRows ; i++){
            for(let j = 0; j < 4; j++){
                return(
                    <Grid item xs={3}>
                        <Button variant='outlined' size='medium'>
                            Day{arrRecords[j + (i * 4)].day}  Time {arrRecords[j + (i * 4)]}
                            <Icon>
                                {arrRecords[j + (i * 4)].valid && arrRecords[j + (i * 4)].late === false ?
                                    <CheckIcon />
                                    :
                                    [
                                        arrRecords[j + (i * 4)].valid && arrRecords[j + (i * 4)].late ?
                                            <WarningIcon />
                                            :
                                            <EditIcon />
                                    ]
                                }
                            </Icon>
                        </Button>
                    </Grid>
                )
                
            }

        }
    }
    renderNoRecordsAndContact(){
        console.log("no records")
        return(
            <Card>
                <CardContent>
                    <h3>No Active Session</h3>
                    <div>
                        <div>Bummer!! You do not have an active session going on at this moment... </div><br />
                        <div>Options</div>
                        <ul>
                            <li>Contact your provider to set up a new session.</li>
                            <li>Create a new session on your own.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        )
        
    }
    render () {
        const { episodes, currentEpisode } = this.props;
        console.log("Episodes : ", episodes);
        console.log("Current Episode : " , currentEpisode);
        return (
                <div>
                    <h1>Report Page</h1>
                    <Grid container spacing={24}>
                        <h2>Previous Sessions</h2>
                        <Grid container spacing={24}>
                            <Grid item xs={3}>
                                {this.renderSelect(episodes)}
                            </Grid>
                            <Grid item xs={9}>
                                {this.state.episode != '' ? this.renderPieChart(episodes, this.state.episode) : null}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <h2>Current Session </h2>
                        <Grid container spacing={24}>
                            { currentEpisode && currentEpisode.records.length > 0 ? this.renderCurrentSession(currentEpisode.records) : null}
                        </Grid>
                    </Grid>
                    
                    
                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}
function mapStatToProps(state){
    console.log("State in report : ", state)
    return {
        episodes : state.patientData.episodes,
        currentEpisode : state.patientData.currentEpisode,
    };
}

export default connect(mapStatToProps, mapDispatchToProps) (PatientReport)
