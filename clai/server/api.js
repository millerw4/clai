import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
dotenv.config();

//SAFETY FIRST - expensive API
//change to true when want to use openAI
const apiIsLive =
false;
// true;

const models = {
  gpt: 'gpt-3.5-turbo', //only works with chatCompletion
  davinci3: 'text-davinci-003',
  davinci2: 'text-davinci-002',
  curie1: 'text-curie-001',
  babbage1: 'text-babbage-001',
  ada1: 'text-ada-001'
}
const maxTokens = {
  veryLow: 250,
  low: 500,
  medium: 1000,
  high: 2000,
  veryHigh: 4000 //only works with davinci 2,3, and gpt 3.5
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const sendPrompt = async function (prompt='') {
  if (prompt === '' || apiIsLive === false) {
    console.log('empty prompt or safeguard is still set to FALSE');
    return '#PLACEHOLDERTEXT';
  } else {
    const response = await openai.createCompletion({
      model: models.davinci3,
      prompt: `This is the .obj file for a 3D model of a low-poly ${prompt}:\n\n`,
      temperature: 0,
      max_tokens: maxTokens.veryHigh,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response;
  }
}

export default {sendPrompt}