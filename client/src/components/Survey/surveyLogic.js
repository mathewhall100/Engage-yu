
import moment from 'moment'
//import times from 'lodash'

export const durations = [
    {value: "1", label: "1 day" },
    {value: "2", label: "2 days" },
    {value: "3", label: "3 days" },
    {value: "5", label: "5 days" },
    {value: "7", label: "7 days" },
    {value: "10", label: "10 days" },
    {value: "14", label: "14 days" }
]

export const startDates = [
    {value: "today", label: "Today"},
    {value: "tomorrow", label: "Tomorrow"},
    {value: "date", label: "Select date: "}
]

export const frequencies = [
    {value: "30", label: "30 mins" },
    {value: "60", label: "60 mins" },
    {value: "120", label: "120 mins" },
]

export const timeMargins = [
    {value: "5", label: "5 mins" },
    {value: "10", label: "10 mins" },
    {value: "15", label: "15 mins" },
    {value: "20", label: "20 mins" },
    {value: "30", label: "30 mins" },
]

export const reminders = [
    {value: "5", label: "5 mins before" },
    {value: "10", label: "10 mins before" },
    {value: "15", label: "15 mins before" },
    {value: "off", label: "off" },
]

export const sliderTimesAMPM = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am"]
export const sliderTimes24HR = ["0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "0100", "0200"]


export const createStartDate = (date1, date2) => {
    console.log("dates: ", date1, " ", date2)
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