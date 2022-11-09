const socket = io()

let name;
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector(".message_area")
const typingArea =document.getElementById("typeing")

do {
    name = prompt("please enter your name")
} while (!name)

textarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
})



textarea.addEventListener("input", (e) => {
    console.log("Typing")
    
    socket.emit("Typing");
    

    // socket.emit("Typing", e.target.value);
    // console.log(data)

})

function c1(){
    console.log("DFs")
    typingArea.innerHTML = "Typing..."
    setTimeout(() => {
        typingArea.innerHTML = ""
    }, 1000)
}
socket.on("Typing", c1)



function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // append
    appendMessage(msg, "outgoing")
    textarea.value = ''
    scrollToBottom()

    // send to server
    socket.emit("message", msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, "message")

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// receive message
socket.on("message", (msg) => {
    // console.log(msg)
    appendMessage(msg, "incoming")
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight

}