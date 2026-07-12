const API_KEY = "AQ.Ab8RN6IT3TcHjir-Cnd658zdxY4RdK2pRqMzXAxkJWBmdiV2bw";

const chatBox = document.getElementById("chatBox");
const promptInput = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {

    const message = promptInput.value.trim();

    if (!message) return;

    chatBox.innerHTML += `
        <div class="ai-message" style="justify-content:flex-end">
            <div class="text">
                <h4>You</h4>
                <p>${message}</p>
            </div>
        </div>
    `;

    promptInput.value = "";

    chatBox.innerHTML += `
        <div class="ai-message" id="loading">
            <div class="avatar">🤖</div>
            <div class="text">
                <h4>My AI</h4>
                <p>Thinking...</p>
            </div>
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        document.getElementById("loading").remove();

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response.";

        chatBox.innerHTML += `
            <div class="ai-message">
                <div class="avatar">🤖</div>
                <div class="text">
                    <h4>My AI</h4>
                    <p>${reply}</p>
                </div>
            </div>
        `;

    } catch (err) {

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
            <div class="ai-message">
                <div class="avatar">❌</div>
                <div class="text">
                    <h4>Error</h4>
                    <p>Failed to connect Gemini API.</p>
                </div>
            </div>
        `;

        console.error(err);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
