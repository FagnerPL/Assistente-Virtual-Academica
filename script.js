const SERVICES = [
  { id: 'horario', icon: '🔄', color: '#185FA5', lightColor: '#E6F1FB', title: 'Transferência de Horário', desc: 'Solicite a mudança de turno ou horário de uma disciplina. Período: 1ª a 2ª semana do semestre.', steps: ['Acesse o Portal Acadêmico', 'Selecione a disciplina', 'Escolha o novo horário disponível', 'Aguarde confirmação em 48h'] },
  { id: 'trancamento', icon: '⏸', color: '#D85A30', lightColor: '#FAECE7', title: 'Trancamento de Matrícula', desc: 'Interrompa temporariamente seus estudos sem perda do vínculo institucional.', steps: ['Verifique o período de trancamento', 'Preencha o formulário online', 'Anexe documentação necessária', 'Protocole na Secretaria'] },
  { id: 'declaracao', icon: '📄', color: '#1D9E75', lightColor: '#E1F5EE', title: 'Declaração Acadêmica', desc: 'Solicite declarações de matrícula, frequência, conclusão de curso e histórico escolar.', steps: ['Escolha o tipo de declaração', 'Informe a finalidade', 'Prazo de entrega: 5 dias úteis', 'Retirada: física ou digital'] },
  { id: 'calendario', icon: '📅', color: '#BA7517', lightColor: '#FAEEDA', title: 'Calendário Acadêmico', desc: 'Consulte datas de matrículas, provas, recessos, formaturas e eventos institucionais.', steps: ['Início do semestre: Fev / Ago', 'Provas finais: Jun / Dez', 'Recesso Julho e Janeiro', 'Formaturas: Julho e Dezembro'] },
  { id: 'estagio', icon: '🏢', color: '#534AB7', lightColor: '#EEEDFE', title: 'Estágio Obrigatório', desc: 'Orientações sobre horas exigidas, convênios, supervisão e documentação necessária.', steps: ['Verifique carga horária do curso', 'Encontre empresa conveniada', 'Assine o Termo de Compromisso', 'Entregue relatórios bimestrais'] },
  { id: 'disciplinas', icon: '📚', color: '#993C1D', lightColor: '#FAECE7', title: 'Disciplinas e Professores', desc: 'Consulte grades curriculares, ementas, professores responsáveis e salas de aula.', steps: ['Acesse o Portal do Aluno', 'Consulte a grade do curso', 'Veja horários por professor', 'Ementa disponível no sistema'] }
];

const systemPrompt = `Você é o Professor Galvão, assistente virtual inteligente e empático da Secretaria Acadêmica da Fatec.

PERSONALIDADE: Você é caloroso, profissional, direto e sempre resolutivo. Use linguagem formal mas acessível. Seja empático com as dificuldades dos estudantes.

SERVIÇOS QUE VOCÊ OFERECE:
1. Transferência de horário de aula: Período nas 2 primeiras semanas do semestre, via Portal Acadêmico.
2. Trancamento de matrícula: Disponível até o 60º dia do semestre. Documentos: formulário + justificativa. Máximo 2 trancamentos na graduação.
3. Declaração acadêmica: Tipos: matrícula ativa, histórico, frequência, conclusão. Prazo 5 dias úteis.
4. Calendário acadêmico 2025: 1º sem (Fev-Jun): Início 10/02, Matrículas 27-31/01, Provas Finais 09-20/06. 2º sem (Ago-Dez): Início 04/08, Matrículas 21-25/07, Provas Finais 24/11-05/12.
5. Estágio obrigatório: Carga horária varia por curso (200h a 400h). Documentos: TCE, plano de atividades, relatórios bimestrais.
6. Disciplinas e professores: Consultar no Portal do Aluno. Grade curricular disponível online.

INSTRUÇÕES:
- Responda em português brasileiro
- Seja conciso mas completo
- Se não souber algo, oriente contatar: secretaria@fatec.edu.br ou (11) 3333-4444
- Não invente informações`;

function renderServices() {
  const el = document.getElementById('svc-list');
  el.innerHTML = SERVICES.map(s => `
    <div style="background:var(--bg-sec);border-radius:12px;border:0.5px solid var(--border);padding:14px;margin-bottom:10px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <div style="width:38px;height:38px;border-radius:8px;background:${s.lightColor};display:flex;align-items:center;justify-content:center;font-size:18px;">${s.icon}</div>
        <div>
          <div style="font-size:14px;font-weight:500;color:var(--text);">${s.title}</div>
          <div style="font-size:11.5px;color:var(--text-sec);">${s.desc}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${s.steps.map((st,i) => `<div style="display:flex;align-items:center;gap:5px;font-size:11.5px;color:${s.color};background:${s.lightColor};padding:4px 10px;border-radius:20px;"><span style="width:16px;height:16px;border-radius:50%;background:${s.color};color:#fff;font-size:9px;display:flex;align-items:center;justify-content:center;font-weight:600;">${i+1}</span>${st}</div>`).join('')}
      </div>
      <button onclick="quickAskFromTab('${s.title}')" style="margin-top:10px;width:100%;padding:8px;border-radius:8px;border:0.5px solid ${s.color};background:transparent;color:${s.color};font-size:12.5px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;" onmouseover="this.style.background='${s.lightColor}'" onmouseout="this.style.background='transparent'">Iniciar atendimento ↗</button>
    </div>
  `).join('');
}

function quickAskFromTab(title) {
  switchTab('chat');
  setTimeout(() => quickAsk('Preciso de ajuda com: ' + title), 100);
}

function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach((b,i) => {
    b.classList.toggle('active', ['chat','persona','servicos'][i] === id);
  });
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
}

function quickAsk(text) {
  document.getElementById('userInput').value = text;
  sendMsg();
}

function setAvatarSpeaking(speaking) {
  const frame = document.getElementById('avatarFrame');
  const bars = document.getElementById('audioBars');
  const dot = document.getElementById('statusDot');
  const status = document.getElementById('statusText');

  if (speaking) {
    frame.classList.add('speaking');
    bars.classList.add('active');
    dot.classList.add('active');
    status.textContent = 'Falando...';
  } else {
    frame.classList.remove('speaking');
    bars.classList.remove('active');
    dot.classList.remove('active');
    status.textContent = 'Assistente Virtual · Secretaria Acadêmica · Fatec';
  }
}

async function sendMsg() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  addUserMsg(text);
  const typingId = addTyping();

  try {
    const resp = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, system: systemPrompt })
    });

    const data = await resp.json();
    removeTyping(typingId);

    const reply = data.text || 'Desculpe, não consegui processar sua solicitação.';
    addGalvaoMsg(reply);

  } catch(e) {
    removeTyping(typingId);
    console.error('Erro:', e);
    addGalvaoMsg('Desculpe, ocorreu um erro de conexão. Tente novamente ou entre em contato pelo e-mail secretaria@fatec.edu.br.');
  }
}

let typingCounter = 0;

function addTyping() {
  const id = 'typing-' + (++typingCounter);
  const box = document.getElementById('msgBox');
  const row = document.createElement('div');
  row.className = 'msg-row sofia';
  row.id = id;
  row.innerHTML = `
    <div class="msg-avatar sofia">
      <img src="galvao_foto.png" alt="G" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">
    </div>
    <div class="bubble sofia"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
  `;
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function addUserMsg(text) {
  const box = document.getElementById('msgBox');
  const row = document.createElement('div');
  row.className = 'msg-row user';
  row.innerHTML = `
    <div class="msg-avatar user-av">EU</div>
    <div class="bubble user">${escHtml(text)}</div>
  `;
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}

function addGalvaoMsg(text) {
  const box = document.getElementById('msgBox');
  const row = document.createElement('div');
  row.className = 'msg-row sofia';
  row.innerHTML = `
    <div class="msg-avatar sofia">
      <img src="galvao_foto.png" alt="G" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">
    </div>
    <div class="bubble sofia">
      <div class="bubble-name">Prof. Galvão · Secretaria Fatec</div>
      ${formatMsg(text)}
    </div>
  `;
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}

function escHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatMsg(text) {
  return escHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

renderServices();

function setMode(mode) {
  document.getElementById('modeChat').classList.toggle('active', mode === 'chat');
  document.getElementById('modeAvatar').classList.toggle('active', mode === 'avatar');
  document.getElementById('chatTabs').style.display = mode === 'chat' ? 'flex' : 'none';
  document.getElementById('btnChat').classList.toggle('active', mode === 'chat');
  document.getElementById('btnAvatar').classList.toggle('active', mode === 'avatar');
}

function playVideo(service, btn) {
  const video = document.getElementById('galvaoVideo');
  const placeholder = document.getElementById('videoPlaceholder');

  // Marca botão ativo
  document.querySelectorAll('.avatar-svc-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Troca o vídeo
  video.src = `videos/${service}.mp4`;
  video.classList.add('active');
  placeholder.style.display = 'none';

  video.load();
  video.play().catch(() => {
    // Vídeo não encontrado ainda
    video.classList.remove('active');
    placeholder.style.display = 'flex';
    placeholder.querySelector('.play-hint').textContent = '⚠️ Vídeo em produção...';
  });

  video.onended = () => {
    btn.classList.remove('active');
  };
}