// Função para carregar as raças de cachorro da API e preencher a seleção de raças
function carregarRacas() {
  const URL_RACAS = 'https://dog.ceo/api/breeds/list/all';
  const racaSelecionada = document.querySelector('.racas');
  const imagemCao = document.querySelector('.imagem-cachorro');

  // Faz uma solicitação à API para obter informações sobre raças de cachorro
  fetch(URL_RACAS)
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Erro ao carregar raças de cachorro.');
      }
      return resposta.json();
    })
    .then(function (dados) {
      // Extrai as raças do objeto de dados
      const racas = Object.keys(dados.message);
      // Preenche a seleção de raças com as raças obtidas da API
      preencheSelecaoDeRaca(racas, racaSelecionada);
      
      // Adiciona um ouvinte de evento para quando o usuário selecionar uma raça
      racaSelecionada.addEventListener('change', function () {
        // Atualiza a imagem do cachorro com base na raça selecionada
        atualizarInfoRaca(racaSelecionada, imagemCao);
      });

      // Simula um evento de mudança para carregar a primeira raça por padrão
      racaSelecionada.dispatchEvent(new Event('change'));
    })
    .catch(function (erro) {
      console.error('Erro na solicitação:', erro);
    });
}

// Função para preencher a seleção de raças com opções
function preencheSelecaoDeRaca(racas, racaSelecionada) {
  racaSelecionada.innerHTML = '';

  for (let i = 0; i < racas.length; i++) {
    const raca = racas[i];
    const opcao = document.createElement('option');
    opcao.value = raca;
    opcao.text = raca;
    racaSelecionada.appendChild(opcao);
  }
}

// Função para obter uma imagem de cachorro com base na URL fornecida e atualizar a imagem
function obterImagemCachorro(url, imagemCao) {
  imagemCao.src = '';  // Limpa a imagem existente
  fetch(url)
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Erro ao carregar imagem de cachorro.');
      }
      return resposta.json();
    })
    .then(function (dados) {
      // Atualiza o atributo src da imagem com a URL da imagem obtida
      imagemCao.src = dados.message; 
    })
    .catch(function (erro) {
      console.error(erro);
    });
}

// Função para atualizar a imagem do cachorro com base na raça selecionada
function atualizarInfoRaca(racaSelecionada, imagemCao) {
  let raca = racaSelecionada.value;
  
  if(raca){
    let url = `https://dog.ceo/api/breed/${raca}/images/random`;
    // Chama a função para obter e atualizar a imagem do cachorro com base na raça
    obterImagemCachorro(url, imagemCao);
  }
}

// Evento que é acionado quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', function () {
  // Chama a função para carregar as raças de cachorro
  carregarRacas();
});
