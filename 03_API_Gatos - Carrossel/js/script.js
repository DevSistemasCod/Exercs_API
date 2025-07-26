async function carregaRacas() {
  try {
    let response = await fetch('https://api.thecatapi.com/v1/breeds');
    if (!response.ok) {
      throw new Error('Erro ao carregar raças de gato.');
    }
    let racas = await response.json();
    let racaSelecionada = document.querySelector('.racas');
    let carrosselImages = document.querySelectorAll('.carousel-item img');
    let carrossel = inicializarCarrossel('carouselExampleRide');

    preencheSelecaoDeRaca(racas, racaSelecionada);
    adicionarEventoMudanca(racaSelecionada, carrosselImages, carrossel);
    acionarMudancaInicial(racaSelecionada);
  } catch (erro) {
    console.error('Erro ao carregar raças de gato:', erro);
  }
}

function adicionarEventoMudanca(racaSelecionada, carrosselImages, carrossel) {
  racaSelecionada.addEventListener('change', async () => {
    await atualizarInfoRaca(racaSelecionada, carrosselImages, carrossel);
  });
}

function acionarMudancaInicial(racaSelecionada) {
  let evento = new Event('change');
  racaSelecionada.dispatchEvent(evento);
}

function inicializarCarrossel(id) {
  // O bootstrap.Carousel é uma classe JavaScript fornecida pela biblioteca Bootstrap. 
  // Ele é usado para criar uma instância funcional de um carrossel (um componente interativo de slides).
  //@ts-ignore  
  return new bootstrap.Carousel(document.getElementById(id), {
    interval: 5000, // Intervalo de 5 segundos entre as imagens no carrossel
  });
}

function preencheSelecaoDeRaca(racas, racaSelecionada) {
  limpaSelecao(racaSelecionada);

  racas.forEach((raca) => {
    const opcao = document.createElement('option');
    opcao.value = raca.id;
    opcao.textContent = raca.name;
    racaSelecionada.appendChild(opcao);
  });
}

function limpaSelecao(racaSelecionada) {
  while (racaSelecionada.firstChild) {
    racaSelecionada.removeChild(racaSelecionada.firstChild);
  }
}

async function atualizarInfoRaca(racaSelecionada, carrosselImages, carrossel) {
  let raca = racaSelecionada.value;
  if (!raca) return;

  try {
    //prettier-ignore
    let response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${raca}&limit=3`);
    if (!response.ok) {
      throw new Error('Erro ao carregar imagens de gato.');
    }
    let imagens = await response.json();

    imagens.forEach((imagem, indice) => {
      if (indice < carrosselImages.length) {
        const imgElement = carrosselImages[indice];
        imgElement.src = imagem.url;
        imgElement.alt = `Imagem ${indice + 1}`;
        imgElement.classList.remove('d-none'); // Mostra as imagens
      }
    });

    carrossel.to(0); // Volta ao início do carrossel
  } catch (erro) {
    console.error('Erro ao atualizar informações da raça:', erro);
  }
}

document.addEventListener('DOMContentLoaded', carregaRacas);
