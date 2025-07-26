async function carregaRacas() {
  try {
    //prettier-ignore
    let response = await fetch('https://api.thecatapi.com/v1/breeds/');
    if (!response.ok) {
      throw new Error('Erro ao carregar raças de gato!');
    }
    let racas = await response.json();
    inicializaSelecaoDeRaca(racas);
  } catch (erro) {
    console.error(erro);
  }
}

function inicializaSelecaoDeRaca(racas) {
  let racaSelecionada = document.getElementById('racaSelecionada');

  if (!(racaSelecionada instanceof HTMLSelectElement)) return;

  limpaSelecao(racaSelecionada);
  populaSelecao(racas, racaSelecionada);
  adicionaEventoSelecao(racas, racaSelecionada);
  carregarPrimeiraImagem(racaSelecionada);
}

function limpaSelecao(racaSelecionada) {
  while (racaSelecionada.firstChild) {
    racaSelecionada.removeChild(racaSelecionada.firstChild);
  }
}

function populaSelecao(racas, racaSelecionada) {
  racas.forEach((raca) => {
    let opcao = document.createElement('option');
    opcao.value = raca.id;
    opcao.textContent = raca.name;
    racaSelecionada.appendChild(opcao);
  });
}

function adicionaEventoSelecao(racas, racaSelecionada) {
  racaSelecionada.addEventListener('change', () => {
    let idSelecionado = racaSelecionada.value;
    //busca no array racas a raça cujo id corresponde ao valor selecionado no dropdown.
    let selecionaRaca = racas.find((raca) => raca.id === idSelecionado);
    if (selecionaRaca) {
      atualizaInfoRaca(selecionaRaca);
    }
  });
}

function carregarPrimeiraImagem(racaSelecionada) {
  let evento = new Event('change');
  // Dispara o evento 'change' no elemento racaSelecionada.
  // para carregar a primeira raça automaticamente.
  racaSelecionada.dispatchEvent(evento);
}

function atualizaInfoRaca(raca) {
  if (raca) {
    carregaImagem(raca.id);
  }
}

async function carregaImagem(racaId) {
  try {
    //prettier-ignore
    let response = await fetch(`https://api.thecatapi.com/v1/images/search?raca_ids=${racaId}`);
    if (!response.ok) {
      throw new Error('Erro ao carregar imagem de gato.');
    }
    let imagens = await response.json();
    console.log(imagens);
    exibeImagem(imagens);
  } catch (erro) {
    console.error(erro);
  }
}

function exibeImagem(imagens) {
  let divImagem = document.getElementById('imagens');

  if (divImagem instanceof HTMLDivElement) {
    limpaSelecao(divImagem);

    if (imagens.length > 0) {
      let imagem = document.createElement('img');
      imagem.src = imagens[0].url;
      imagem.width = 400;
      imagem.height = 320;
      divImagem.appendChild(imagem);
    }
  }
}

document.addEventListener('DOMContentLoaded', carregaRacas);
