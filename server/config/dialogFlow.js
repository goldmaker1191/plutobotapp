 const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
function dialogFlow(request, response) {
  const agent = new WebhookClient({ request, response });
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
  
  function hello(agent){
    agent.add(`Button example:`);
    agent.add(new Suggestion(`Button`));
  }

  function numbers(agent){
    agent.add(`1`);
    agent.add(`2`);
    agent.add(`3`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('hello', hello);
  intentMap.set('Numbers', numbers);
  intentMap.set('Default Fallback Intent', fallback);
  agent.handleRequest(intentMap);
};

module.exports = {
  dialogFlow: dialogFlow
}