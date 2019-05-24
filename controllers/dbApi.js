const hp = require("../utils/helper")

const find = (findObj, db) => {
    const { find, fields, sort, pop="" } = findObj
    return db.find(find, fields)
    .sort(sort)
    .populate(pop)
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "mongoDB error")
    )
};

const findById = (id, findObj, db) => {
    const { fields, sort, pop="" } = findObj
    return  db.findById(id, fields)
    .sort(sort)
    .populate(pop)
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "mongoDB error")
    )
};

const findOne = (findObj, db) => {
    const { find, fields, sort, pop="" } = findObj
    return db.findOne(find, fields)
    .sort(sort)
    .populate(pop)
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "mongoDB error")
    )
};

const create = (infoObj, db) => { 
    let n_w = new db(infoObj)
    return n_w.save()
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "mongoDB error")
    )
};


const updateVal = (update, db) => {
    const {idObj, updObj} = update
    const opts = {runValidators: true};
    return db.findOneAndUpdate(idObj, updObj, opts)
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "mongoDB error")
    )
};

const update = (update, db) => {
    const {idObj, updObj, filterObj } = update
    return db.findOneAndUpdate(idObj, updObj, filterObj)
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "mongoDB error")
    )
};

const del_te = (id, db) => {
    return db.findByIdAndRemove(id)
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "mongoDB error")
    )
};

module.exports = {
    find,
    findById,
    findOne,
    updateVal,
    update,
    create,
    del_te
};