// Predefined responses
const responses = {
    "hello": "Hello there! 😊 How can I brighten your day?",
    "how are you": "I'm doing wonderfully, thank you! How about you? ",
    "how are you?": "I'm fine, thank you! And you? ",
    "what are you doing today": "I'm here chatting with you! What about you? ",
    "what are you doing now?": "I'm happily chatting with you! ",
    "what's your name": "My name is Calcura! What's yours? ",
    "who are you": "I'm Calcura, your friendly math assistant! ",
    "bye": "Goodbye! It was lovely chatting with you! Have a fantastic day! ",
    "help": "Of course! I'm here for you. What do you need help with? ",
    "who created you?": "I was created by some amazing Armenian students! ",
    "calculator": "I love math! Just give me some expressions, and I'll do my best to help! ",
    "what can you do": "I can help with math calculations and have fun conversations! ",
    "tell me a joke": "Why did the math book look sad? Because it had too many problems! 😄"
};

// Function to evaluate multiple math expressions
function evaluateMath(expressions) {
    const results = [];
    
    // Split by newlines to handle multiple expressions
    const individualExpressions = expressions.split('\n').map(expr => expr.trim());

    for (const expr of individualExpressions) {
        // If the line starts with "Calculate", respond accordingly
        if (expr.toLowerCase().startsWith("calculate")) {
            results.push("Math helper is on! I'm ready to answer your calculations. Please enter your expressions below: ");
            continue; // Skip further processing for this line
        }

        // Evaluate the expression if it doesn't start with "Calculate"
        const calculation = expr.trim(); // Trim any whitespace
        if (calculation) {
            try {
                const result = eval(calculation);
                results.push(`${calculation} = ${result} `);
            } catch (error) {
                results.push(`Oh no! I couldn't calculate ${calculation}. `);
            }
        }
    }

    return results.join('\n'); // Return results joined by newlines
}

// Function to get a response
function getResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    
    // Check for conversational responses
    for (const keyword in responses) {
        if (userMessage.includes(keyword)) {
            return responses[keyword];
        }
    }

    // If the user is asking for a calculation, handle it specifically
    if (userMessage.startsWith("calculate")) {
        return evaluateMath(userMessage);
    }

    // Check if the input is a math expression
    const mathRegex = /^[\d\s\+\-\*\/\(\)]+$/; // Regex to identify math expressions
    if (mathRegex.test(userMessage)) {
        const result = eval(userMessage);
        return `${userMessage} = ${result}`;
    }

    return "I'm sorry, I don't quite understand that. But I'm here to help! ";
}

// Send message function
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const messageText = userInput.value.trim();
    if (messageText === '') return;

    // Create user message element
    const chatbox = document.getElementById('chatbox');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = messageText;
    chatbox.appendChild(userMessage);

    // Clear input
    userInput.value = '';

    // Get AI response
    const aiResponseText = getResponse(messageText);
    
    // Create AI response element
    const aiResponse = document.createElement('div');
    aiResponse.className = 'message ai-message';
    aiResponse.textContent = aiResponseText;
    chatbox.appendChild(aiResponse);

    // Scroll to bottom of chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Event listeners
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
