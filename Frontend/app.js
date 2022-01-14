var currentPhoneNumber;
var currentUid;
var destinationId = 0;
var lastMessageId = 0;

var messageInput = document.getElementById("messageInput");
var sendMessageBtn = document.getElementById("sendMessageBtn")
var messagesContainer = document.getElementById("messages");
var phoneNumber = document.getElementById("phoneNumber");
var onlineUsersCount = document.getElementById("usersCount");

function getMessages() {
    const url = "../Backend/getMessages.php?lastMessageId=" + lastMessageId + "&uid=" + currentUid;
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            json.forEach(message => {
                if (message.from_id == currentUid) {
                    messagesContainer.innerHTML +=
                        "<div class='d-flex'><div class='myMessage ml-auto'><div class='messageUser'>(YOU) " + message.phone_number + "</div> <div class='messageText'>" + message.text + "</div> <div class='messageDate'>" + message.date + "</div></div></div>";
                } else {
                    messagesContainer.innerHTML +=
                        "<div class='d-flex'><div class='otherMessages'><div class='messageUser'>" + message.phone_number + "</div> <div class='messageText'>" + message.text + "</div> <div class='messageDate'>" + message.date + "</div></div></div>";
                }
                lastMessageId = message.id
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
        });
}


function getOnlineUsersCount() {
    const url = "../Backend/getOnlineUsers.php"
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            json.forEach(value => {
                onlineUsersCount.innerHTML = value.count;
            });
        });
}


function sendPOST(from, to, message) {
    let formData = new FormData();
    formData.append('fromUserId', currentUid);
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

function saveUserToDb(uid, phoneNumber) {
    let formData = new FormData();
    formData.append('uid', uid);
    formData.append('phoneNumber', phoneNumber);
    const url = "../Backend/saveUser.php";
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
    sendPOST(currentUid, destinationId, messageInput.value);
    messageInput.value = "";
    getMessages();
}

function initialize() {
    const auth = firebase.auth()
    currentPhoneNumber = auth.currentUser.phoneNumber;
    currentUid = auth.currentUser.uid;
    phoneNumber.innerHTML = auth.currentUser.phoneNumber;
    window.setInterval(function () { getMessages() }, 1000);
    window.setInterval(function () { getOnlineUsersCount() }, 3000);
}
