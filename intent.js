const { WordTokenizer, BayesClassifier } = require('natural');

// Sample intents and their corresponding patterns
const intents = [
  { name: 'greeting', patterns: ['hello', 'hi', 'hey'] },
  { name: 'goodbye', patterns: ['bye', 'see you later', 'goodbye'] },
  { name: 'createLead', patterns:   [
    'I like to create a customer',
    'I need to create a customer',
    'I need to create a lead'
] },
  { name: 'createChatBot', patterns:   [
    'I like to create a chatbot',
    'I need to create a bot',
    'I need to create a chatbot'
] },
  // Add more intents and patterns as needed
];

// Train the intent recognizer with the patterns
const tokenizer = new WordTokenizer();
const classifier = new BayesClassifier();

intents.forEach((intent) => {
  const { name, patterns } = intent;
  patterns.forEach((pattern) => {
    classifier.addDocument(tokenizer.tokenize(pattern), name);
  });
});

classifier.train();

// Function to recognize the intent
function recognizeIntent(input) {
  // const tokens = tokenizer.tokenize(input);
  // return classifier.classify(tokens);

  const tokens = tokenizer.tokenize(input);
  const recognizedIntent = classifier.classify(tokens);

  // Check if the recognized intent has a confidence score of zero
  const confidence = classifier.getClassifications(tokens);
  const fallbackThreshold = 0.20; // You can adjust this threshold as needed
  console.log("The cofindence is this : ", confidence)
  const isFallback = confidence.every((result) => result.value >= fallbackThreshold);
  console.log("isFallback is this : ", isFallback);
  return isFallback ? 'fallback_intent' : recognizedIntent;
}

// Example usage
// const userInput = 'I need to create a bot';
// const recognizedIntent = recognizeIntent(userInput);

function intent(input){
  
  const val = recognizeIntent(input);
  return val;
}
// console.log('Recognized intent:', recognizedIntent);

module.exports = intent;