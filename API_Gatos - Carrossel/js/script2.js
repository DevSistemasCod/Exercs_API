// Função para carregar as raças de gato
function carregaRacas() {
    const URL_RACAS = 'https://api.thecatapi.com/v1/breeds';
    const racaSelecionada = document.querySelector('.racas');
    const carouselImages = document.querySelectorAll('.carousel-item img');
    const carousel = new bootstrap.Carousel(document.getElementById('carouselExampleRide'), {
        interval: 5000 // Intervalo de 5 segundos entre as imagens no carrossel
    });

    // Faz uma solicitação para obter as raças de gato
    fetch(URL_RACAS)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Erro ao carregar raças de gato.');
            }
            return resposta.json();
        })
        .then(function (racas) {
            // Preenche a seleção de raça com as opções obtidas
            preencheSelecaoDeRaca(racas, racaSelecionada);

            // Adiciona um ouvinte de evento para quando a seleção de raça é alterada
            racaSelecionada.addEventListener('change', function () {
                // Chama a função para atualizar as informações da raça e as imagens no carrossel
                atualizarInfoRaca(racaSelecionada, carouselImages, carousel);
            });

            // Inicialmente, aciona o evento de mudança para carregar as imagens da raça padrão
            racaSelecionada.dispatchEvent(new Event('change'));
        })
        .catch(function (erro) {
            console.error('Erro na solicitação:', erro);
        });
}

// Função para preencher a seleção de raça com as opções
function preencheSelecaoDeRaca(racas, racaSelecionada) {
    racaSelecionada.innerHTML = '';

    for (let i = 0; i < racas.length; i++) {
        const raca = racas[i];
        const opcao = document.createElement('option');
        opcao.value = raca.id;
        opcao.text = raca.name;
        racaSelecionada.appendChild(opcao);
    }
}

// Função para obter as imagens de gato a partir de uma URL
function obterImagensGato(url) {
    return fetch(url)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw Error('Erro ao carregar imagens de gato.');
            }
            return resposta.json();
        });
}

// Função para atualizar as informações da raça e as imagens no carrossel
function atualizarInfoRaca(racaSelecionada, carouselImages, carousel) {
    let raca = racaSelecionada.value;

    if (raca) {
        let url = `https://api.thecatapi.com/v1/images/search?breed_ids=${raca}&limit=3`;

        obterImagensGato(url)
            .then(function (imagens) {
                for (let i = 0; i < imagens.length && i < carouselImages.length; i++) {
                    carouselImages[i].src = imagens[i].url;
                    carouselImages[i].alt = `Imagem ${i + 1}`;
                    carouselImages[i].classList.remove('d-none'); // Mostra as imagens
					// a classe d-none é usada para ocultar um elemento HTML (no caso, as imagens do carrossel).
			   }

                // Atualiza o carrossel para a primeira imagem
                carousel.to(0);
            })
            .catch(function (erro) {
                console.error(erro);
            });
    }
}

// Evento que é acionado quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', function () {
    carregaRacas();
});
