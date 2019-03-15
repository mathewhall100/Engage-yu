
import { times } from 'lodash';

// **** Report Logic ****

export const complianceCalc = (data) => {
    let validCount = [];
    validCount = data.records.filter(record => record.valid).length
    return Math.round(validCount/data.records.length*100)
};


export const displayDataCalc = (records, numDays, numTimes, numQuestions, status) => {
    if (status === "pending") {
        return [ "data pending" ]
    }
    let timesArrayIn = [];
    let questionDataSum = [];
    let objArray = [];
    let timesArrayOut = [];
    
    times(numTimes, (i) => {
        timesArrayIn = records.filter(rec => rec.time === records[i].time)

        times(numQuestions, (j) => {
            questionDataSum = [0, 0, 0, 0, 0];

            times(numDays, (k) => {
                times(5, (l) => {
                    if (timesArrayIn[k].data.length > 0) {
                        questionDataSum[l] = questionDataSum[l] + timesArrayIn[k].data[j].question_answers[l] }
                })
            }) 
            objArray.push({
                question: j,
                answers: questionDataSum
                }) 
        })
        timesArrayOut.push({
            time: records[i].time,
            questions: objArray
        });
        objArray = [];
    })
    //console.log("TimesArrayOut: ", timesArrayOut)
    return timesArrayOut;
};

export const displayGraphCalc = (data, question) => {
    //console.log("graphdataIn: ", data)

    let array = [];
    data.map((d, index) => {

        array.push({
            time: `${d.time.slice(0, 2)}:${d.time.slice(-2)}`,
            ans1: d.questions[question].answers[0],
            ans2: d.questions[question].answers[1],
            ans3: d.questions[question].answers[2],
            ans4: d.questions[question].answers[3],
            ans5: d.questions[question].answers[4],
        })
    })
    //console.log("graphdataout: ", array)
    return array;
};