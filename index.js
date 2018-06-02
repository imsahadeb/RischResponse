const express = require('express')
const fromApi = require('./functions');
const bodyParser = require('body-parser')
const {
    dialogflow,
    Image,
  } = require('actions-on-google')
   
  // Create an app instance
   
  const app = dialogflow()
   
  // Register handlers for Dialogflow intents
   
  app.intent('Default Welcome Intent', conv => {
    getTrainList(conv,pass);
    function getTrainList(conv,pass){
      url='https://api.railwayapi.com/v2/between/source/ncb/dest/bhp/date/01-06-2018/apikey/ye1rpmx0tk/'
      fromApi.callTheRailwayApi(url,(response)=>{
        let getJsonRsponse=JSON.parse(response);
        console.log(getJsonRsponse);
        trainName =getJsonRsponse.trains[0].name;
        
      })
     
    }
  
    pass(conv.ask(trainName));
   
  })
   
  // Intent in Dialogflow called `Goodbye`
  app.intent('Goodbye', conv => {
    conv.close('See you later!, Bye')
  })
   
  app.intent('Default Fallback Intent', conv => {
    conv.ask(`I didn't understand. Can you tell me something else?`)
  })

  
  express().use(bodyParser.json(), app).listen(process.env.PORT || 80)