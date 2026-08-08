# Chatbot-All-in-One-
# 🤖 Timepass AI

**Timepass AI** is a modern AI-powered personal assistant built using **Python, Flask, JavaScript, HTML, CSS, and Google Gemini API**.

It can answer questions, help with coding and projects, analyze uploaded images, and read/analyze PDF documents.

---

## ✨ Features

* 🤖 AI-powered chatbot using Google Gemini
* 💬 Natural language conversations
* 🇮🇳 Hindi & Hinglish support
* 🇬🇧 English support
* 🖼️ Image upload & analysis
* 📄 PDF upload & analysis
* 🧠 Ask questions about uploaded files
* 💻 Programming & project assistance
* 📎 File attachment support
* ⏳ Typing indicator
* 🧹 Clear chat functionality
* 📱 Responsive web interface
* 🔐 Secure API key using environment variables

---

## 🖼️ What Can Timepass AI Do?

### 💬 Normal Chat

Ask questions such as:

```text
What is Python?
```

```text
Explain Flask in simple words.
```

```text
Give me a Python project idea.
```

```text
Mujhe Python interview questions do.
```

---

### 🖼️ Image Analysis

Upload an image and ask questions about it.

Example:

```text
Is image mein kya hai?
```

```text
Explain this circuit diagram.
```

```text
What objects are visible in this image?
```

Supported image formats:

* JPG
* JPEG
* PNG
* WEBP
* GIF

---

### 📄 PDF Analysis

Upload a PDF and ask Timepass AI to analyze it.

Example:

```text
Is PDF ka summary do.
```

```text
Is document ke important points batao.
```

```text
Is PDF mein Python ke baare mein kya likha hai?
```

```text
Is resume mein meri skills kya hain?
```

---

## 🛠️ Technologies Used

| Technology        | Purpose                |
| ----------------- | ---------------------- |
| Python            | Backend programming    |
| Flask             | Web framework          |
| Google Gemini API | AI responses           |
| Google GenAI SDK  | Gemini API integration |
| HTML5             | Web structure          |
| CSS3              | User interface         |
| JavaScript        | Frontend functionality |
| python-dotenv     | Environment variables  |
| Gunicorn          | Production server      |

---

## 📂 Project Structure

```text
Timepass-AI-Chatbot/
│
├── .gitignore
├── README.md
├── app.py
├── requirements.txt
│
├── static/
│   ├── style.css
│   └── script.js
│
└── templates/
    └── index.html
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then:

```bash
cd Timepass-AI-Chatbot
```

---

### 2. Create Virtual Environment

Windows:

```bash
python -m venv .venv
```

---

### 3. Activate Virtual Environment

#### PowerShell

```powershell
.venv\Scripts\Activate.ps1
```

#### CMD

```cmd
.venv\Scripts\activate.bat
```

---

### 4. Install Dependencies

```bash
python -m pip install -r requirements.txt
```

---

## 🔑 Gemini API Setup

Timepass AI uses the Google Gemini API.

Create a Gemini API key from:

**Google AI Studio**

Then create a `.env` file in the project root:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```

### ⚠️ Security

**Never upload `.env` to GitHub.**

Your `.gitignore` should contain:

```text
.venv/
.env
__pycache__/
*.pyc
```

The API key should be stored only as an environment variable.

---

## ▶️ Run Locally

Start the Flask application:

```bash
python app.py
```

The application will run at:

```text
http://127.0.0.1:5000
```

Open the URL in your browser.

---

## 🧠 How It Works

### Normal Chat

```text
User
  ↓
Web Interface
  ↓
Flask Backend
  ↓
Gemini API
  ↓
AI Response
  ↓
Chat Interface
```

### Image / PDF Analysis

```text
User
  ↓
Upload Image / PDF
  ↓
Flask Backend
  ↓
Gemini Files API
  ↓
Gemini AI
  ↓
Analysis
  ↓
Chat Interface
```

---

## 📎 Supported Files

### Images

```text
.jpg
.jpeg
.png
.webp
.gif
```

### Documents

```text
.pdf
```

### Maximum File Size

```text
50 MB
```

---

## 🚀 Deployment

Timepass AI can be deployed on cloud platforms that support Python/Flask applications.

Example deployment flow:

```text
GitHub
   ↓
Cloud Platform
   ↓
Flask Application
   ↓
Gemini API
   ↓
Timepass AI
```

For production deployment, configure:

```text
GEMINI_API_KEY
```

as a secure environment variable on the hosting platform.

Do **not** put the API key directly inside `app.py`.

---

## 📸 Screenshots

Add your chatbot screenshot here:

```markdown
![Timepass AI Screenshot](screenshot.png)
```

You can upload your screenshot to the repository and replace `screenshot.png` with the actual image filename.

---

## 🔮 Future Improvements

Planned improvements include:

* 🎤 Voice input
* 🔊 AI voice responses
* 👤 User authentication
* 💾 Database-based chat history
* 🌙 Dark mode
* 📱 Android application
* 📤 Chat export
* 📚 Multiple document conversations
* 🔎 Advanced document search
* 🧠 Long-term AI memory
* ☁️ Cloud deployment
* 📊 Admin dashboard

---

## 👨‍💻 Author

### Arjun Singh

**B.Tech – Computer Science & Engineering**

Interested in:

* Python
* AI & Machine Learning
* Embedded Systems
* IoT
* Robotics
* Software Development

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

### 🤖 Timepass AI

> **Your personal AI assistant for questions, coding, images, and PDFs.**
