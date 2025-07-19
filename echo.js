import { echoConfig, accessKeys } from "./config.js";

// 🌟 Initial personality mode
let currentMode = echoConfig.personality;

// 🚨 Strike settings
const MAX_STRIKES = 3;

// 🖥️ Select DOM elements
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// ✅ DOM element safety check
if (!chatWindow || !userInput || !sendBtn) {
  console.error("❌ EchoAI failed: missing DOM elements.");
  throw new Error("Required elements not found.");
}

// ⏎ Enter key sends message
userInput.addEventListener("keydown", event => {
  if (event.key === "Enter") sendBtn.click();
});

// 🖱️ Send button triggers message
sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";
  handleMessage(message.toLowerCase());
});

// 💬 Display message in chat window
function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = role;
  msg.textContent = role === "user"
    ? `🧑 You: ${text}`
    : `${echoConfig.responsePrefix} ${text}`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 🎛️ Main response handler
function handleMessage(message) {
  // 🙏 Apology system — reduce one strike if user says "sorry"
  const strikesRaw = localStorage.getItem("echoStrikes");
  const strikes = strikesRaw ? Number(strikesRaw) : 0;

  if (message.includes("sorry")) {
    if (!isNaN(strikes) && strikes > 0) {
      const newStrikes = strikes - 1;
      localStorage.setItem("echoStrikes", newStrikes);
      return appendMessage("bot", `❤️ Apology accepted. Strike count reduced to ${newStrikes}.`);
    } else {
      return appendMessage("bot", "😊 You're in the clear! No strikes to remove.");
    }
  }

  const keyResponse = checkForKey(message);
  if (keyResponse) return appendMessage("bot", keyResponse);

  const filteredResponse = checkForLanguage(message);
  if (filteredResponse) return appendMessage("bot", filteredResponse);

  const reply = generateLocalResponse(message);
  appendMessage("bot", reply);
}

// 🔑 Access key switcher
function checkForKey(input) {
  if (input.startsWith("enter key:")) {
    const key = input.split(":")[1].trim();
    if (accessKeys[key]) {
      currentMode = accessKeys[key].toLowerCase().replace(" mode", "") || echoConfig.personality;
      return `🔓 Access granted: ${accessKeys[key]}`;
    }
    return "❌ Invalid key. Access denied.";
  }
  return null;
}

// ⚠️ Language filter + Strike tracker (no ban)
function checkForLanguage(input) {
  const flagged = ["shit", "damn", "ass", "crap", "stupid", "idiot", "jerk", "fuck"];
  const strikes = Number(localStorage.getItem("echoStrikes") || 0);

  for (const word of flagged) {
    if (input.includes(word)) {
      const newStrikes = strikes + 1;
      localStorage.setItem("echoStrikes", newStrikes);

      const remaining = MAX_STRIKES - newStrikes;
      return `⚠️ Please keep it respectful.`
    }
  }

  return null;
}

// 🧠 Personality-based response engine
function generateLocalResponse(input) {
  const personality = echoConfig.personalityResponses[currentMode];
  const responseMap = personality.responses || {};

  if (responseMap[input]) {
    const response = responseMap[input];
    return typeof response === "function" ? response(input) : response;
  }

  return personality.default(input);
}