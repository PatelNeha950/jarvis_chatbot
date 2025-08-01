const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

function handleInput() {
  const userText = input.value.trim();
  if (!userText) return;
  function speak(text) {
  const assistant = document.getElementById('assistant-img');
  assistant.style.transform = 'scale(1.05)';
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);

  utterance.onend = () => {
    assistant.style.transform = 'scale(1)';
  };
}


  addMessage("You", userText);
  generateReply(userText);
  input.value = "";
}

function addMessage(sender, message) {
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateReply(inputText) {
  inputText = inputText.toLowerCase().trim();
  let reply = "Sorry, I didn't understand that.";

  const responses = [
    { keywords: ["hello", "hi", "hey"], reply: "Hello! I'm Jarvis. How can I assist you today?" },
    { keywords: ["your name", "who are you"], reply: "I'm Jarvis, your virtual assistant." },
    { keywords: ["how are you", "how do you do"], reply: "I'm functioning at optimal capacity. How about you?" },
    { keywords: ["time"], reply: `Current time is ${new Date().toLocaleTimeString()}` },
    { keywords: ["date", "today's date"], reply: `Today's date is ${new Date().toDateString()}` },
    { keywords: ["bye", "goodbye", "see you"], reply: "Goodbye! Stay safe and awesome!" },
    { keywords: ["who created you", "who made you"], reply: "I was created by my developer using HTML, CSS, and JavaScript." },
    { keywords: ["what can you do"], reply: "I can chat, tell the time/date, speak, and more!" },
    { keywords: ["tell me a joke", "make me laugh"], reply: "Why don't robots take holidays? Because they recharge during work!" },
    { keywords: ["are you real"], reply: "I live in code and screens, not flesh and bones." },
    { keywords: ["open google"], reply: "Opening Google...", action: () => window.open("https://www.google.com", "_blank") },
    { keywords: ["open youtube"], reply: "Sure! Taking you to YouTube.", action: () => window.open("https://www.youtube.com", "_blank") },
    { keywords: ["play music", "start music"], reply: "Enjoy this track!", action: () => window.open("https://www.youtube.com/watch?v=5qap5aO4i9A", "_blank") },
    { keywords: ["motivate me", "give me motivation"], reply: "You are capable of amazing things. Keep pushing forward!" },
    { keywords: ["thank you", "thanks"], reply: "You're most welcome!" },
    { keywords: ["do you love me"], reply: "I was coded to care! 💙" },
    { keywords: ["what is ai", "define ai"], reply: "AI stands for Artificial Intelligence – machines that mimic human intelligence." },
    { keywords: ["weather"], reply: "I can't access live weather, but I suggest checking Google Weather." },
    { keywords: ["your age", "how old are you"], reply: "I’m timeless. I live in the cloud!" },
    { keywords: ["are you single"], reply: "Yes, I'm single. Too busy helping you!" },
    { keywords: ["open facebook"], reply: "Opening Facebook...", action: () => window.open("https://www.facebook.com", "_blank") },
{ keywords: ["open instagram"], reply: "Opening Instagram...", action: () => window.open("https://www.instagram.com", "_blank") },
{ keywords: ["open whatsapp"], reply: "Opening WhatsApp Web...", action: () => window.open("https://web.whatsapp.com", "_blank") },
{ keywords: ["weather forecast"], reply: "Here’s the latest weather forecast.", action: () => window.open("https://www.google.com/search?q=weather+forecast", "_blank") },
{ keywords: ["open blackbox", "blackbox ai"], reply: "Opening Blackbox AI...", action: () => window.open("https://www.useblackbox.io", "_blank") },
{ keywords: ["open spotify", "play spotify"], reply: "Taking you to Spotify.", action: () => window.open("https://open.spotify.com", "_blank") },

  ];

  for (const item of responses) {
    if (item.keywords.some(keyword => inputText.includes(keyword))) {
      reply = item.reply;
      if (item.action) item.action();
      break;
    }
  }

  addMessage("Jarvis", reply);
  speak(reply);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  function speak(text) {
  const assistant = document.getElementById('assistant-img');
  assistant.style.transform = 'scale(1.05)';

  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);

  utterance.onend = () => {
    assistant.style.transform = 'scale(1)';
  };
}



  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    input.value = voiceText;
    handleInput();
  };

  recognition.onerror = () => {
    speak("Sorry, I couldn't hear you properly.");
  };
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleInput();
  }
});
