
import moment from 'moment'
//import times from 'lodash'

export const createStartDate = (date1, date2) => {
    //console.log("dates: ", date1, " ", date2)
    switch (date1) {
        case "tomorrow":
            return moment().add(1, 'd')
        case "date":
            return moment(date2).set({hour:0,minute:0,second:0,millisecond:0})
        default: 
        return moment().set({hour:0,minute:0,second:0,millisecond:0})
    }       
}

export const createRecordsArray = (startDate, startTime, duration, frequency, entriesPerDay) => {

    const dateStart = moment(startDate).hour(startTime.slice(0 ,2)).minute(startTime.slice(-2)).second(0);
    let datepoint = dateStart;
    let timepoint = "";
    let recordsArray = [];
    let index = 0;
    let addDay = 0;

    for (let day=0; day < duration; day++) {
        addDay = day === 0 ? 0 : 1  
        datepoint = moment(datepoint.add(addDay, "d"))
        datepoint = moment(datepoint).hour(startTime.slice(0 ,2)).minute(startTime.slice(-2)).second(0);

        for (let time=0; time < entriesPerDay; time++) {
            if (frequency === "30" && time) {
                datepoint = moment(datepoint).add(30, 'm')} else {datepoint =  moment(datepoint).add(60, 'm')
            }
            timepoint = `${moment(datepoint).format("HH")}${moment(datepoint).format("mm")}`
            if (!(frequency === "30" && time === entriesPerDay-1)) {
                recordsArray.push( 
                    {   record_number: index++,
                        valid: false,
                        day: day,
                        time: timepoint,
                        scheduled_datetime: moment(datepoint), 
                    }
                )
             }
        }
    };
    return recordsArray;
};


export const createSurveyQuestions = (selectedQuestions) => {
    let tempArray = []
     tempArray = selectedQuestions.map((question, index) => {
       return { question_number: index,
                question: question.question,
                answers: question.answers,
                hints: question.hints
        }
    })

    return tempArray

};