import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});

// const openai = new OpenAIApi(configuration);
// const response = await openai.createCompletion({
//   model: "text-davinci-002",
//   prompt:
//     'I need you to answers all the questions in a json format and remember that the format has to be in spevific format only. The json format is "{ question : "the question", answer : "the answers"}. The question is the parameter that you have to use all the text that if fed to you and the answer is the paramer that you feed all the answer. so what is pythogorous theorem?.',
//   max_tokens: 70,
//   temperature: 0,
// });

// // we can only hold  20,480 English characters

// let responseData = response.data.choices[0].text;

// console.log(
//   "The response is this : ",
//   responseData.substring(0, responseData.indexOf("}") + 1)
// );

//   'I need you to answers all the questions in a json format and remember that the format has to be in spevific format only. The json format is "{ question : "the question", answer : "the answers"}. The question is the parameter that you have to use all the text that if fed to you and the answer is the paramer that you feed all the answer. Question is : ' +
export async function chatgptResponse(input) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: input,
    max_tokens: 70,
    temperature: 0,
  });

  // we can only hold  20,480 English characters
  //   "{ question : "the question", answer : "the answers"}"

  let responseData = response.data.choices[0].text;
  //   let result = responseData.substring(0, responseData.indexOf("}") + 1);
  console.log("the result is this : ", responseData);
  return responseData;
}

// module.exports = chatgptResponse;
