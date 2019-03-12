
import moment from 'moment'

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
            time ? 
                datepoint = frequency === "30" ? moment(datepoint).add(30, 'm') : moment(datepoint).add(60, 'm')
                :
                null
            timepoint = `${moment(datepoint).format("HH")}${moment(datepoint).format("mm")}`

            !(frequency === "30" && time === entriesPerDay - 1) ? (
                recordsArray.push(
                    {
                        record_number: index,
                        valid: false,
                        day: day,
                        time: timepoint,
                        scheduled_datetime: moment(datepoint), 
                    }
                )
            ) : null

            index++
        }
    };

    return recordsArray;

};


export const createSurveyQuestions = (selectedQuestions) => {

    let allQuestions, filteredQuestions, surveyQuestions = [];

    allQuestions = [this.props.defaultQuestion[0], ...this.props.customQuestions]

    filteredQuestions = allQuestions.filter(question => {
        return (this.state.selectedQuestions.indexOf(question._id) > -1)
    })

    filteredQuestions.map((question, index) => {
        surveyQuestions.push(
            {   question_number: index,
                question: question.question,
                answers: question.answers,
                hints: question.hints
            }
        )
    })

    return surveyQuestions

};