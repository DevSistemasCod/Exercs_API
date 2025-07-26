async function carregarRacas() {
  let racaSelecionada = document.getElementById('racas');

  //prettier-ignore
  if(racaSelecionada instanceof HTMLSelectElement){
    try {
      let response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) {
        throw new Error('Erro ao carregar raças de cachorro.');
      }
      let dados = await response.json();
      let racas = Object.keys(dados.message);

      inicializaSelecaoDeRaca(racas, racaSelecionada);
      efetuarSelecao(racaSelecionada);
      carregarPrimeiraImagem(racaSelecionada);
    } catch (erro) {
      console.error('Erro na solicitação:', erro);
    }
  }
}

function carregarPrimeiraImagem(racaSelecionada) {
  let evento = new Event('change');
  // Dispara o evento 'change' no elemento racaSelecionada.
  // para carregar a primeira raça automaticamente.
  racaSelecionada.dispatchEvent(evento);
}

function inicializaSelecaoDeRaca(racas, racaSelecionada) {
  limpaSelecao(racaSelecionada);

  racas.forEach((raca) => {
    const opcao = document.createElement('option');
    opcao.value = raca;
    opcao.text = raca;
    racaSelecionada.appendChild(opcao);
  });
}

function limpaSelecao(racaSelecionada) {
  while (racaSelecionada.firstChild) {
    racaSelecionada.removeChild(racaSelecionada.firstChild);
  }
}

function efetuarSelecao(racaSelecionada) {
  racaSelecionada.addEventListener('change', async () => {
    let raca = racaSelecionada.value;
    if (raca) {
      try {
        //prettier-ignore
        let response = await fetch(`https://dog.ceo/api/breed/${raca}/images/random`);
        if (!response.ok) {
          throw new Error('Erro ao carregar imagem de gato.');
        }
        let dados = await response.json();
        exibeImagem(dados);
      } catch (erro) {
        console.error(erro);
      }
    }
  });
}

async function exibeImagem(dados) {
  let divImagem = document.getElementById('imagens');

  if (divImagem instanceof HTMLDivElement) {
    limpaSelecao(divImagem);

    try {
      let imagem = document.createElement('img');
      imagem.src = dados.message;
      imagem.alt = 'Imagem do cachorro';
      imagem.width = 400;
      imagem.height = 320;
      divImagem.appendChild(imagem);
    } catch (erro) {
      console.error(erro);
    }
  }
}

document.addEventListener('DOMContentLoaded', carregarRacas);
