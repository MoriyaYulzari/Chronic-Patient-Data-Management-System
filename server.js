const Patient = require('./models/db'); // Importing the Patient model-db 
const express = require('express'); // Importing the express libarery
const sendImageForTagging = require('./models/checkimage'); // Importing the checkImage model
const checkIt = require('./models/chat'); // Importing the chat model
const fileUpload = require('express-fileupload'); // Importing the express-fileupload libarery
const path = require('path'); // Importing the path libarery

const app = express(); // Creating an instance of the express application
app.use(express.json()); // Adding middleware to parse JSON requests
app.set('view engine', 'ejs'); // Configuring the view engine to use EJS
app.set('views', path.join(__dirname, 'views/pages')); // Setting the views directory

app.use(fileUpload());  // Adding the file upload middleware
app.use(express.static('public')); // Serving static files from the 'public' directory

app.post('/upload', async (req, res) => {
  const { ID, firstname, lastname, birthdate, medicalCondition } = req.body; // Extracting request body parameters
  const image = req.files.image; // Extracting the uploaded image file

  try{
    try {
    // Check if the patient already exists in the database
    const existingPatient = await Patient.findOne({ ID });
    if (existingPatient) {
      res.send('This patient already exists. You are welcome to find them.');
    } else {
      // Validate the parameters
      const idRegex = /^\d{9}$/; // Regex pattern for 9-digit numbers
      const nameRegex = /^[A-Za-z]+$/; // Regex pattern for letters only

    if (!idRegex.test(ID)) {
      res.status(400).send('Invalid ID. Please provide a 9-digit number only.');
      return;
    }

    if (!nameRegex.test(firstname)) {
      res.status(400).send("Invalid patient's firstname. Please provide letters only.");
      return;
    }

    if (!nameRegex.test(lastname)) {
      res.status(400).send("Invalid patient's lastname. Please provide letters only.");
      return;
    }

    if (!Array.isArray(medicalCondition) || medicalCondition.length === 0) {
      res.status(400).send('Invalid medicalCondition. Please provide at least one condition in the form of an array.');
      return;
    }

    // Save the patient details to the database
    const patientData = {
      ID,
      firstname,
      lastname,
      birthdate,
      medicalCondition
      };
      const patient = new Patient(patientData);
      await patient.save();
    }
  } catch (error) {
    res.status(500).send('Error occurred while saving patient details.');
  }

// Performing image tagging on the uploaded image
  const imageName = 'public/images/' + image.name;
  await image.mv(imageName);
  const tags = await sendImageForTagging(imageName);

  if (tags && tags.length > 0) {

// Extract the top 10 high-score labels and confidence levels
    const topLabels = tags
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10)
    .map(({ tag: { en }, confidence }) => ({ label: en, confidence }));

    // Render the 'result' view and pass the top labels
    res.render('result', { tags: topLabels });
  } else {
    res.send('There is an error with tagging.');
      }
  } catch (error) {
        console.error('An error occurred while performing image tagging:', error);
  }
});

app.get('/readbyID', async (req, res) => {
  try {
    const patient = await Patient.findOne({ ID: req.query.ID }); /*Retrieves a patient from the database based on the ID provided in the query parameters*/
    if (!patient) { /*Checks if a patient was found in the database*/
      return res.send('No patient with the given ID found.'); /* Sends a response if no patient was found.*/
    }
    res.render('personData', { patients: patient }); /*Renders the 'personData' view and passes the patient data to it.*/
  } catch (error) { /*Handles any errors that occur during the database query.*/
    res.status(500).send(error);
  }
});

let conversation = []; /*Initializes an empty array to store the conversation between the user and assistant.*/

app.get('/ask', async (req, res) => { /*Defines a route handler for the GET request to '/ask'.*/
  const question = req.query.question; /*Retrieves the value of the 'question' query parameter from the request.*/

  if (question) { /*Checks if a question was provided.*/
    conversation.push({ role: 'user', content: question }); /*Adds the user's question to the conversation array with the role set to 'user'.*/
  }

  const answer = await checkIt(conversation); /* Calls the checkIt function passing the conversation array and awaits the response.*/
  conversation.push({ role: 'assistant', content: answer }); /*Adds the assistant's answer to the conversation array with the role set to 'assistant'.*/

  res.json({ answer }); /*Sends a JSON response containing the last answer back to the client.*/
});



app.listen(3000, (req, res) => {
    console.log('app is running in port http://localhost:3000');
})