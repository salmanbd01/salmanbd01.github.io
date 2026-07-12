const API_KEY = "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";

const chatBox = document.getElementById("chatBox");
const promptInput = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage(){

    const message = promptInput.value.trim();

    if(!message) return;

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
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${API_KEY}`
            },
            body:JSON.stringify({
                model:"openai/gpt-4o-mini",
                messages:[
                    {
                        role:"user",
                        content:message
                    }
                ]
            })
        });

        const data = await response.json();

        const reply =
        data.choices?.[0]?.message?.content || "No response";

        chatBox.innerHTML += `
        <div class="ai-message">
            <div class="avatar">🤖</div>
            <div class="text">
                <h4>My AI</h4>
                <p>${reply}</p>
            </div>
        </div>`;

    } catch(error){
        console.log(error);
        const newChatBtn = document.getElementById("newChat");

newChatBtn.addEventListener("click", () => {
    chatBox.innerHTML = `
    <div class="ai-message">
        <div class="avatar">🤖</div>
        <div class="text">
            <h4>My AI</h4>
            <p>Hello Salman 👋<br><br>New chat started. Ask me anything.</p>
        </div>
    </div>
    `;
});
    }
}
