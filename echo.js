import { echoConfig, accessKeys } from "./config.js";

// 🌟 Initial personality mode
let currentMode = echoConfig.personality;

// 🚨 Strike + Ban settings
const MAX_STRIKES = 3;
const BAN_DURATION_MS = 24 * 60 * 60 * 1000;

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

  if (isUserBanned()) {
    appendMessage("bot", "🚷 You've been banned for 24 hours due to repeated violations. Please try again later.");
    return;
  }

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

// 🚫 Language filter + Strike tracker
function checkForLanguage(input) {
  const flagged = ["shit", "damn", "hell", "crap", "stupid", "idiot", "jerk", "fuck"];
  const strikes = Number(localStorage.getItem("echoStrikes") || 0);

  for (const word of flagged) {
    if (input.includes(word)) {
      const newStrikes = strikes + 1;
      localStorage.setItem("echoStrikes", newStrikes);

      if (newStrikes >= MAX_STRIKES) {
        const banUntil = Date.now() + BAN_DURATION_MS;
        localStorage.setItem("echoBanUntil", banUntil);
        localStorage.setItem("echoStrikes", 0);
        return "🚫 You’ve been banned for 24 hours due to repeated violations.";
      }

      const remaining = MAX_STRIKES - newStrikes;
      return `⚠️ Please keep it respectful. You now have ${remaining} strike${remaining === 1 ? "" : "s"} left before a 24-hour ban.`;
    }
  }

  return null;
}

// ⛔ Ban check
function isUserBanned() {
  const banTime = Number(localStorage.getItem("echoBanUntil") || 0);
  return Date.now() < banTime;
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