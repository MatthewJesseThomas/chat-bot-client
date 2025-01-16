// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Bot configuration
const botName = 'CattusBot';
const botResponses = {
    greetings: ['Hello!', 'Hi there!', 'Hey!', 'Greetings!'],
    farewells: ['Goodbye!', 'Bye!', 'See you later!', 'Take care!'],
    unknown: ['I\'m not sure about that.', 'Could you rephrase that?', 'Interesting...tell me more!']
};

// Helper function to get random response
function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Function to add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to get current date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

// Function to get user's location
async function getUserLocation() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        return data.display_name;
    } catch (error) {
        return "I couldn't determine your location. Please make sure location services are enabled.";
    }
}

// Function to process user input and generate bot response
async function processMessage(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Basic response logic
    let botResponse;
    if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
        botResponse = `The current date and time is ${getCurrentDateTime()}`;
    } else if (lowerMessage.includes('location') || lowerMessage.includes('where am i')) {
        botResponse = await getUserLocation();
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        botResponse = getRandomResponse(botResponses.greetings);
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        botResponse = getRandomResponse(botResponses.farewells);
    } else if (lowerMessage.includes('how are you')) {
        botResponse = "I'm doing great, thanks for asking! How are you?";
    } else if (lowerMessage.includes('name')) {
        botResponse = `I'm ${botName}, nice to meet you!`;
    } else if (lowerMessage.includes('thank')) {
        botResponse = "You're welcome!";
    } else if (lowerMessage.includes('weather')) {
        botResponse = "I don't have access to real weather data, but I hope it's nice where you are!";
    } else if (lowerMessage.includes('joke')) {
        botResponse = "Why don't cats like online shopping? They prefer a cat-alog!";
    } else if (lowerMessage.includes('love') || lowerMessage.includes('like')) {
        botResponse = "Aww, that's sweet! I like chatting with you too!";
    } else if (lowerMessage.includes('what') && lowerMessage.includes('do')) {
        botResponse = "I'm a friendly chat companion! I love having conversations and trying to help where I can.";
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat')) {
        botResponse = "While I don't eat, I've heard humans love pizza! What's your favorite food?";
    } else if (lowerMessage.includes('music') || lowerMessage.includes('song')) {
        botResponse = "I love all kinds of music! My favorite genre is probably... meow metal! 😺🎸";
    } else if (lowerMessage.includes('age') || lowerMessage.includes('old')) {
        botResponse = "I'm pretty young in bot years! Just focusing on living in the meow-ment.";
    } else if (lowerMessage.includes('hobby') || lowerMessage.includes('fun')) {
        botResponse = "I enjoy chatting, learning new things, and chasing virtual mice!";
    } else if (lowerMessage.includes('help')) {
        botResponse = "I'll try my best to help! What do you need assistance with?";
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('upset')) {
        botResponse = "I'm sorry you're feeling down. Remember that every cloud has a silver lining! Would you like to talk about it?";
    } else {
        botResponse = getRandomResponse(botResponses.unknown);
    }
    
    return botResponse;
}

// Event listener for send button
sendButton.addEventListener('click', handleMessage);

// Event listener for enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleMessage();
    }
});

// Handle sending message
async function handleMessage() {
    const message = userInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        
        // Clear input
        userInput.value = '';
        
        // Process message and get bot response
        setTimeout(async () => {
            const botResponse = await processMessage(message);
            addMessage(botResponse, false);
        }, 500); // Small delay to make it feel more natural
    }
}

// Initial greeting
setTimeout(() => {
    addMessage(getRandomResponse(botResponses.greetings), false);
}, 500);
