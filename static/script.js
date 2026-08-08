async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const typingIndicator = document.getElementById("typing-indicator");

    const message = input.value.trim();

    if (message === "") return;

    // Show user's message
    chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;

    // Show "AI is typing..."
    typingIndicator.style.display = "block";

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Hide "AI is typing..."
        typingIndicator.style.display = "none";

        // Show bot response
        chatBox.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;

    } catch (error) {
        // Hide "AI is typing..." if there is an error
        typingIndicator.style.display = "none";

        chatBox.innerHTML += `<p><b>Bot:</b> Sorry, something went wrong.</p>`;
    }

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        document.getElementById("user-input").value =
            event.results[0][0].transcript;

        sendMessage();
    };

    recognition.onerror = function(event) {
        alert("Error: " + event.error);
        console.log(event.error);
    };
}