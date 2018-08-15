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
];


// Provider collection seeds
const providerSeed = [
  { 
    date_added: new Date(),
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


// Question_deafult collection seeds
const question_defaultSeed = [
  {
      question: "Are you currently?",
      answers: ["on",  "off", "on", "non-troubling dyskinesia", "on, troubling dyskinesia", "asleep" ]
  }
];

// Question_custom collection seeds
const question_customSeed = [
  {
      date_added: new Date(),
      added_by: "5b733f4b0ee1d97e749c2a28",
      question: "Do you have tremor??",
      answers: ["no", "yes, non-troubling", "yes, troubling", "yes, disabling", "asleep" ],
  }
];

// Active collection seeds
const activeSeed = [
  { 
    firstname: "Sundance",
    lastname: "Kid",
    hospital_id: "H3453736",
    patient_id: "5b7311026b0e10f62ca85be5",
    episode_id: "5b7311526b0e10f62ca85be8",
    requesting_provider_firstname: "John",
    requesting_provider_lastname: "Heyworth",
    requesting_provider_id: "55b722e30a78fe511a9bf7dd8",
    primary_provider_firstname: "John",
    primary_provider_lastname: "Heyworth",
    primary_provider_id: "5b722e30a78fe511a9bf7dd9",
    start_date: new Date(),
    start_time: "0800",
    end_date: new Date(),
    end_time: "1400",
    last_entry: new Date()
  }
];


// Patient collection seeds
const patientSeed = [
  {
    date_enrolled: new Date(),
    enrolled_by: "55b722e30a78fe511a9bf7dd8",
    status: "active",

    patient_details: {
        hospital_id: "H123456",
        firstname: "sundance",
        lastname: "kid",
        dob: "07-23-1978",
        email: "sunny@theranch.com",
        phone: "216-376-2314"
    },

    primary_provider: "55b722e30a78fe511a9bf7dd8",

    episode: [{
        episode_number: 1,
        start_date: new Date(),
        num_days: 3,
        end_date: new Date(),
        requesting_provider: "55b722e30a78fe511a9bf7dd8",
        report_to: [
            "55b722e30a78fe511a9bf7dd8"
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
    }]
  }
];




// Insert seed data into the respective collections
// ***Commented out so that provider ids don't change when reseeding***

// db.Provider
//   .remove({})
//   .then(() => db.Provider.collection.insertMany(providerSeed))
//     .then(data => {
//       console.log(data.insertedCount + " provider collection documents inserted!");
//   });

// db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//     .then(data =>{
//       console.log(data.insertedCount + " user collection documents inserted!");
//     })

// db.Patient
//    .remove({})
//    .then(() => db.Patient.collection.insertMany(patientSeed))
//       .then(data => {
//        console.log(data.insertedCount + " patient collection documents inserted!");
//    })

// db.Active
//   .remove({})
//   .then(() => db.Active.collection.insertMany(activeSeed))
//     .then(data => {
//       console.log(data.insertedCount + " active collection documents inserted!");
//   })

db.Question_default
  .remove({})
  .then(() => db.Question_default.collection.insertMany(question_defaultSeed))
     .then(data => {
      console.log(JSON.stringify(data.insertedCount, null, 2) + " question_default collection documents inserted!")
  })

  db.Question_custom
  .remove({})
  .then(() => db.Question_custom.collection.insertMany(question_customSeed))
     .then(data => {
      console.log(JSON.stringify(data.insertedCount, null, 2) + " question_custom collection documents inserted!")
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

