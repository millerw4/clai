import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

//SAFETY FIRST - expensive API
//change to true when want to use openAI
const apiIsLive =
false;
// true;

const models = {
  davinci3: 'text-davinci-003',
  davinci2: 'text-davinci-002',
  curie1: 'text-curie-001',
  babbage1: 'text-babbage-001',
  ada1: 'text-ada-001'
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const sendPrompt = async function (prompt='') {
  if (prompt === '' || apiIsLive === false) {
    console.log('empty prompt or safeguard is still set to FALSE', process.env.OPENAI_API_KEY)
    return '#PLACEHOLDERTEXT';
  } else {
    const response = await openai.createCompletion({
      model: models.davinci3,
      prompt: `This is the .obj file for a low-poly 3D model of a ${prompt}:\n`,
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response;
  }
}

export default {sendPrompt}