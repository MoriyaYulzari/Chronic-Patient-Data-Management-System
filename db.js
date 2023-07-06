const mongoose = require('mongoose'); // Importing Mongoose module

// MongoDB connection URI
uri = "mongodb+srv://4499moria:44Moriya@moriya.iyrgnob.mongodb.net/Final_Pro?retryWrites=true&w=majority";

mongoose.connect(uri, 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// Defining the patient schema
const patientSchema  = new mongoose.Schema({
    ID: String,
    firstname: String,
    lastname: String,
    birthdate: Date,
    medicalCondition: [String]
});

// Creating the Patient model
const Patient = mongoose.model('patients', patientSchema );

// Exporting the Patient model
module.exports = Patient;