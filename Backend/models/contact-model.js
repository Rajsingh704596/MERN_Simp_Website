const { Schema, model } = require("mongoose");

// here schema create for contact form
const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

// create model (collection name in db)
const Contact = new model("Contact", contactSchema);

module.exports = Contact;
