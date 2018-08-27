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
    sub: "google1",
    role: "provider",
    id: "objId1"
  },
  {
    sub: "google2",
    role: "provider",
    id: "objId2"
  }
];


// Provider collection seeds
const providerSeed = [
  { 
    date_added: new Date(),
    firstname: "John", 
    lastname: "Heyworth" ,
    provider_group_ref: "5b733f4b0ee1d97e749c2a29",
    provider_group_id: "5b733f4b0ee1d97e749c2a29", 
    provider_group_name: "The practice",

    role: "Physician (specialist)",

    office: {address1: "Beachwood medical practice", address2: "Beachwood", state: "Ohio", zip: "44139" },
    email: "john.heworth@doctor.com",
    phone: { phone1: {phone: "office", number: "216-395-2345", ext: 123} },
  },
  {
    date_added: new Date(),
    firstname: "melanie", 
    lastname: "Kopff" ,
    provider_group_ref: "5b733f4b0ee1d97e749c2a28",
    provider_group_id: "5b733f4b0ee1d97e749c2a28", 
    provider_group_name: "The clinic",

    role: "Physician (specialist)",

    office: {address1: "Solon medical practice", address2: "solon", state: "Ohio", zip: "44139" },
    email: "jmelanie.kopff@doctor.com",
    phone: { phone1: {phone: "office", number: "216-395-4569", ext: 123} },
 },
];

// Provider group collection seeds
const provider_groupSeed = [
  { 
    added_by_ref: "5b733f4b0ee1d97e749c2a29",
    added_by_id: "5b733f4b0ee1d97e749c2a29",
    added_by_name: "john heyworth",
    group_name: "The Cleveland Practice"
  },
  {
    added_by_ref: "5b733f4b0ee1d97e749c2a28",
    added_by_id: "5b733f4b0ee1d97e749c2a28",
    added_by_name: "melanie kopff",
    group_name: "The Clinic Practice"
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
    patient_info_ref: "objId",
    patient_info_id: "objId3",
    firstname: "Sundance",
    lastname: "Kid",
    hospital_id: "H3453736",
    patient_data_ref: "objId1",
    patient_data_id: "objId1",
    episode_number: "1",
    episode_id: "5b7311526b0e10f62ca85be8",

    requesting_provider_ref: "55b722e30a78fe511a9bf7dd8",
    requesting_provider_id: "55b722e30a78fe511a9bf7dd8",
    requesting_provider_firstname: "John",
    requesting_provider_lastname: "Heyworth",
    
    primary_provider_ref: "55b722e30a78fe511a9bf7dd8",
    primary_provider_id: "5b722e30a78fe511a9bf7dd9",
    primary_provider_firstname: "John",
    primary_provider_lastname: "Heyworth",
    
    provider_group_ref: "groupid", 
    provider_group_id: "groupid", 
    provider_group_name: "The Cleveland Practice",
   
    start_date: new Date(),
    start_time: "0800",
    end_date: new Date(),
    end_time: "1400",
    last_entry: new Date(),
    num_entries: 0,

    status: "pending",
  }
];


// Patient-data collection seeds
const patient_dataSeed = [
  {
    patient_info_id: "obgectid1",

    episodes: [{
      episode_number: 1,
      requesting_provider_ref: "5b722e30a78fe511a9bf7dd8" , 
      requesting_provider_id: "5b722e30a78fe511a9bf7dd8" , 
      requesting_provider_lastname: "melanie",
      requesting_provider_firstname: "jkopff", 

      start_date: new Date(),
      end_date: new Date(),             
      num_days: 3,
      start_time: "1000",
      end_time: "1400",
      interval_mins: 35,
      margin_mins: 15,
  
      num_questions: 5,
      questions: ["on", "off", "on, non-troubling dyskinesia", "on, troubling dyskinesia", "asleep"],

      expected_num_records: 15,

      remind_sataus: 'on',
      
      report_to: [ "5b722e30a78fe511a9bf7dd8" ],  

    }]
  },
  {
    patient_info_id: "obgectid2",

    episodes: [{
      episode_number: 1,
      requesting_provider_ref: "5b722e30a78fe511a9bf7dd8" , 
      requesting_provider_id: "5b722e30a78fe511a9bf7dd8" , 
      requesting_provider_lastname: "melanie",
      requesting_provider_firstname: "jkopff", 

      start_date: new Date(),
      end_date: new Date(),             
      num_days: 3,
      start_time: "1000",
      end_time: "1400",
      interval_mins: 35,
      margin_mins: 15,
  
      num_questions: 5,
      questions: ["on", "off", "on, non-troubling dyskinesia", "on, troubling dyskinesia", "asleep"],

      expected_num_records: 15,

      remind_sataus: 'on',
      
      report_to: [ "5b722e30a78fe511a9bf7dd8" ],

    }]
  }
];

// Patient-info collection seeds
const patient_infoSeed = [
  {
    
    date_enrolled: new Date(),
    enrolled_by_ref: "55b722e30a78fe511a9bf7dd8",
    enrolled_by_id: "55b722e30a78fe511a9bf7dd8",
    enrolled_by_name: "melanie kopff",

    patient_data_ref: "obgectid1",
    patient_data_id: "objectid1",
    status: "active",

    hospital_id: "H123456",
    firstname: "sundance",
    lastname: "kid",
    dob: "07-23-1978",
    email: "sunny2@theranch.com",
    phone: "216-376-2314",

    primary_provider_ref: "55b722e30a78fe511a9bf7dd8",
    primary_provider_id: "providerid1",
    primary_provider_name: "John heyworth",

    primary_group_ref: "groupid1",
    provider_group_id: "groupid1",
    provider_group_name: "the cleveland practice"

  },
  {
    
    date_enrolled: new Date(),
    enrolled_by_ref: "55b722e30a78fe511a9bf7dd8",
    enrolled_by_id: "55b722e30a78fe511a9bf7dd8",
    enrolled_by_name: "melanie kopff",

    patient_data_ref: "obgectid2",
    patient_data_id: "objectid2",
    status: "active",

    hospital_id: "H123457",
    firstname: "butch",
    lastname: "cassidy",
    dob: "07-23-1779",
    email: "butch2@theranch.com",
    phone: "216-376-2874",

    primary_provider_ref: "55b722e30a78fe511a9bf7dd8",
    primary_provider_id: "providerid1",
    primary_provider_name: "John heyworth",

    primary_group_ref: "groupid1",
    provider_group_id: "groupid1",
    provider_group_name: "the cleveland practice"

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

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
    .then(data =>{
      console.log(data.insertedCount + " user collection documents inserted!");
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

