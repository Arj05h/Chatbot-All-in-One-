from flask import Flask, render_template, request, jsonify
from google import genai
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

import os
import tempfile


# --------------------------------------------------
# Load environment variables
# --------------------------------------------------

load_dotenv()

app = Flask(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY .env file mein nahi mili."
    )


# --------------------------------------------------
# Gemini Client
# --------------------------------------------------

client = genai.Client(
    api_key=GEMINI_API_KEY
)


# --------------------------------------------------
# Flask Upload Settings
# --------------------------------------------------

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB

app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE


ALLOWED_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
    "pdf"
}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )


# --------------------------------------------------
# Home
# --------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")


# --------------------------------------------------
# Chat API
# --------------------------------------------------

@app.route("/chat", methods=["POST"])
def chat():

    temp_path = None

    try:

        user_message = request.form.get(
            "message",
            ""
        ).strip()

        history_text = request.form.get(
            "history",
            ""
        )

        uploaded_file = request.files.get(
            "file"
        )


        # ------------------------------------------
        # Validate message
        # ------------------------------------------

        if not user_message:

            return jsonify({
                "response": "Please type a message."
            }), 400


        # ------------------------------------------
        # Build conversation context
        # ------------------------------------------

        conversation_context = ""

        if history_text:

            conversation_context = (
                "\n\nPrevious conversation:\n"
                + history_text[-12000:]
            )


        # ------------------------------------------
        # System instructions
        # ------------------------------------------

        prompt = f"""
You are MyChatBot, a helpful and friendly AI assistant.

Important rules:

1. Answer clearly and accurately.
2. If the user speaks Hindi or Hinglish, reply in Hindi/Hinglish.
3. If the user speaks English, reply in English.
4. Help with programming, education, projects, resumes and general questions.
5. If an image or PDF is attached, carefully analyze it before answering.
6. If information is not available in the uploaded document, say that clearly.
7. Do not invent information from an uploaded file.
8. Use simple formatting where useful.
9. Keep the response useful but not unnecessarily long.

{conversation_context}

Current user question:

{user_message}
"""


        # ------------------------------------------
        # Normal text chat
        # ------------------------------------------

        if not uploaded_file or uploaded_file.filename == "":

            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt
            )

            answer = response.text

            return jsonify({
                "response": answer
            })


        # ------------------------------------------
        # Validate uploaded file
        # ------------------------------------------

        filename = secure_filename(
            uploaded_file.filename
        )

        if not filename:

            return jsonify({
                "response": "Invalid file name."
            }), 400


        if not allowed_file(filename):

            return jsonify({
                "response": (
                    "Unsupported file type. "
                    "Only JPG, JPEG, PNG, WEBP, GIF and PDF are allowed."
                )
            }), 400


        # ------------------------------------------
        # Save temporarily
        # ------------------------------------------

        extension = filename.rsplit(
            ".",
            1
        )[1].lower()


        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=f".{extension}"
        ) as temp_file:

            uploaded_file.save(
                temp_file.name
            )

            temp_path = temp_file.name


        # ------------------------------------------
        # Upload to Gemini Files API
        # ------------------------------------------

        gemini_file = client.files.upload(
            file=temp_path
        )


        # ------------------------------------------
        # Ask Gemini about uploaded file
        # ------------------------------------------

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=[
                gemini_file,
                prompt
            ]
        )


        answer = response.text


        return jsonify({
            "response": answer,
            "filename": filename
        })


    except Exception as e:

        print(
            "ERROR:",
            repr(e)
        )

        return jsonify({
            "response": (
                "Sorry, AI response generate nahi ho paya. "
                "Gemini API key, internet connection, "
                "model availability ya file size/type check karo."
            )
        }), 500


    finally:

        # ------------------------------------------
        # Delete temporary local file
        # ------------------------------------------

        if temp_path and os.path.exists(
            temp_path
        ):

            try:
                os.remove(temp_path)

            except Exception:
                pass


# --------------------------------------------------
# File Too Large
# --------------------------------------------------

@app.errorhandler(413)
def file_too_large(error):

    return jsonify({
        "response": (
            "File bahut large hai. "
            "Maximum file size 50 MB hai."
        )
    }), 413


# --------------------------------------------------
# Run Application
# --------------------------------------------------

if __name__ == "__main__":

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )