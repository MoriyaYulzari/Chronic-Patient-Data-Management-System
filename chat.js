const { Configuration, OpenAIApi } = require("openai"); /*Imports the Configuration and OpenAIApi classes from the "openai" module.*/
 
const configuration = new Configuration({ /*Creates a new instance of the Configuration class with the OpenAI API key.*/
  apiKey: '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', 
});
 
const openai = new OpenAIApi(configuration); /*Creates a new instance of the OpenAIApi class using the configuration.*/

const checkIt = async (messages) => { /*Defines the checkIt function that takes an array of messages as input.*/
  try {
    const stringMessages = messages.map((message) => ({ 
      role: message.role,
      content: message.content.toString(),
    }));
    /*Maps each message in the messages array to a new object with the role and content converted to strings.*/

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: stringMessages,
    });
    /* Calls the OpenAI API's createChatCompletion method to generate a response based on the conversation.*/

    const response = completion.data.choices[0].message; /*Retrieves the generated response from the completion object.*/
    return response;
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
};

 
module.exports=checkIt /*Exporting the checkIt model*/