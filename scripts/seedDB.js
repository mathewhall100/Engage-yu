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
const user_roleSeed = [
  {
    sub: "google1",
    role: "provider"
  },
  {
    sub: "google2",
    role: "provider"
  }
];


// Provider collection seeds
const providerSeed = [
  { 
    date_added: new Date(),
    sub: "google1",
    name: { first: "John", last: "Heyworth" },
    provider_group: "the clinic",
    provider_id: "id12233",
    role: "Physician (specialist)",
    office: {address1: "Beachwood medical practice", address2: "Beachwood", state: "Ohio", zip: "44139" },
    email: "john.heworth@doctor.com",
    phone: { phone1: {phone: "office", number: "216-395-2345", ext: 123} },
  },
  {
    date_added: new Date(),
    sub: "google2",
    name: { first: "melanie", last: "kopff" },
    provider_group: "the practice",
    provider_id: "id9375602",
    role: "Physician (primary care)",
    office: { address1: "Park Road East medical centre", address2: "Solon", state: "Ohio", zip: "44139" },
    email: "mel.kopff@doctor.com",
    phone: { phone1: {phone: "office", number: "216-395-2937", ext: 123} },
 },
];

// Provider collection seeds
const provider_groupSeed = [
  { 
    added_by: "5b733f4b0ee1d97e749c2a28",
    group_name: "The Cleveland Practice"
  },
  {
    added_by: "5b733f4b0ee1d97e749c2a28",
    group_name: "The Cleveland Office"
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
    sub: "google3",
    firstname: "Sundance",
    lastname: "Kid",
    hospital_id: "H3453736",
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
    last_entry: new Date(),
    num_entries: 1
  }
];


// Patient-data collection seeds
const patient_dataSeed = [
  {
    
    sub: "google3",

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
  },
  {
    
    sub: "google4",

    episode: [{
        episode_number: 1,
        start_date: new Date(),
        num_days: 4,
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

// Patient-data collection seeds
const patient_infoSeed = [
  {
    
    date_enrolled: new Date(),
    sub: "google3",
    enrolled_by: "55b722e30a78fe511a9bf7dd8",
    status: "active",

    patient_details: {
        hospital_id: "H123456",
        firstname: "sundance",
        lastname: "kid",
        dob: "07-23-1978",
        email: "sunny2@theranch.com",
        phone: "216-376-2314"
    },

    primary_provider: "55b722e30a78fe511a9bf7dd8",

  },
  {
    
    date_enrolled: new Date(),
    sub: "google4",
    enrolled_by: "55b722e30a78fe511a9bf7dd8",
    status: "active",

    patient_details: {
        hospital_id: "H123457",
        firstname: "sundance",
        lastname: "kid",
        dob: "07-23-1978",
        email: "sunny@theranch.com",
        phone: "216-376-2314"
    },

    primary_provider: "55b722e30a78fe511a9bf7dd8",

  }
];




// Insert seed data into the respective collections
// ***Commented out so that provider ids don't change when reseeding***

db.Provider
  .remove({})
  .then(() => db.Provider.collection.insertMany(providerSeed))
    .then(data => {
      console.log(data.insertedCount + " provider collection documents inserted!");
  });

db.Provider_group
.remove({})
.then(() => db.Provider_group.collection.insertMany(provider_groupSeed))
  .then(data => {
    console.log(data.insertedCount + " provider_group collection documents inserted!");
});

db.User_role
  .remove({})
  .then(() => db.User_role.collection.insertMany(user_roleSeed))
    .then(data =>{
      console.log(data.insertedCount + " user_role collection documents inserted!");
    })

db.Patient_info
   .remove({})
   .then(() => db.Patient_info.collection.insertMany(patient_infoSeed))
      .then(data => {
       console.log(data.insertedCount + " patient_info collection documents inserted!");
   })

db.Patient_data
.remove({})
.then(() => db.Patient_data.collection.insertMany(patient_dataSeed))
  .then(data => {
    console.log(data.insertedCount + " patient_data collection documents inserted!");
})

db.Active
  .remove({})
  .then(() => db.Active.collection.insertMany(activeSeed))
    .then(data => {
      console.log(data.insertedCount + " active collection documents inserted!");
  })

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

