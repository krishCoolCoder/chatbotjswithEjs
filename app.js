// const express = require("express");
// let data = require("./intent.js");
// let chatgptResponse = require("./chatgpt.js");
import express from "express";
import { intent } from "./intent.js";
import { chatgptResponse } from "./chatgpt.js";
const app = express();
const port = 3000; // You can change this to any available port

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const messages = [
  {
    sender: "bot",
    text: "Hi there user, Welcome I am traditional chatbot destined to guide you. Done worry I have a chatGpt power too. I am programmed to use him in right time.",
  },
]; // Store chat messages in-memory (for demonstration purposes)
const login = [
  {
    userName: "admin",
    password: "admin",
  },
  {
    userName: "user",
    password: "user",
  },
];
const userLoginData = {
  userName: null,
  password: null,
};

const userLoginConvo = [
  {
    sender: "bot",
    text: "Hi there user, I am not able to recognize you, can you give me your name and password.",
  },
  { sender: "bot", text: "Kinldy Enter the user Name" },
  { sender: "bot", text: "Kinldy Enter the secret password." },
];

app.get("/login", (req, res) => {
  res.render("index", { userLoginConvo });
});

app.get("/", (req, res) => {
  // if (userLoginData.userName == null || userLoginData.password == null){

  // }
  console.log("The messge in / is : ", messages);
  res.render("index", { messages });
});

app.post("/sendMessage", async (req, res) => {
  const userMessage = req.body.message.trim();
  console.log("Hello world and the userMessage is : ", userMessage);
  if (userMessage !== "") {
    let intents = intent(userMessage);
    console.log("the intent is this : ", intents);
    if (intents == "fallback_intent") {
      messages.push({ sender: "user", text: "User : " + userMessage });
      messages.push({
        sender: "bot",
        text: "Chatgpt : " + (await chatgptResponse(userMessage)),
      });
      res.redirect("/");
    }
    // Store user message
    messages.push({ sender: "user", text: "User : " + userMessage });

    // Generate bot response
    const botResponse = `Bot: I received your message: ${userMessage}`;

    // Store bot response
    messages.push({ sender: "bot", text: botResponse });
    messages.push({
      sender: "bot",
      text: "Your intent is : " + intents,
    });
    // Redirect back to the chatbot page
    res.redirect("/");
  } else {
    // If the user sends an empty message, redirect back without storing anything
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
