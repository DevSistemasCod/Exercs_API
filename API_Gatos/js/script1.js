// Função para carregar a lista de raças de gatos
function carregaRacas() {
    // Faz uma solicitação GET para a API que fornece a lista de raças de gatos
    fetch('https://api.thecatapi.com/v1/breeds/')
        .then(function (response) {
            // Verifica se a resposta da solicitação foi bem-sucedida (código de status HTTP 200)
            if (!response.ok) {
                throw new Error('Erro ao carregar raças de gato.');
            }
            // Converte a resposta em um objeto JSON
            return response.json();
        })
        .then(function (racas) {
            // Chama a função para preencher o dropdown de raças com as raças obtidas
            preencheSelecaoDeRaca(racas);
        })
        .catch(function (erro) {
            // Lida com erros, exibindo mensagens de erro no console
            console.error(erro);
        });
}

// Função para popular o dropdown de raças
function preencheSelecaoDeRaca(racas) {
    let racaSelecionada = document.getElementById('racaSelecionada');
    racaSelecionada.innerHTML = '';

    // Itera sobre a lista de raças e cria opções para o elemento select (dropdown)
    racas.forEach(function (raca) {
        let opcao = document.createElement('option');
        opcao.value = raca.id;
        opcao.text = raca.name;
        racaSelecionada.appendChild(opcao);
    });

    // Adiciona um ouvinte de evento para detectar quando a seleção no dropdown muda
    racaSelecionada.addEventListener('change', function () {
        let idSelecionado = racaSelecionada.value;
        let selecionaRaca;
    
        // Procura a raça selecionada com base no ID selecionado
        for (let i = 0; i < racas.length; i++) {
            if (racas[i].id === idSelecionado) {
                selecionaRaca = racas[i];
                break;
            }
        }
        // Se uma raça for encontrada, chama a função para atualizar as informações da raça
        if (selecionaRaca) {
            atualizaInfoRaca(selecionaRaca);
        }
    });

    // Dispara um evento 'change' para preencher as informações iniciais
    racaSelecionada.dispatchEvent(new Event('change'));
}

// Função para atualizar as informações da raça
function atualizaInfoRaca(selecionaRaca) {
    if (selecionaRaca) {
        // Chama a função para carregar uma imagem da raça selecionada
        carregaImagem(selecionaRaca.id);
    }
}

// Função para carregar uma imagem da raça selecionada
function carregaImagem(racaId) {
    // Faz uma solicitação para obter uma imagem da raça com base no ID da raça
    fetch(`https://api.thecatapi.com/v1/images/search?raca_ids=${racaId}&limit=1`)
        .then(function (response) {
            // Verifica se a resposta da solicitação foi bem-sucedida
            if (!response.ok) {
                throw Error('Erro ao carregar imagem de gato.');
            }
            // Converte a resposta em um objeto JSON
            return response.json();
        })
        .then(function (imagens) {
            // Obtém o elemento onde a imagem será exibida
            let imagensDiv = document.getElementById('imagens');
            imagensDiv.innerHTML = '';

            if (imagens.length > 0) {
                // Cria uma tag de imagem e define a imagem obtida
                let imagem = document.createElement('img');
                imagem.className = 'gato-imagem img-fluid';
                imagem.src = imagens[0].url;
                // Adiciona a imagem ao elemento
                console.log(imagem);
                imagensDiv.appendChild(imagem);
            }
        })
        .catch(function (erro) {
            // Lida com erros, exibindo mensagens de erro no console
            console.error(erro);
        });
}

// Carrega as raças e preenche o dropdown ao carregar o documento
document.addEventListener('DOMContentLoaded', function () {
    carregaRacas();
});
