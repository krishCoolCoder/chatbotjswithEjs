// import { intent } from "./intent.js";
import { chatgptResponse } from "./chatgpt.js";

export async function chatbotRes(intent, input = null) {
  console.log("Into the chatbotRes ", intent);
  switch (intent) {
    case "products":
      return "We have these many list of products : They are , \n Home loan, \n personal load, , bike loan and  , car loan";
    case "fallback_intent":
      return await chatgptResponse(input);
    case "createLead":
      return "I appreciate your efforts on creating the lead, our development team is working on that feature of creating a lead in chatbot itself and we will update you promptly.";
    case "createChatBot":
      return "I appreciate your efforts on creating the chatbot, our developers will develop this feature for creating an chatbot and assigning it to the user. Its a cool feature and we will update you promptly";
    case "goodbye":
      return "GoodBye User, I am so happy that you have tried to communicate with me. I cant wait to chat with you again.";
    case "greeting":
      return "Hello there User, Greetings.";
  }
}
