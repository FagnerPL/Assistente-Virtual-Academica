from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai

app = Flask(__name__)
CORS(app, origins="*")

client = genai.Client(api_key="AIzaSyAvIdTwaRq0VrZpxJ8OnOs4EhBOYGuc5gA")

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 204
        
    try:
        data = request.json
        message = data.get('message')
        system_prompt = data.get('system')

        prompt = f"{system_prompt}\n\nAluno: {message}"

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        return jsonify({"text": response.text})
    
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)