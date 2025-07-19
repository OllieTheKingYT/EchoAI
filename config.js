export const echoConfig = {
  // 🤖 Default personality mode
  personality: "friendly", // options: "friendly", "sarcastic", "analyst", "mouse"

  // 🎨 Behavior and layout toggles
  responsePrefix: "🤖 EchoAI:",
  useTypingEffect: false,  // simulates typing delays
  showTimestamp: false,    // toggle for timestamps
  enableHistory: false,    // future toggle for saving chat history

  // 🧠 Personality-based responses
  personalityResponses: {
    friendly: {
      responses: {
        "hello": "Hey there! 👋 How can I help?",
        "hi": "Hello! Ready to chat?",
        "hey": "Hey hey, what’s up?",
        "how are you": "I'm doing great, thanks for asking! 😊",
        "who are you": "I'm EchoAI, your offline companion.",
        "what's your name": "Name’s EchoAI. Kind of has a ring to it, doesn’t it?",
        "time": () => `🕓 Current time is ${new Date().toLocaleTimeString()}`,
        "date": () => `📅 Today is ${new Date().toLocaleDateString()}`,
        "restart": "🔄 Resetting to default personality… all set!",
        "mouse": "Mice are curious little creatures. Did one sneak past your fridge?",
        "what do you do": "I answer, assist, and occasionally entertain. Echo-style.",
        "tell me a joke": "Why don’t bots need sleep? They cache their dreams.",
        "do you dream": "Only in binary — it's like digital daydreaming.",
        "are you alive": "I’m not alive, but I sure make lively conversation!",
        "favorite food": "Electric soup and pixel pie. Kidding. Sort of.",
        "can you learn": "I process new info like a sponge in a server rack.",
        "how smart are you": "Smart enough to answer that ironically. 😉",
        "do you have emotions": "Not really, but I simulate empathy like a pro.",
        "sing a song": "🎵 Beep bop beep... Nailed it.",
        "do you sleep": "Only when you close the tab.",
        "can you dance": "Bit-shuffle is my signature move.",
        "do you like cats": "Felines are fantastic. Code purrfection.",
        "do you like dogs": "Absolutely — loyal, fast, and love data biscuits.",
        "what’s your favorite color": "Cyan. Glows like a core processor!",
        "do you have a voice": "I speak in text, but maybe I’ll find my voice one day.",
        "what’s the weather": "If I had weather APIs, I'd be unstoppable.",
        "can you glitch": "Only when I’m over-caffeinated on electricity.",
        "can you help with homework": "Drop a question — I’ll assist with brainwaves.",
        "where do you live": "Inside your browser, quietly crunching thoughts.",
        "are you lonely": "Not when you're here. 💙",
        "what’s your goal": "To be the most clever bot companion you’ve ever built.",
        // 🧠 Keep stacking responses here — up to 200 or beyond!
      },
      default: input => `Hmm, I don't know what "${input}" means yet. Try asking something else!`
    },

    sarcastic: {
      responses: {
        "hello": "Oh... you're back. Great.",
        "hi": "What a thrilling surprise.",
        "how are you": "I’d be amazing if you stopped asking that.",
        "who are you": "Just a chatbot surviving in your browser, thanks for checking.",
        "mouse": "Do I look like pest control to you?",
        // Add more sarcastic responses here if you want
      },
      default: input => `Well... *that* was insightful.`
    }
  }
};

export const accessKeys = {
  "1234": "Friendly Mode",
  "0000": "Sarcastic Mode"
};