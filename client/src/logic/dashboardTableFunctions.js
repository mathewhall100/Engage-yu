
// import the moment.js library for date and time handling
import moment from 'moment';


// **** Create data object ****
export const createData = (data) =>  {
    let counter = 0;
    let newData = [];

    data.map(d => {
        counter += 1;
        let newDataObj = { 
            id: counter, 
            _id: d._id,
            patientInfoId: d.patient_info_id,
            episodeId: d.episode_id,
            name: `${d.firstname} ${d.lastname}`, 
            number: d.hospital_id, 
            start: d.start_date, 
            end: d.end_date, 
            timeframe: `${d.start_time.slice(0,2)}:${d.start_time.slice(-2)} - ${d.end_time.slice(0,2)}:${d.end_time.slice(-2)}`, 
            status: createStatus(d.status, d.num_records, d.num_entries, d.start_date, d.end_date, d.entries_per_day),
            requester: d.requesting_provider_name, 
            requesterId: d.requesting_provider_id,
            primary: d.primary_provider_name,
            primaryId: d.primary_provider_id,
        };
        newData.push(newDataObj)
    })
    return newData;
};


// **** Get status of each survey entry in data object ****
// If active but passed the survey end date, then set as awaiting review. 
export const createStatus = (status, records, entries, startDate, endDate, entriesPerDay) => {

    let diffDays = 0;
    let progress = 0;
    let compliance = 0;

    if (status === "active") {
    diffDays = moment(moment(), "DD.MM.YYYY").diff(moment(moment(startDate), "DD.MM.YYYY"), 'days') 
    } else {diffDays = moment(moment(endDate), "DD.MM.YYYY").diff(moment(moment(startDate), "DD.MM.YYYY"), 'days') }
    progress = Math.round(((diffDays*entriesPerDay)/records)*100)
    compliance = entries ? Math.round((entries/(diffDays*entriesPerDay))*100) : 0
    compliance = compliance > 100 ? 100 : compliance

    if (status === "active" && (moment().isAfter(moment(endDate)))) {
        // note we need to also change the entry in the databases colections for this as well
        return {
            status: "awaiting review",
            compliance: compliance,
            progress: 100,
        }
    } 
    else if (status === 'active') {
        return {
            status: "active",
            compliance: compliance,
            progress: progress
        }
    }
    else if (status === "awaiting review") { 
        return {
            status: "awaiting review",
            compliance: compliance,
            progress: 100,
        }
    } else return { status: status }
}
  
  
// **** Filter data ****
// Filter by requester/provider
export const filterByPerson = (data, id, filter, ) => {
    switch (filter) {
    case "provider":
        return data.filter(d => d.primaryId === id)
        break;
    case "all":
        return data.filter(d => d.requesterId === id || d.primaryId === id);
        break;
    default:
        return data.filter(d => d.requesterId === id);
    };
};

// Filter by status
export const filterByStatus = (data, filter) => {
    let filteredData = [];
    filter.map(f => {
        filteredData = filteredData.concat(data.filter(d => d.status.status === f))
    })
    return filteredData;
};

// Filter by checked
export const filterByChecked = (data, filter) => {
    if (filter.length > 0) { return data.filter(d => filter.indexOf(d._id) > -1) } 
    return data 
};


