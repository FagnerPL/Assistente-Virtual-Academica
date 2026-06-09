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

def carregar_calendario():
    try:
        with open('calendario.txt', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Calendário acadêmico não disponível no momento."

CALENDARIO = carregar_calendario()

def carregar_disciplinas():
    try:
        with open('disciplinas.txt', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Grade de disciplinas não disponível no momento."

DISCIPLINAS = carregar_disciplinas()

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.json
        message = data.get('message')
        system_prompt = data.get('system')

        # Gera resposta com Gemini
        prompt = f"{system_prompt}\n\nCALENDÁRIO ACADÊMICO OFICIAL 2026:\n{CALENDARIO}\n\nGRADE DE DISCIPLINAS E HORÁRIOS:\n{DISCIPLINAS}\n\nAluno: {message}"
        response = gemini_client.models.generate_content(
            model="gemini-3.1-flash-lite", #gemini-3-flash-preview
            contents=prompt
        )
        text_response = response.text

        return jsonify({"text": text_response})

    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/download/calendario', methods=['GET'])
def download_calendario():
    try:
        return send_file(
            'calendario_fatec_2026.pdf',
            as_attachment=True,
            download_name='Calendario_Fatec_2026.pdf'
        )
    except FileNotFoundError:
        return jsonify({"error": "Arquivo não encontrado"}), 404

@app.route('/download/edital', methods=['GET'])
def download_edital():
    try:
        return send_file(
            'download/edital_transferencia.pdf',
            as_attachment=True,
            download_name='Edital_Transferencia_Fatec.pdf'
        )
    except FileNotFoundError:
        return jsonify({"error": "Arquivo não encontrado"}), 404

@app.route('/download/formulario', methods=['GET'])
def download_formulario():
    try:
        return send_file(
            'download/formulario_transferencia.docx',
            as_attachment=True,
            download_name='Formulario_Transferencia_Fatec.docx'
        )
    except FileNotFoundError:
        return jsonify({"error": "Arquivo não encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)