const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// Database name = 'medmonccfdb'
// This file empties the respective collections and inserts the seed data below
// Run via command line with 'node scripts/seedDB.js'
// Will exit back to command line once seed script run (WITHOUT running application)


// Connect to the Mongo DB 'medmonccfdb'
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/medmonccfdb", { useNewUrlParser: true })
  .then(
    (res) => {
     console.log("Connected to Database 'medmonccfdb' Successfully.")
    }
  ).catch(() => {
    console.log("Conntection to database failed.");
  });;

// User collection seeds
const userSeed = [
    {
      username: "john",
      password: "$2a$10$SAvF6U2.nGRTGYe2uIpvYuQW30ZDRz0uofxy3exuYNUYr8GssEri2",
      role: "Admin",
      email: "john.heworth@doctor.com",
      patient_id: "n/a",
      doctor_id: "johnID"
    },
    {
      username: "melanie",
      password: "$2a$10$3srPp78Me/7mKZa9DSxReOnyYSTi2l7gsvVhCfjmRiDDXfUeqIsfO",
      role: "Admin",
      email: "mel.kopffh@doctor.com",
      patient_id: "n/a",
      doctor_id: "melanieID"
    }
  ]


// Provider collection seeds
const providerSeed = [

  { date_added: new Date(),
    name: { first: "John", last: "Heyworth" },
    id_number: "id12233",
    role: "Physician (specialist)",
    office: {address1: "Beachwood medical practice", address2: "Beachwood", state: "Ohio", zip: "44139" },
    email: "john.heworth@doctor.com",
    phone: "216-395-2345"
  },

  {
    date_added: new Date(),
    name: { first: "melanie", last: "kopff" },
    id_number: "id09876",
    role: "Physician (primary care)",
    office: { address1: "Park Road East medical centre", address2: "Solon", state: "Ohio", zip: "44139" },
    email: "mel.kopff@doctor.com",
    phone: "216-786-2845"
 },

];


// Question collection seeds
const questionSeed = [
    
    { default: { question: "on" } },
    { default: { question: "off" } },
    { default: { question: "on, non-troubling dyskinesia" } },
    { default: { question: "on, troubling dyskinesia" } }

];


// Patient collection seeds
const patientSeed = [
  {
    date_created: new Date(),
    enrolled_by: "5b6b5b1c09cd09292030ba4c",
    status: "error????",

    patient_details: {
        hospital_id: "H123456",
        firstname: "sundance",
        lastname: "kid",
        dob: "07-23-1978",
        email: "sunny@theranch.com",
        phone: "216-376-2314"
    },

    primary_provider: "5b6b5b1c09cd09292030ba4c",

    next_appointment: {
        date: new Date(),
        comments: "Be sure to attend",
        provider: "5b6b5b1c09cd09292030ba4c",
    },

    episode: {
        episode_number: 1,
        start_date: new Date(),
        num_days: 3,
        end_date: new Date(),
        requesting_provider: "5b6b5b1c09cd09292030ba4c",
        report_to: [
            "5b6b5b1c09cd09292030ba4c"
        ],
        num_questions: 4,
        questions: [
            "on", "off", "on, non-troubling dyskinesia", "on, troubling dyskinesia", "asleep"
        ],
        timeframe: {
            start_time: "0800",
            end_time: "1200",
            interval_mins: 30,
            margin_mins: 15
        },
        remind: {
            remind: "on",
            mins_before: 10,
        },
        expected_num_records: 15,
        record: [{
            record_number: 1,
            day: 1,
            time: "0800",
            scheduled_datetime: new Date(),
            record_valid: true,
            medication_adherance: "yes",
            actual_datetime: new Date(),
            data: [ 1, 0, 0, 0, 0 ],
            patient_comments: ""

        }]
    }
  }
];




// Insert seed data into the respective collections

db.Provider
  .remove({})
  .then(() => db.Provider.collection.insertMany(providerSeed))
    .then(data => {
      console.log(data.insertedCount + " provider records inserted!");
  });

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
    .then(data =>{
      console.log(data.insertedCount + " user records inserted!");
    })

db.Patient
   .remove({})
   .then(() => db.Patient.collection.insertMany(patientSeed))
      .then(data => {
       console.log(data.insertedCount + " patient records inserted!");
   })

db.Question
  .remove({})
  .then(() => db.Question.collection.insertMany(questionSeed))
     .then(data => {
      console.log(JSON.stringify(data.insertedCount, null, 2) + " question records inserted!")
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

