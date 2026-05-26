from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from google import genai
from elevenlabs.client import ElevenLabs
from dotenv import load_dotenv
import os
import io

load_dotenv()

app = Flask(__name__)
CORS(app, origins="*")

gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.json
        message = data.get('message')
        system_prompt = data.get('system')

        # Gera resposta com Gemini
        prompt = f"{system_prompt}\n\nAluno: {message}"
        response = gemini_client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )
        text_response = response.text

        return jsonify({"text": text_response})

    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)