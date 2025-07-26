async function buscarImagem(dataSelecionada) {
  //será necessário um cadastro como estudante para obter uma chave de acesso
  const apiKey = 'ddutt5o1zbszvYRunHwVJtOpLP1a03ULcOBO3EFq';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dataSelecionada}`;

  try {
    // prettier-ignore
    let resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error('Erro ao carregar imagem da NASA.');
    }
    let dadosImagem = await resposta.json();
    return dadosImagem;
  } catch (erro) {
    console.error('Erro na requisição à API da NASA:', erro);
  }
}

function atualizarImagemNaPagina(imagemElemento, urlDaImagem) {
  //prettier-ignore
  if ((imagemElemento instanceof HTMLImageElement) && (typeof urlDaImagem === 'string')) {
    imagemElemento.src = urlDaImagem;
  }
}

function inicializaAplicacao() {
  let entradaData = document.getElementById('data');
  let imagem = document.getElementById('imagem');

  //prettier-ignore
  if (!(entradaData instanceof HTMLInputElement) || !(imagem instanceof HTMLImageElement))
    return;

  entradaData.addEventListener('change', async () => {
    let dataSelecionada = entradaData.value;
    if (!dataSelecionada) return;

    let dados = await buscarImagem(dataSelecionada);
    if (dados && dados.url) {
      atualizarImagemNaPagina(imagem, dados.url);
    }
  });
}

document.addEventListener('DOMContentLoaded', inicializaAplicacao);
