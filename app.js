const express = require('express');
const app = express();
const port = 3000; // You can change this to any available port

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const messages = []; // Store chat messages in-memory (for demonstration purposes)
const login = [
    {
        userName : "admin",
        password : "admin"
    },
    {
        userName : "user",
        password : "user"
    }
]
const userLoginData = {
    userName : null,
    password : null
}

const userLoginConvo = [
    { sender: 'bot', text: "Hi there user, I am not able to recognize you, can you give me your name and password." },
    { sender: 'bot', text: "Kinldy Enter the user Name" },
    { sender: 'bot', text: "Kinldy Enter the secret password." },
]

app.get('/login', ( req, res)=>{
    res.render('index',{ userLoginConvo });
})

app.get('/', (req, res) => {
    // if (userLoginData.userName == null || userLoginData.password == null){

    // }
    console.log("The messge in / is : ", messages)
  res.render('index', { messages });
});

app.post('/sendMessage', (req, res) => {
  const userMessage = req.body.message.trim();
console.log("Hello world and the userMessage is : ", userMessage)
  if (userMessage !== '') {
    // Store user message
    messages.push({ sender: 'user', text: userMessage });
    
    // Generate bot response
    const botResponse = `Bot: I received your message: ${userMessage}`;
    
    // Store bot response
    messages.push({ sender: 'bot', text: botResponse });
    let data = require('./intent.js');
    messages.push({ sender: 'bot', text: "Your intent is : " + data(userMessage)});

    // Redirect back to the chatbot page
    res.redirect('/');
  } else {
    // If the user sends an empty message, redirect back without storing anything
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
