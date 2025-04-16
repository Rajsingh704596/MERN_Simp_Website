// create schema for services collection/model
const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  provider: { type: String, required: true },
});

const Service = new model("Service", serviceSchema); // here collection name in singular form (Note - we already create services collection in db)

module.exports = Service;
