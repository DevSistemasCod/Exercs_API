// Função para carregar as raças de gatos da API e preencher a seleção de raças
function carregaRacas() {
    const URL_RACAS = 'https://api.thecatapi.com/v1/breeds';
    const racaSelecionada = document.querySelector('.racas');
    const imagemGato = document.querySelector('.gato-imagem');

    // Faz uma solicitação à API para obter informações sobre raças de gatos
    fetch(URL_RACAS)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Erro ao carregar raças de gato.');
            }
            return resposta.json();
        })
        .then(function (racas) {
            // Preenche a seleção de raças com as raças obtidas da API
            preencheSelecaoDeRaca(racas, racaSelecionada);

            // Adiciona um ouvinte de evento para quando o usuário selecionar uma raça
            racaSelecionada.addEventListener('change', function () {
                // Atualiza a imagem do gato com base na raça selecionada
                atualizarInfoRaca(racaSelecionada, imagemGato);
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
        opcao.value = raca.id;
        opcao.text = raca.name;
        racaSelecionada.appendChild(opcao);
    }
}

// Função para obter uma imagem de gato com base na URL fornecida e atualizar a imagem
function obterImagemGato(url, imagemGato) {
   imagemGato.src = '';  // Limpa a imagem existente
    fetch(url)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw Error('Erro ao carregar imagem de gato.');
            }
            return resposta.json();
        })
        .then(function (imagens) {
            if (imagens.length > 0) {
                // Atualiza o atributo src da imagem com a URL da imagem obtida
                imagemGato.src = imagens[0].url;
            }
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

// Função para atualizar a imagem do gato com base na raça selecionada
function atualizarInfoRaca(racaSelecionada, imagemGato) {
    let raca = racaSelecionada.value;

    if (raca) {
        let url = `https://api.thecatapi.com/v1/images/search?breed_ids=${raca}&limit=1`;
        // Chama a função para obter e atualizar a imagem do gato com base na raça
        obterImagemGato(url, imagemGato);
    }
}

// Evento que é acionado quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', function () {
    // Chama a função para carregar as raças de gatos
    carregaRacas();
});
