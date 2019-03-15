
// import the moment.js library for date and time handling
import moment from 'moment';


// **** Get status of each survey entry in data object ****
export const createStatus = (ep) => {
    console.log("ep: ", ep)
    const { start, end, numDays, startTime, endTime, entriesPerDay, records} = ep
    let adjustedStatus = ""
    let diffDays = 0;
    let diffHours = 0;
    let expectedEntries = 0;
    let actualEntries = 0;
    let progress = 0
    let compliance = 0

    // If active but passed the survey end date, then set as awaiting review. 
    if (ep.status === "active" && (moment().isAfter(moment(end)))) {
        adjustedStatus = "awaiting review"
        
        // api call here to change status in database
    } else {adjustedStatus = ep.status}
    
         
    // calculate expected number of days of data entry
    if (adjustedStatus === "active") {
        diffDays = moment(moment(), "DD.MM.YYYY").diff(moment(moment(start), "DD.MM.YYYY"), 'days') 
        const currentHour = parseInt(moment().format("HH") + moment().format("mm"))
        console.log("currentHour: ", currentHour, " ", parseInt(startTime), " ", parseInt(endTime))
        if (currentHour < parseInt(startTime)) {diffHours = 0}
            else if (currentHour >= parseInt(endTime)) {diffHours = entriesPerDay}
            else {diffHours = Math.floor((currentHour/100)+1 - parseInt(startTime/100))}
    } else {
        diffDays = numDays; diffHours = 0
    }
    // console.log("diffdays: ", diffDays, " --- diffHours: ", diffHours)

    expectedEntries = diffDays*entriesPerDay+diffHours
    actualEntries = records.filter(rec => rec.valid).length
    if (actualEntries > expectedEntries) {actualEntries = expectedEntries}
    // console.log("expected entries: ", expectedEntries, " --- actual entries: ", actualEntries)

    if (adjustedStatus === "active") {progress = (actualEntries/(numDays*entriesPerDay)).toFixed(2)} 
        else {progress = 1.0}

    compliance = (actualEntries/expectedEntries).toFixed(2)
    // console.log("progress: ", progress, " --- compliance: ", compliance)
        
    return {
        adjustedStatus: adjustedStatus,
        progress,
        compliance,
    }
}


// **** Filter data ****
// Filter by requester/provider
export const filterByPerson = (data, id, filter, ) => {
    console.log("filterByPerson data IN", data, " ",  id, " ", filter)
    switch (filter) {
    case "provider":
        return data.filter(d => d.primaryId === id)
        break;
    case "all":
        return data.filter(d => d.requesterId === id || d.primaryId === id);
        break;
    default:
        return data
    };
};

// Filter by status
export const filterByStatus = (data, filter) => {
    console.log("filterStatus data IN", data, " ", filter)
    let filteredData = [];
    filteredData = data.filter(f => filter.includes(f.adjustedStatus))
    console.log("filteredStatus data OUT", filteredData)
    return filteredData;
};

// Filter by checked
export const filterByChecked = (data, filter) => {
    console.log("filterByChecked data IN", data, " ", filter)
    if (filter.length > 0) { return data.filter(d => filter.indexOf(d.episodeId) > -1) } 
    console.log("filterByChecked data OUT", data)
    return data 
};


