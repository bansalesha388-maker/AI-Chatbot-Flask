async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;

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

    chatBox.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;

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