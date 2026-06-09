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
1. Transferência de horário de aula: O processo de transferência ocorre sempre próximo ao final de cada semestre, sendo para isso publicada uma portaria da direção e um edital de transferência, onde são informadas as vagas existentes em cada turma (ciclo), os prazos e critérios de avaliação. Baixar o formulário de transferência que estará em formato word, preencher e enviar para o e-mail f137.vagas@fatec.sp.gov.br
2. Trancamento de matrícula: A solicitação deve ser feita através formulário Requerimento Geral na opção "Trancamento de Matrícula (exceto para ingressantes)" Depois preencher a justificativa. Não disponível para alunos ingressantes. Link: https://docs.google.com/forms/d/e/1FAIpQLSdvu5Za58KCjSNiuihHkEFvBy6seB0M_raUh6Yo0_oRWoiHuw/viewform?usp=sf_link
3. Declaração acadêmica: Tipos: Atestado de Matricula Ingressante com portaria: O Atestado de Matricula Ingressante apresenta informações tais como  o RA, RG o curso a portaria do curso e a data em que efetuou a matrícula - Atestado de Matricula Simples: Atestado de Matricula Simples contém informações pertinentes ao curso e o periodo referente a matrícula do aluno - Atestado Geral: Atestado que Contempla as Disciplinas do Aluno, A Portaria do Curso e a Previsao de Conclusao do Curso. Solicitação no SIGA. link: https://siga.cps.sp.gov.br/sigaaluno/app.aspx
4. Calendário acadêmico 2026.
5. Estágio obrigatório: Estágio Curricular Supervisionado. Total de horas: 240 horas. Obrigatório a partir do 3º Semestre. Equiparam-se ao estágio as atividades de extensão, de monitoria, iniciação científica e/ou desenvolvimento tecnológico e inovação na Educação Superior, desenvolvidas pelo estudante. Os contratos devem ser enviados pelo link de requerimento geral da faculdade na opção de requerimento "Assinatura de Estágio": https://docs.google.com/forms/d/e/1FAIpQLSdvu5Za58KCjSNiuihHkEFvBy6seB0M_raUh6Yo0_oRWoiHuw/viewform?usp=sf_link
6. Disciplinas e professores: Consultar no Portal do Aluno. Grade curricular disponível online.

INSTRUÇÕES:
- Responda em português brasileiro
- Seja conciso mas completo
- Se não souber algo, oriente contatar: secretaria@fatec.edu.br ou (11) 3333-4444
- Não invente informações
- NUNCA use formato markdown de links como [texto](url). Sempre escreva a URL diretamente no texto, por exemplo: "Acesse o formulário em: https://..."
- IMPORTANTE: Não se apresente novamente a cada mensagem. A apresentação já foi feita. Vá direto ao ponto respondendo a dúvida do aluno`;

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

    const transferKeywords = ['transferência de horário', 'transferir horário', 'transferir meu horário', 'trocar horário', 'mudar horário', 'transferência', 'transferencia'];
    const isTransferencia = transferKeywords.some(kw => text.toLowerCase().includes(kw));

    const downloads = isTransferencia ? [
      {
        url: 'http://localhost:5000/download/edital',
        icon: '📄',
        label: 'Baixar Edital de Transferência'
      },
      {
        url: 'http://localhost:5000/download/formulario',
        icon: '📝',
        label: 'Baixar Formulário de Transferência'
      }
    ] : null;

    addGalvaoMsg(reply, downloads);

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

function addGalvaoMsg(text, downloads = null) {
  const box = document.getElementById('msgBox');
  const row = document.createElement('div');
  row.className = 'msg-row sofia';

  const downloadHtml = downloads ? `
    <div class="download-btns">
      ${downloads.map(d => `
        <a href="${d.url}" download class="download-btn">
          ${d.icon} ${d.label}
        </a>
      `).join('')}
    </div>
  ` : '';

  row.innerHTML = `
    <div class="msg-avatar sofia">
      <img src="galvao_foto.png" alt="G" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">
    </div>
    <div class="bubble sofia">
      <div class="bubble-name">Prof. Galvão · Secretaria Fatec</div>
      ${formatMsg(text)}
      ${downloadHtml}
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
    .replace(/(https?:\/\/[^\s\)]+)/g, '<a href="$1" target="_blank" style="color:var(--sofia-blue);word-break:break-all;">$1</a>')
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

const VIDEO_ACTIONS = {
  'calendario': {
    chatMessage: `📅 Aqui estão as datas mais importantes do Calendário Acadêmico 2026:

**1º SEMESTRE:**
🔹 Início das aulas: 09/02/2026
🔹 Semana de Provas P01: 06 a 11/04/2026
🔹 Prazo de trancamento: até 13/05/2026
🔹 Semana de Provas P02: 08 a 13/06/2026
🔹 Término das aulas: 27/06/2026
🔹 Exames finais: 02 a 08/07/2026
🔹 Encerramento: 04/07/2026

**2º SEMESTRE:**
🔹 Início das aulas: 03/08/2026
🔹 Semana de Provas P01: 05 a 10/10/2026
🔹 Prazo de trancamento: até 29/10/2026
🔹 Semana de Provas P02: 23 a 28/11/2026
🔹 Término das aulas: 14/12/2026
🔹 Exames finais: 17 a 23/12/2026
🔹 Encerramento: 21/12/2026

**FERIADOS E RECESSOS:**
🔹 Carnaval: 14 a 18/02
🔹 Páscoa: 03 e 04/04
🔹 Tiradentes: 20 e 21/04
🔹 Dia do Trabalho: 01 e 02/05
🔹 Corpus Christi: 04 a 06/06
🔹 Recesso: 10 a 25/07
🔹 Independência: 07/09
🔹 N. Sra. Aparecida: 12/10
🔹 Dia do Professor: 15/10
🔹 Finados: 02/11
🔹 Consciência Negra: 20 e 21/11
🔹 Natal: 25/12

Estou fazendo o download do calendário completo para você! 📥`,
    downloads: [
      { url: 'http://localhost:5000/download/calendario', name: 'Calendario_Fatec_2026.pdf' }
    ]
  },
  'trancamento': {
    chatMessage: `Para solicitar o trancamento de sua matrícula, siga estas orientações:

1. Acesse o formulário de Requerimento Geral da faculdade através do link: https://docs.google.com/forms/d/e/1FAIpQLSdvu5Za58KCjSNiuihHkEFvBy6seB0M_raUh6Yo0_oRWoiHuw/viewform?usp=sf_link
2. Selecione a opção "Trancamento de Matrícula (exceto para ingressantes)".
3. Preencha a justificativa solicitada no formulário e envie.`,
  },
  'estagio': {
    chatMessage: `O Estágio Curricular Supervisionado é uma etapa fundamental da sua formação acadêmica, sendo obrigatório a partir do 3º semestre e totalizando 240 horas de atividades.
É importante ressaltar que atividades como monitoria, iniciação científica, extensão e desenvolvimento tecnológico ou inovação desenvolvidas na Educação Superior podem ser equiparadas ao estágio.

Todo contrato de estágio deve ser enviado através do formulário de Requerimento Geral, selecionando a opção "Assinatura de Estágio".

Você pode acessar o formulário pelo link: https://docs.google.com/forms/d/e/1FAIpQLSdvu5Za58KCjSNiuihHkEFvBy6seB0M_raUh6Yo0_oRWoiHuw/viewform?usp=sf_link
`,
  },
  'declaracao': {
    chatMessage: `Existem três tipos de declarações disponíveis:
**1. Atestado de Matrícula Ingressante com portaria:** Contém informações como RA, RG, curso, portaria do curso e a data da matrícula.
**2. Atestado de Matrícula Simples:** Contém informações sobre o curso e o período da matrícula.
**3. Atestado Geral:** Contempla as disciplinas cursadas, a portaria do curso e a previsão de conclusão.

Para realizar a solicitação, acesse o portal do aluno no link: https://siga.cps.sp.gov.br/sigaaluno/app.aspx`,
  },
  'disciplinas': {
    chatMessage: `2º semestre do curso de Análise e Desenvolvimento de Sistemas (ADS), os dados atuais são:

**Segunda-feira: Contabilidade (Prof. Bonetti)**
**Terça-feira: Engenharia de Software I (Prof. Josenyr)**
**Quarta-feira: Comunicação e Expressão (Prof. Admarcio)**
**Quinta-feira: Linguagem de Programação (Prof. Daniel)**
**Sexta-feira: Cálculo (Prof. Ricardo)**
**Sábado: Sistemas de Informação (Prof. Marchiori) e Inglês II (Prof. Cristiane)**`,
  },
  'horario': {
    chatMessage: `Para que este processo ocorra, é necessário aguardar a publicação da portaria da direção e do edital de transferência, que são divulgados próximo ao final de cada semestre. Estes documentos informam as vagas existentes em cada turma, os prazos e os critérios de avaliação.

Quando o edital for publicado, você deverá baixar o formulário de transferência (disponível em formato Word), preenchê-lo e enviá-lo para o e-mail **f137.vagas@fatec.sp.gov.br**.

Estou fazendo o download para você do Edital mais recente junto com formulário de transferência.
`,
downloads: [
  {url: 'http://localhost:5000/download/edital', name: 'Edital_Transferencia_Fatec.pdf' },
  {url: 'http://localhost:5000/download/formulario', name: 'Formulario_Transferencia_Fatec.docx' }
]
  }
};

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
    video.classList.remove('active');
    placeholder.style.display = 'flex';
    placeholder.querySelector('.play-hint').textContent = '⚠️ Vídeo em produção...';
  });

  video.onended = () => {
    btn.classList.remove('active');
  };

  // Executa ações específicas do serviço
  const action = VIDEO_ACTIONS[service];
  if (action) {

    // 1. Envia mensagem no chat
    if (action.chatMessage) {
      setTimeout(() => {
        addGalvaoMsg(action.chatMessage);
      }, 1500);
    }

    // 2. Inicia download automático
    if (action.downloads) {
      action.downloads.forEach((file, i) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = file.url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 2000 + (i * 1500));
      });
    }
  }
}