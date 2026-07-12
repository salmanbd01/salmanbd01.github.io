const chatBox = document.getElementById("chatBox");
const promptInput = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

promptInput.addEventListener("keydown", function(e){
    if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage(){

    const message = promptInput.value.trim();

    if(message === "") return;

    addUserMessage(message);

    promptInput.value = "";

    setTimeout(()=>{
        addAIMessage("⚡ Gemini API will be connected in the next step.");
    },700);

}

function addUserMessage(text){

    chatBox.innerHTML += `
    <div class="ai-message" style="justify-content:flex-end">

        <div class="text">
            <h4>You</h4>
            <p>${text}</p>
        </div>

    </div>
    `;

    scrollBottom();

}

function addAIMessage(text){

    chatBox.innerHTML += `
    <div class="ai-message">

        <div class="avatar">
            🤖
        </div>

        <div class="text">
            <h4>My AI</h4>
            <p>${text}</p>
        </div>

    </div>
    `;

    scrollBottom();

}

function scrollBottom(){

    chatBox.scrollTop = chatBox.scrollHeight;

}
