## Installation Instructions

0. Make sure that you have `Python 3`, `gcc`, `venv`, and `pip` installed.
1. Clone the repository

   ```powershell
       $ git clone https://github.com/sahrohit/ml-chatbot.git
       $ cd ml-chatbot
   ```

2. Installing Dependencies

   a. Backend

   > Create a python 3 venv, activate the environment and Install the project dependencies.

   ```powershell
       $ cd backend
       $ python -m venv venv
       $ venv\Scripts\Activate.ps1
       $ pip3 install -r requirements.txt
   ```

   b. Frontend

   > Install all the Node Modules.

   ```powershell
       $ cd frontend
       $ npm install
   ```

You have now successfully set up the project on your environment.

---

### After Setting Up

To initialize the backend, run `venv\Scripts\Activate.ps1` inside the backend folder.

- `python chat.py` - Open Chatbot in Terminal
- `python main.py` - Starts a server running at http://127.0.0.1:9696

To initialize the frontend inside the backend folder,

- `npm run dev` - Starts a Next App at http://localhost:3000
