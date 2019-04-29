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
    process.exit
    
    
    
    {
      "_id" : ObjectId("5b844944d8dc5ce848cd28a0"),
      "patient_info_id" : "5b844945d8dc5ce848cd28a3",
      "patient_info_ref" : ObjectId("5b844945d8dc5ce848cd28a3"),
      "episodes" : [ 
          {
              "date_requested" : ISODate("2018-09-17T09:02:35.514-04:00"),
              "requesting_provider" : {
                  "ref" : ObjectId("5b8466bbf6d8b1d2fc8d45b1"),
                  "id" : "5b8466bbf6d8b1d2fc8d45b1",
                  "title" : "rn",
                  "firstname" : "john",
                  "lastname" : "smith",
                  "role" : "nurse(registered)"
              },
              "margin_mins" : 15,
              "remind_status" : "on",
              "remind_mins_before" : 5,
              "status" : "actioned",
              "report_to" : [],
              "_id" : ObjectId("5b9fa5eb72220625a02aa622"),
              "episode_number" : 0,
              "start_date" : ISODate("2019-03-11T00:00:00.508-04:00"),
              "end_date" : ISODate("2019-03-13T00:00:00.508-04:00"),
              "num_days" : 3,
              "start_time" : "1500",
              "end_time" : "1800",
              "interval_mins" : 60,
              "questions" : [ 
                  {
                      "answers" : [ 
                          "on", 
                          "on, non-troubling dyskinesia", 
                          "on, troubling dyskinesia", 
                          "off", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5b9fa5eb72220625a02aa623"),
                      "question" : "Are you currently?"
                  }
              ],
              "records" : [ 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa638"),
                      "record_number" : 0,
                      "day" : 0,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2018-09-17T20:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  0, 
                                  0, 
                                  1, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa637"),
                      "record_number" : 1,
                      "day" : 0,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2018-09-17T21:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  0, 
                                  0, 
                                  1, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa636"),
                      "record_number" : 2,
                      "day" : 0,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2018-09-17T22:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa635"),
                      "record_number" : 3,
                      "day" : 0,
                      "time" : "1900",
                      "scheduled_datetime" : ISODate("2018-09-17T23:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa638"),
                      "record_number" : 0,
                      "day" : 1,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2018-09-17T20:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  0, 
                                  0, 
                                  1, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa637"),
                      "record_number" : 1,
                      "day" : 1,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2018-09-17T21:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  0, 
                                  0, 
                                  1, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa636"),
                      "record_number" : 2,
                      "day" : 1,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2018-09-17T22:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa635"),
                      "record_number" : 3,
                      "day" : 1,
                      "time" : "1900",
                      "scheduled_datetime" : ISODate("2018-09-17T23:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa638"),
                      "record_number" : 0,
                      "day" : 2,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2018-09-17T20:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  0, 
                                  0, 
                                  1, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa637"),
                      "record_number" : 1,
                      "day" : 2,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2018-09-17T21:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  0, 
                                  0, 
                                  1, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa636"),
                      "record_number" : 2,
                      "day" : 2,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2018-09-17T22:00:00.508-04:00")
                  }, 
                  {
                      "valid" : true,
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "late" : false,
                      "_id" : ObjectId("5b9fa5eb72220625a02aa635"),
                      "record_number" : 3,
                      "day" : 2,
                      "time" : "1900",
                      "scheduled_datetime" : ISODate("2018-09-17T23:00:00.508-04:00")
                  }
              ]
          }, 
          {
              "date_requested" : ISODate("2018-09-17T15:51:20.140-04:00"),
              "margin_mins" : 15,
              "remind_status" : "on",
              "remind_mins_before" : 5,
              "status" : "awaiting review",
              "report_to" : [],
              "_id" : ObjectId("5ba005b8c231272a38b29939"),
              "questions" : [ 
                  {
                      "answers" : [ 
                          "on", 
                          "on, non-troubling dyskinesia", 
                          "on, troubling dyskinesia", 
                          "off", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5ba005b8c231272a38b2993c"),
                      "question_number" : 0,
                      "question" : "Are you currently?"
                  }, 
                  {
                      "answers" : [ 
                          "yes", 
                          "no", 
                          "yes, a while ago", 
                          "yes, only just now", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5ba005b8c231272a38b2993b"),
                      "question_number" : 1,
                      "question" : "Have your last meds kicked in yet?"
                  }, 
                  {
                      "answers" : [ 
                          "no", 
                          "yes, mild", 
                          "yes, troubling", 
                          "yes, severe", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5ba005b8c231272a38b2993a"),
                      "question_number" : 2,
                      "question" : "How is your tremor?"
                  }
              ],
              "messages" : [ 
                  {
                      "msg_date" : ISODate("2019-03-13T13:01:00.421-04:00"),
                      "_id" : ObjectId("5c89374c7cc31420a848170b"),
                      "sender_role" : "provider",
                      "sender_ref" : ObjectId("5b844946d8dc5ce848cd28a4"),
                      "sender_id" : "5b844946d8dc5ce848cd28a4",
                      "sender_firstname" : "John",
                      "sender_lastname" : "Heyworth",
                      "msg_title" : "hello",
                      "msg_body" : "hello"
                  }, 
                  {
                      "msg_date" : ISODate("2019-03-13T13:09:57.392-04:00"),
                      "_id" : ObjectId("5c89396540ee8819e4d5ac1b"),
                      "sender_role" : "provider",
                      "sender_ref" : ObjectId("5b844946d8dc5ce848cd28a4"),
                      "sender_id" : "5b844946d8dc5ce848cd28a4",
                      "sender_firstname" : "John",
                      "sender_lastname" : "Heyworth",
                      "msg_title" : "hello",
                      "msg_body" : "hellohello"
                  }
              ],
              "records" : [ 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29951"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481764"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481763"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481762"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 0,
                      "day" : 0,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2018-09-18T12:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29950"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481760"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848175f"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848175e"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 1,
                      "day" : 0,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2018-09-18T13:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b2994f"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848175c"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848175b"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848175a"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 2,
                      "day" : 0,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2018-09-18T14:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b2994e"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481758"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481757"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481756"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 3,
                      "day" : 0,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2018-09-18T15:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : true,
                      "_id" : ObjectId("5ba005b8c231272a38b2994d"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481754"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481753"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481752"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 4,
                      "day" : 0,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2018-09-18T16:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : true,
                      "_id" : ObjectId("5ba005b8c231272a38b2994c"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481750"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848174f"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848174e"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 5,
                      "day" : 0,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2018-09-18T17:00:00.000-04:00")
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b2994b"),
                      "data" : [],
                      "record_number" : 6,
                      "day" : 0,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2018-09-18T18:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b2994a"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481748"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481747"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481746"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 7,
                      "day" : 1,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2018-09-19T12:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29949"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481744"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481743"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481742"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 8,
                      "day" : 1,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2018-09-19T13:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29948"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481740"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848173f"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848173e"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 9,
                      "day" : 1,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2018-09-19T14:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29947"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848173c"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848173b"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848173a"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 10,
                      "day" : 1,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2018-09-19T15:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29946"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481738"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  false, 
                                  true, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481737"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  false, 
                                  true, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481736"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 11,
                      "day" : 1,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2018-09-19T16:00:00.000-04:00")
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29945"),
                      "data" : [],
                      "record_number" : 12,
                      "day" : 1,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2018-09-19T17:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29944"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481730"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848172f"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848172e"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 13,
                      "day" : 1,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2018-09-19T18:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29943"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848172c"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848172b"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848172a"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 14,
                      "day" : 2,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2018-09-20T12:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29942"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481728"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481727"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481726"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 15,
                      "day" : 2,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2018-09-20T13:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29941"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481724"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481723"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481722"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 16,
                      "day" : 2,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2018-09-20T14:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b29940"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481720"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848171f"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848171e"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 17,
                      "day" : 2,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2018-09-20T15:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b2993f"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848171c"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848171b"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a848171a"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 18,
                      "day" : 2,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2018-09-20T16:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b2993e"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481718"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481717"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481716"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 19,
                      "day" : 2,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2018-09-20T17:00:00.000-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5ba005b8c231272a38b2993d"),
                      "data" : [ 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481714"),
                              "question_number" : 0
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481713"),
                              "question_number" : 1
                          }, 
                          {
                              "question_answers" : [ 
                                  true, 
                                  false, 
                                  false, 
                                  false, 
                                  false
                              ],
                              "_id" : ObjectId("5c89374d7cc31420a8481712"),
                              "question_number" : 2
                          }
                      ],
                      "record_number" : 20,
                      "day" : 2,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2018-09-20T18:00:00.000-04:00")
                  }
              ],
              "episode_number" : 2,
              "requesting_provider" : {
                  "ref" : ObjectId("5b844946d8dc5ce848cd28a4"),
                  "id" : "5b844946d8dc5ce848cd28a4",
                  "title" : "dr",
                  "firstname" : "john",
                  "lastname" : "heyworth",
                  "role" : "physician {primary care}"
              },
              "start_date" : ISODate("2018-10-08T00:00:00.000-04:00"),
              "end_date" : ISODate("2018-10-11T00:00:00.000-04:00"),
              "num_days" : 3,
              "start_time" : "1200",
              "end_time" : "1800",
              "interval_mins" : 60
          }, 
          {
              "date_requested" : ISODate("2019-03-13T13:14:26.154-04:00"),
              "margin_mins" : 15,
              "remind_status" : "on",
              "remind_mins_before" : 5,
              "status" : "active",
              "report_to" : [],
              "_id" : ObjectId("5c893a72502b1244d48145fb"),
              "episode_number" : 3,
              "requesting_provider" : {
                  "ref" : ObjectId("5b8466bbf6d8b1d2fc8d45b1"),
                  "id" : "5b8466bbf6d8b1d2fc8d45b1",
                  "title" : "rn",
                  "firstname" : "john",
                  "lastname" : "smith",
                  "role" : "nurse(registered)"
              },
              "start_date" : ISODate("2019-03-17T00:00:00.153-04:00"),
              "end_date" : ISODate("2019-03-19T00:00:00.153-04:00"),
              "num_days" : 3,
              "start_time" : "1200",
              "end_time" : "1600",
              "interval_mins" : 60,
              "questions" : [ 
                  {
                      "answers" : [ 
                          "yes", 
                          "no", 
                          "yes, a while ago", 
                          "yes, only just now", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c893a72502b1244d48145ff"),
                      "question_number" : 0,
                      "question" : "Have your last meds kicked in yet?"
                  }, 
                  {
                      "answers" : [ 
                          "no", 
                          "yes, mild", 
                          "yes, troubling", 
                          "yes, severe", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c893a72502b1244d48145fe"),
                      "question_number" : 1,
                      "question" : "How is your tremor?"
                  }, 
                  {
                      "answers" : [ 
                          "good", 
                          "ya little slow", 
                          "slow", 
                          "frozen", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c893a72502b1244d48145fd"),
                      "question_number" : 2,
                      "question" : "How is your walking?"
                  }, 
                  {
                      "answers" : [ 
                          "no", 
                          "yes, mild", 
                          "yes, troubling", 
                          "yes, severe", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c893a72502b1244d48145fc"),
                      "question_number" : 3,
                      "question" : "Do you have any nausea or vomiting?"
                  }
              ],
              "records" : [ 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d481460e"),
                      "record_number" : 0,
                      "day" : 0,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2019-03-14T12:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d481460d"),
                      "record_number" : 1,
                      "day" : 0,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-14T13:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d481460c"),
                      "record_number" : 2,
                      "day" : 0,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-14T14:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d481460b"),
                      "record_number" : 3,
                      "day" : 0,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-14T15:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d481460a"),
                      "record_number" : 4,
                      "day" : 0,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-14T16:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814609"),
                      "record_number" : 5,
                      "day" : 1,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2019-03-15T12:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814608"),
                      "record_number" : 6,
                      "day" : 1,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-15T13:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814607"),
                      "record_number" : 7,
                      "day" : 1,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-15T14:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814606"),
                      "record_number" : 8,
                      "day" : 1,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-15T15:00:00.153-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814605"),
                      "record_number" : 9,
                      "day" : 1,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-15T16:00:00.153-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814604"),
                      "record_number" : 10,
                      "day" : 2,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2019-03-16T12:00:00.153-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814603"),
                      "record_number" : 11,
                      "day" : 2,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-16T13:00:00.153-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814602"),
                      "record_number" : 12,
                      "day" : 2,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-16T14:00:00.153-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814601"),
                      "record_number" : 13,
                      "day" : 2,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-16T15:00:00.153-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a72502b1244d4814600"),
                      "record_number" : 14,
                      "day" : 2,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-16T16:00:00.153-04:00"),
                      "data" : []
                  }
              ],
              "messages" : []
          }, 
          {
              "date_requested" : ISODate("2019-03-13T13:14:31.365-04:00"),
              "margin_mins" : 15,
              "remind_status" : "on",
              "remind_mins_before" : 5,
              "status" : "archived",
              "report_to" : [],
              "_id" : ObjectId("5c893a77502b1244d481460f"),
              "episode_number" : 4,
              "requesting_provider" : {
                  "ref" : ObjectId("5b844946d8dc5ce848cd28a4"),
                  "id" : "5b844946d8dc5ce848cd28a4",
                  "title" : "dr",
                  "firstname" : "john",
                  "lastname" : "heyworth",
                  "role" : "physician {primary care}"
              },
              "start_date" : ISODate("2019-03-10T13:14:31.365-04:00"),
              "end_date" : ISODate("2019-03-12T13:14:31.365-04:00"),
              "num_days" : 3,
              "start_time" : "0800",
              "end_time" : "1100",
              "interval_mins" : 60,
              "questions" : [ 
                  {
                      "answers" : [ 
                          "yes", 
                          "no", 
                          "yes, a while ago", 
                          "yes, only just now", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c893a77502b1244d4814613"),
                      "question_number" : 0,
                      "question" : "Have your last meds kicked in yet?"
                  }, 
                  {
                      "answers" : [ 
                          "no", 
                          "yes, mild", 
                          "yes, troubling", 
                          "yes, severe", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c893a77502b1244d4814612"),
                      "question_number" : 1,
                      "question" : "How is your tremor?"
                  }
              ],
              "records" : [ 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814622"),
                      "record_number" : 0,
                      "day" : 0,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2019-03-14T12:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814621"),
                      "record_number" : 1,
                      "day" : 0,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-14T13:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814620"),
                      "record_number" : 2,
                      "day" : 0,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-14T14:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d481461f"),
                      "record_number" : 3,
                      "day" : 0,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-14T15:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d481461e"),
                      "record_number" : 4,
                      "day" : 0,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-14T16:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d481461d"),
                      "record_number" : 5,
                      "day" : 1,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2019-03-15T12:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d481461c"),
                      "record_number" : 6,
                      "day" : 1,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-15T13:00:00.365-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d481461b"),
                      "record_number" : 7,
                      "day" : 1,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-15T14:00:00.365-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d481461a"),
                      "record_number" : 8,
                      "day" : 1,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-15T15:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814619"),
                      "record_number" : 9,
                      "day" : 1,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-15T16:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814618"),
                      "record_number" : 10,
                      "day" : 2,
                      "time" : "1200",
                      "scheduled_datetime" : ISODate("2019-03-16T12:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : false,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814617"),
                      "record_number" : 11,
                      "day" : 2,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-16T13:00:00.365-04:00"),
                      "data" : []
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814616"),
                      "record_number" : 12,
                      "day" : 2,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-16T14:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814615"),
                      "record_number" : 13,
                      "day" : 2,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-16T15:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893a77502b1244d4814614"),
                      "record_number" : 14,
                      "day" : 2,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-16T16:00:00.365-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }
              ],
              "messages" : []
          }, 
          {
              "date_requested" : ISODate("2019-03-13T13:18:04.507-04:00"),
              "margin_mins" : 15,
              "remind_status" : "on",
              "remind_mins_before" : 5,
              "status" : "awaiting review",
              "report_to" : [],
              "_id" : ObjectId("5c893b4c502b1244d4814623"),
              "questions" : [ 
                  {
                      "answers" : [ 
                          "no", 
                          "yes, mild", 
                          "yes, troubling", 
                          "yes, severe", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c893b4c502b1244d4814627"),
                      "question_number" : 0,
                      "question" : "How is your tremor?"
                  }
              ],
              "messages" : [ 
                  {
                      "msg_date" : ISODate("2019-03-13T13:18:22.881-04:00"),
                      "_id" : ObjectId("5c893b5f502b1244d4814634"),
                      "sender_role" : "provider",
                      "sender_ref" : ObjectId("5b844946d8dc5ce848cd28a4"),
                      "sender_id" : "5b844946d8dc5ce848cd28a4",
                      "sender_firstname" : "John",
                      "sender_lastname" : "Heyworth",
                      "msg_title" : "this is the last episode",
                      "msg_body" : "last episode"
                  }
              ],
              "records" : [ 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d4814633"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 0,
                      "day" : 0,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-14T13:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d4814632"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 1,
                      "day" : 0,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-14T14:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d4814631"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 2,
                      "day" : 0,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-14T15:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d4814630"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 3,
                      "day" : 0,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-14T16:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d481462f"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 4,
                      "day" : 1,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-15T13:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d481462e"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 5,
                      "day" : 1,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-15T14:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d481462d"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 6,
                      "day" : 1,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-15T15:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d481462c"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 7,
                      "day" : 1,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-15T16:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d481462b"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 8,
                      "day" : 2,
                      "time" : "1300",
                      "scheduled_datetime" : ISODate("2019-03-16T13:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d481462a"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 9,
                      "day" : 2,
                      "time" : "1400",
                      "scheduled_datetime" : ISODate("2019-03-16T14:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d4814629"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 10,
                      "day" : 2,
                      "time" : "1500",
                      "scheduled_datetime" : ISODate("2019-03-16T15:00:00.506-04:00")
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c893b4c502b1244d4814628"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ],
                      "record_number" : 11,
                      "day" : 2,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-16T16:00:00.506-04:00")
                  }
              ],
              "episode_number" : 5,
              "requesting_provider" : {
                  "ref" : ObjectId("5b844946d8dc5ce848cd28a4"),
                  "id" : "5b844946d8dc5ce848cd28a4",
                  "title" : "dr",
                  "firstname" : "john",
                  "lastname" : "heyworth",
                  "role" : "physician {primary care}"
              },
              "start_date" : ISODate("2019-03-08T00:00:00.506-04:00"),
              "end_date" : ISODate("2019-03-11T00:00:00.506-04:00"),
              "num_days" : 3,
              "start_time" : "1300",
              "end_time" : "1600",
              "interval_mins" : 60
          }, 
          {
              "date_requested" : ISODate("2019-03-14T00:46:14.352-04:00"),
              "margin_mins" : 15,
              "remind_status" : "on",
              "remind_mins_before" : 5,
              "status" : "archived",
              "report_to" : [],
              "_id" : ObjectId("5c89dc966bbf7f12ccdbd180"),
              "episode_number" : 6,
              "requesting_provider" : {
                  "ref" : ObjectId("5b844946d8dc5ce848cd28a4"),
                  "id" : "5b844946d8dc5ce848cd28a4",
                  "title" : "dr",
                  "firstname" : "john",
                  "lastname" : "heyworth",
                  "role" : "physician {primary care}"
              },
              "start_date" : ISODate("2019-03-01T00:46:14.349-04:00"),
              "end_date" : ISODate("2019-03-03T00:46:14.349-04:00"),
              "num_days" : 3,
              "start_time" : "1600",
              "end_time" : "1900",
              "interval_mins" : 60,
              "questions" : [ 
                  {
                      "answers" : [ 
                          "no", 
                          "yes, mild", 
                          "yes, troubling", 
                          "yes, severe", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd182"),
                      "question_number" : 0,
                      "question" : "How is your tremor?"
                  }, 
                  {
                      "answers" : [ 
                          "no", 
                          "yes, mild", 
                          "yes, troubling", 
                          "yes, severe", 
                          "asleep"
                      ],
                      "hints" : [],
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd181"),
                      "question_number" : 1,
                      "question" : "Do you have nausea or sickness?"
                  }
              ],
              "records" : [ 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd18e"),
                      "record_number" : 0,
                      "day" : 0,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-15T16:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd18d"),
                      "record_number" : 1,
                      "day" : 0,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2019-03-15T17:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd18c"),
                      "record_number" : 2,
                      "day" : 0,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2019-03-15T18:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd18b"),
                      "record_number" : 3,
                      "day" : 0,
                      "time" : "1900",
                      "scheduled_datetime" : ISODate("2019-03-15T19:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd18a"),
                      "record_number" : 4,
                      "day" : 1,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-16T16:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd189"),
                      "record_number" : 5,
                      "day" : 1,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2019-03-16T17:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd188"),
                      "record_number" : 6,
                      "day" : 1,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2019-03-16T18:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd187"),
                      "record_number" : 7,
                      "day" : 1,
                      "time" : "1900",
                      "scheduled_datetime" : ISODate("2019-03-16T19:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd186"),
                      "record_number" : 8,
                      "day" : 2,
                      "time" : "1600",
                      "scheduled_datetime" : ISODate("2019-03-17T16:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd185"),
                      "record_number" : 9,
                      "day" : 2,
                      "time" : "1700",
                      "scheduled_datetime" : ISODate("2019-03-17T17:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd184"),
                      "record_number" : 10,
                      "day" : 2,
                      "time" : "1800",
                      "scheduled_datetime" : ISODate("2019-03-17T18:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }, 
                  {
                      "valid" : true,
                      "late" : false,
                      "_id" : ObjectId("5c89dc966bbf7f12ccdbd183"),
                      "record_number" : 11,
                      "day" : 2,
                      "time" : "1900",
                      "scheduled_datetime" : ISODate("2019-03-17T19:00:00.349-04:00"),
                      "data" : [ 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }, 
                          {
                              "question_number" : 0,
                              "question_answers" : [ 
                                  1, 
                                  0, 
                                  0, 
                                  0, 
                                  0
                              ]
                          }
                      ]
                  }
              ],
              "messages" : []
          }
      ],
      "updated_at" : ISODate("2019-04-25T13:31:15.897-04:00")
  }(1);
  });

