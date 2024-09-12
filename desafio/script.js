let contadorCliques = 0;

document.getElementById('nome').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      mostrarCampos();
  }
}); //Evento criado para quando o usuário digitar seu nome, apenas clicar em "Enter".

function mostrarCampos() {
  const nome = document.getElementById('nome').value;
  if (!nome) {
      alert('Por favor, digite seu nome.');
      return;
  }
  
  // Esconde o campo inicial e mostra o campo de entrada de data
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('entrada').style.display = 'block';
  document.getElementById('mensagem').innerText = `Olá, ${nome}! Vamos ver se consigo adivinhar sua data de nascimento.\n\nDepois, vou lhe contar exatamente quantos dias faltam para o seu próximo aniversário!`;

  // Gera valores aleatórios quando o usuário clicar em "Adivinhar"
}

function adivinharAno() {
  const ano = Math.floor(Math.random() * (2015 - 1930 + 1)) + 1930;
  document.getElementById('ano').value = ano;
  incrementarContador(); // Incrementa o contador de cliques
}

function adivinharMes() {
  const mes = Math.floor(Math.random() * 12) + 1;
  document.getElementById('mes').value = mes;
  incrementarContador(); // Incrementa o contador de cliques
}

function adivinharDia() {
  const mes = parseInt(document.getElementById('mes').value) || 1;
  const ano = parseInt(document.getElementById('ano').value) || new Date().getFullYear();
  const ultimaDataDoMes = new Date(ano, mes, 0).getDate();
  const dia = Math.floor(Math.random() * ultimaDataDoMes) + 1;
  document.getElementById('dia').value = dia;
  incrementarContador(); // Incrementa o contador de cliques
}

function incrementarContador() {
  contadorCliques++;
  // Atualiza o texto no elemento HTML com a contagem atualizada
  document.getElementById('contadorCliques').innerText = `Número de cliques: ${contadorCliques}`;
}

function calcularAniversario() {
    const nome = document.getElementById('nome').value;
    const ano = parseInt(document.getElementById('ano').value);
    const mes = parseInt(document.getElementById('mes').value) - 1;
    const dia = parseInt(document.getElementById('dia').value);

    if (isNaN(ano) || isNaN(mes) || isNaN(dia)) {
        alert('Por favor, complete os campos de data.');
        return;
    }

    // Cria a data de nascimento
    const dataNascimento = new Date(ano, mes, dia);

    // Calcula a idade atual
    const hoje = new Date();
    let idadeAtual = hoje.getFullYear() - dataNascimento.getFullYear();

    // Verifica se o usuário já fez aniversário este ano
    const jaFezAniversarioEsteAno = (hoje.getMonth() > mes) || (hoje.getMonth() === mes && hoje.getDate() >= dia);
    if (!jaFezAniversarioEsteAno) {
        idadeAtual--; // Se não fez aniversário ainda, subtrai 1 da idade
    }

    // Verifica se o aniversário é hoje
    if (hoje.getDate() === dia && hoje.getMonth() === mes) {
        const mensagem = `🎉 Feliz Aniversário! 🎉\n\nParabéns, ${nome}! Hoje é o seu aniversário de ${idadeAtual + 1} anos! `;
        document.getElementById('mensagem').innerText = mensagem;
        return;
    }

    // Calcula a próxima data de aniversário
    const proximoAniversario = new Date(hoje.getFullYear(), mes, dia);
    if (hoje > proximoAniversario) {
        proximoAniversario.setFullYear(hoje.getFullYear() + 1);
    }

    // Calcula a diferença em dias para o próximo aniversário
    const diferencaEmMilissegundos = proximoAniversario - hoje;
    const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    // Formata dia e mês com dois dígitos
    const diaFormatado = String(dia).padStart(2, '0');
    const mesFormatado = String(mes + 1).padStart(2, '0');

  // Exibe a mensagem
  const mensagem = `Sua data de nascimento é ${diaFormatado}/${mesFormatado}/${ano}.\n\n Você tem ${idadeAtual} anos.\n\n Faltam ${diferencaEmDias} dias para você completar ${idadeAtual + 1} anos de idade.`;
  document.getElementById('mensagem').innerText = mensagem;
}

