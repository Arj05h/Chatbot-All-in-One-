const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const attachButton =
    document.getElementById("attachButton");

const fileInput =
    document.getElementById("fileInput");

const removeFile =
    document.getElementById("removeFile");

const filePreview =
    document.getElementById("filePreview");

const fileName =
    document.getElementById("fileName");

const chatMessages =
    document.getElementById("chatMessages");

const typingIndicator =
    document.getElementById("typingIndicator");

const clearChat =
    document.getElementById("clearChat");


let selectedFile = null;

let conversationHistory = [];


/* ==========================================
   TIME
========================================== */

function getCurrentTime() {

    return new Date().toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* ==========================================
   ADD MESSAGE
========================================== */

function addMessage(
    message,
    sender,
    filename = null
) {

    const messageDiv =
        document.createElement("div");

    messageDiv.classList.add(
        "message"
    );


    if (sender === "user") {

        messageDiv.classList.add(
            "user-message"
        );

    } else {

        messageDiv.classList.add(
            "bot-message"
        );
    }


    const avatar =
        document.createElement("div");

    avatar.classList.add("avatar");

    avatar.textContent =
        sender === "user"
            ? "👤"
            : "🤖";


    const wrapper =
        document.createElement("div");

    wrapper.classList.add(
        "message-wrapper"
    );


    const bubble =
        document.createElement("div");

    bubble.classList.add(
        "message-bubble"
    );


    if (filename) {

        bubble.textContent =
            `📎 ${filename}\n\n${message}`;

    } else {

        bubble.textContent =
            message;
    }


    const time =
        document.createElement("div");

    time.classList.add(
        "message-time"
    );

    time.textContent =
        getCurrentTime();


    wrapper.appendChild(bubble);

    wrapper.appendChild(time);

    messageDiv.appendChild(avatar);

    messageDiv.appendChild(wrapper);

    chatMessages.appendChild(
        messageDiv
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* ==========================================
   TYPING
========================================== */

function showTyping() {

    typingIndicator.classList.remove(
        "hidden"
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


function hideTyping() {

    typingIndicator.classList.add(
        "hidden"
    );
}


/* ==========================================
   FILE BUTTON
========================================== */

attachButton.addEventListener(
    "click",
    function () {

        fileInput.click();

    }
);


/* ==========================================
   FILE SELECT
========================================== */

fileInput.addEventListener(
    "change",
    function () {

        const file =
            fileInput.files[0];


        if (!file) {

            return;
        }


        const allowedTypes = [

            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf"

        ];


        if (
            !allowedTypes.includes(
                file.type
            )
        ) {

            alert(
                "Only JPG, PNG, WEBP, GIF and PDF files are allowed."
            );

            fileInput.value = "";

            return;
        }


        const maxSize =
            50 * 1024 * 1024;


        if (
            file.size > maxSize
        ) {

            alert(
                "Maximum file size is 50 MB."
            );

            fileInput.value = "";

            return;
        }


        selectedFile = file;

        fileName.textContent =
            file.name;

        filePreview.classList.remove(
            "hidden"
        );

    }
);


/* ==========================================
   REMOVE FILE
========================================== */

removeFile.addEventListener(
    "click",
    function () {

        selectedFile = null;

        fileInput.value = "";

        filePreview.classList.add(
            "hidden"
        );

    }
);


/* ==========================================
   SEND MESSAGE
========================================== */

async function sendMessage() {

    const message =
        messageInput.value.trim();


    if (
        !message &&
        !selectedFile
    ) {

        return;
    }


    const filename =
        selectedFile
            ? selectedFile.name
            : null;


    addMessage(
        message || "Analyze this file.",
        "user",
        filename
    );


    const historyForServer =
        conversationHistory
            .slice(-20)
            .map(item =>
                `${item.role}: ${item.content}`
            )
            .join("\n");


    messageInput.value = "";


    sendButton.disabled =
        true;

    messageInput.disabled =
        true;

    attachButton.disabled =
        true;


    showTyping();


    try {

        const formData =
            new FormData();


        formData.append(
            "message",
            message || "Analyze this file."
        );


        formData.append(
            "history",
            historyForServer
        );


        if (selectedFile) {

            formData.append(
                "file",
                selectedFile
            );
        }


        const response =
            await fetch(
                "/chat",
                {
                    method: "POST",
                    body: formData
                }
            );


        const data =
            await response.json();


        hideTyping();


        if (!response.ok) {

            addMessage(
                data.response ||
                "Something went wrong.",
                "bot"
            );

        } else {

            addMessage(
                data.response,
                "bot"
            );
        }


        conversationHistory.push({

            role: "user",

            content:
                message ||
                `Uploaded file: ${filename}`
        });


        conversationHistory.push({

            role: "assistant",

            content:
                data.response
        });


    } catch (error) {

        hideTyping();

        console.error(error);

        addMessage(
            "Server se connection nahi ho pa raha. ❌",
            "bot"
        );

    }


    selectedFile = null;

    fileInput.value = "";

    filePreview.classList.add(
        "hidden"
    );


    sendButton.disabled =
        false;

    messageInput.disabled =
        false;

    attachButton.disabled =
        false;


    messageInput.focus();
}


/* ==========================================
   SEND BUTTON
========================================== */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* ==========================================
   ENTER KEY
========================================== */

messageInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);


/* ==========================================
   CLEAR CHAT
========================================== */

clearChat.addEventListener(
    "click",
    function () {

        conversationHistory = [];

        selectedFile = null;

        fileInput.value = "";

        filePreview.classList.add(
            "hidden"
        );


        chatMessages.innerHTML = `

            <div class="message bot-message">

                <div class="avatar">
                    🤖
                </div>

                <div class="message-wrapper">

                    <div class="message-bubble">
                        Chat cleared! 🧹

                        <br><br>

                        How can I help you?
                    </div>

                    <div class="message-time">
                        ${getCurrentTime()}
                    </div>

                </div>

            </div>

        `;
    }
);