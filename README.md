# 🎓 Assistente Virtual - Secretaria Acadêmica

Assistente virtual inteligente para atendimento automatizado da Secretaria Acadêmica, desenvolvido com IA Generativa (Google Gemini).

---

## 📋 Funcionalidades

- 🔄 Transferência de horário de aula
- ⏸ Trancamento de matrícula
- 📄 Solicitação de declaração acadêmica
- 📅 Informações sobre calendário acadêmico
- 🏢 Orientação sobre estágio obrigatório
- 📚 Informações sobre disciplinas e professores

---

## 🛠️ Tecnologias utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python + Flask
- **IA:** Google Gemini API (gratuita)

---

## ⚙️ Pré-requisitos

- Python 3.8 ou superior
- Conta Google para obter a API Key do Gemini

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

### 2. Crie o ambiente virtual

```bash
python3 -m venv venv
```

### 3. Ative o ambiente virtual

**Linux / WSL / Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

### 4. Instale as dependências

```bash
pip install flask flask-cors google-genai python-dotenv
```

### 5. Configure a API Key

Obtenha sua chave gratuita em: [aistudio.google.com](https://aistudio.google.com)

Crie um arquivo `.env` na raiz do projeto:

```bash
echo "GEMINI_API_KEY=SUA_CHAVE_AQUI" > .env
```

> ⚠️ Substitua `SUA_CHAVE_AQUI` pela sua chave real do Gemini.

---

## ▶️ Como rodar

### 1. Ative o ambiente virtual (se não estiver ativo)

**Linux / WSL / Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

### 2. Inicie o servidor Flask

```bash
python app.py
```

Você verá:
```
* Running on http://127.0.0.1:5000
```

### 3. Abra o frontend

Abra o arquivo `index.html` no navegador.

> No WSL, use o comando:
> ```bash
> explorer.exe index.html
> ```

---

## 📁 Estrutura do projeto

```
projeto/
├── app.py          # Servidor Flask (backend)
├── index.html      # Interface do chat (frontend)
├── script.js       # Lógica do chat e chamadas à API
├── styles.css      # Estilização da interface
├── .env            # Variáveis de ambiente (não vai ao GitHub)
├── .gitignore      # Arquivos ignorados pelo Git
└── README.md       # Este arquivo
```

---

## ⚠️ Observações importantes

- A pasta `venv/` **não está no repositório** — você precisa criá-la localmente seguindo os passos acima
- O arquivo `.env` **não está no repositório** — você precisa criá-lo com sua chave
- A **API Key não deve ser compartilhada** publicamente
- O servidor Flask precisa estar rodando para o chat funcionar
- Este projeto usa o plano **gratuito** do Google Gemini (1500 requisições/dia)

---

## 🔑 Como obter a API Key do Google Gemini

1. Acesse [aistudio.google.com](https://aistudio.google.com)
2. Faça login com sua conta Google
3. Clique em **"Get API Key"**
4. Clique em **"Create API Key"**
5. Copie a chave gerada
6. Crie o arquivo `.env` na pasta do projeto com o conteúdo:
```
GEMINI_API_KEY=SUA_CHAVE_AQUI
```