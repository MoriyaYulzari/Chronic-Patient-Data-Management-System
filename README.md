This web-based application based on MVC architecture has many usages like uploading a patient to Mongodb, finding a patient in the DB, checking its image by Imagga and tagging it, and having a conversation with chatGPT to learn about its medical conditions. All that is in order to allow the management of the data of chronic patients using the internet and integration technologies with free cloud services.

**Git link**
https://github.com/MoriyaYulzari/Chronic-Patient-Data-Management-System.git

**Usage**
*Upload Patient Data*-
-Send a POST request to the /upload endpoint with the patient details, including first name, last name, date of birth, photo, and five potential medical conditions. The system will save the data and perform image tagging on the uploaded photo.
*Retrieve Patient Data*-
-Send a GET request to the /readbyID endpoint with the patient's ID as a query parameter.
-The system will retrieve the patient's data and display it on the patient's card.
*Engage in a Conversation*-
-Send a GET request to the /ask endpoint with the question as a query parameter.
-The system will engage in a conversation with Chat GPT and provide answers related to the patient's health condition.

**Technologies Used**

-Node.js

-Express.js

-MongoDB, using Mongoose

-Imagga API (for image tagging)

-OpenAI API (for chat functionality)

**Contributing**
Contributions are welcome! We are students and this is our first web-based application that we’ve created in the “cloud computing” course, digital medical technologies department. If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.
