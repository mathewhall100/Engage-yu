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

];


// Provider collection seeds
const providerSeed = [

];

// Provider group collection seeds
const provider_groupSeed = [

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

// Patient-info collection seeds
const patient_infoSeed = [
 
];

// Patient-data collection seeds
const patient_dataSeed = [
 
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
    process.exit
    