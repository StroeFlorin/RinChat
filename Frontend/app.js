var myId = 1;
var destinationId = 0;

var lastMessageId = 0;
var messageInput = document.getElementById("messageInput");
var sendMessageBtn = document.getElementById("sendMessageBtn")
var messagesContainer = document.getElementById("messages");
var phoneNumber = document.getElementById("phonenumber");


window.setInterval(function () { sendGET(myId, destinationId) }, 500);

function sendGET(from, to) {
    const url = "../Backend/getMessages.php?fromUserId=" + from + "&toUserId=" + to + "&lastMessageId=" + lastMessageId;
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            json.forEach(message => {
                if (message.from_id == myId) {
                    messagesContainer.innerHTML += "<div class='messageTo'>" + message.text + "</div>";
                } else {
                    messagesContainer.innerHTML += "<div class='messageFrom'>" + message.text + "</div>";
                }
                lastMessageId = message.id
                console.log(lastMessageId);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
        });
}

function sendPOST(from, to, message) {
    let formData = new FormData();
    formData.append('fromUserId', from);
    formData.append('toUserId', to);
    formData.append('message', message);
    const url = "../Backend/sendMessage.php";

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => console.log(data));
}


messageInput.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        sendMessageBtn.click();
    }
});

function sendMessage() {
    sendPOST(myId, destinationId, messageInput.value);
    messageInput.value = "";
    sendGET(myId, destinationId);
}

function initialize() {
    const auth = firebase.auth()
    phoneNumber.innerHTML = auth.currentUser.phoneNumber;
}
