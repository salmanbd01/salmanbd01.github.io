const API_KEY = "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";

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
    <div class="ai-message">
        <div class="text">
            <h4>You</h4>
            <p>${message}</p>
        </div>
    </div>
    `;

    promptInput.value = "";

    try {

        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const reply =
        data.choices?.[0]?.message?.content ||
        "No response";

        chatBox.innerHTML += `
        <div class="ai-message">
            <div class="avatar">🤖</div>
            <div class="text">
                <h4>My AI</h4>
                <p>${reply}</p>
            </div>
        </div>
        `;

    } catch(error) {

        chatBox.innerHTML += `
        <div class="ai-message">
            <div class="text">
                <h4>Error</h4>
                <p>AI connection failed.</p>
            </div>
        </div>
        `;

        console.log(error);
    }
}
