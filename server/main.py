from flask import Flask, request, jsonify 
from flask_cors import CORS
import google.generativeai as genai
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.id import ID
from appwrite.query import Query
import json
import re
import time

app = Flask(__name__)
CORS(app)

# Appwrite Configuration
client = Client()
client.set_endpoint('https://fra.cloud.appwrite.io/v1')
client.set_project('681741510036154ccdfe')
client.set_key('standard_13ebc858352d25697bcfc552c19ded6d8f8b7c1fef890c5d26bb99dbf9df7d278d7412bfb908a571a9a07c6dccb25f1bc200c42476a2d37113b989816ad61a4d4ba93b5e634af651f55af083710eaa44c301beeb4deac1ed648e1a37bb3fe49147150b24dd369b45b808fef3e6dd0b5b21d82a7ce1d283898dfc8345a801c3cc')
databases = Databases(client)

# Gemini AI config
genai.configure(api_key="")
model = genai.GenerativeModel("gemini-2.0-flash-thinking-exp")

def save_gemini_response_to_json(response_text, filename="movies.json"):
    try:
        # Extract JSON from code block using regex
        match = re.search(r"```json\s*(.*?)\s*```", response_text, re.DOTALL)
        if not match:
            raise ValueError("No valid JSON block found in the response.")

        json_str = match.group(1).strip()

        # Parse string into Python object
        data = json.loads(json_str)

        # Save to JSON file
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

        print(f"Saved data to {filename}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all origins
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@app.route("/Bot", methods=["GET"])
def bot():
    response = model.generate_content("Hello, how are you?")
    print(response.text)
    return jsonify({"response": response.text})

@app.route("/ClientId", methods=["POST"])
def client_id():
    data = request.get_json()
    user_id = data.get("userId")
    print(f"Received user ID: {user_id}")
    return jsonify({"status": "success", "userId": user_id}), 200

def fetchMovies():
    try:
        documents = databases.list_documents(
            database_id="6817433a002eaa0dbad0",
            collection_id="6817436800249891b745",
        )
        # print("Movies:", documents)
        return documents
    except Exception as e:
        print("Error fetching movies:", str(e))
        return "Error fetching movies"

@app.route("/UserDocuments", methods=["POST"])
def list_user_documents():
    data = request.get_json()
    user_id = data.get("userId")
    print(f"Fetching documents for user ID: {user_id}")
    
    try:
        documents = databases.list_documents(
            database_id="6817433a002eaa0dbad0",  # your actual database ID
            collection_id="68175890000bee7b5e72",  # your actual collection ID
            queries=[Query.equal("userId", user_id)]
        )
        Movies = fetchMovies()

        text = f"""
        Now based on the movie data {Movies} and the user preferences {documents},
        generate a personalized movie recommendation for the user.
        in the format of a JSON object with the following fields:
        - id (should start from 1 and increment for each movie)
        - title
        - poster
        - description
        - year
        - rating
        - genres
        """

        response = model.generate_content(text)
        print(response.text)
        save_gemini_response_to_json(response.text)
        time.sleep(5)
        # print("Movies:", Movies)
        # print("Documents:", documents)
        return jsonify(documents), 200
    except Exception as e:
        print("Error fetching documents:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
