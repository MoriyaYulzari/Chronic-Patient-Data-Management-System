
const axios = require('axios');// Importing the axios libarery
const FormData = require('form-data'); // Importing the form-data libarery
const fs = require('fs'); // Importing the fs libarery

const apiKey = 'acc_5251f0f046ee160';
const apiSecret = '984a7d5b1e0f0ff28c176d1768fde407';

async function sendImageForTagging(filepath) {
  const imageUrl = 'https://api.imagga.com/v2/tags';
  try {
    // Read the image file
    const file = fs.readFileSync(filepath);

    // Create form data
    const formData = new FormData();
    formData.append('image', file);

    // Send the POST request
    const response = await axios.post(imageUrl, formData, {
      auth: {
        username: apiKey,
        password: apiSecret,
      },
      headers: formData.getHeaders(),
    });

    // Extract the tags data
    const tags = response.data.result.tags

    // Return the tags data
    return tags;
  } catch (error) {
    // Handle any errors
    if (error.response && error.response.data) {
      console.error('Error:', error.response.data);
    } else {
      console.error('An error occurred while performing image tagging');
    };
  }
}

module.exports = sendImageForTagging