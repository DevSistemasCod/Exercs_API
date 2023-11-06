// Função para carregar a lista de raças de gatos
function carregaRacas(preencherSelecaoComRaca) {
    // Faz uma solicitação HTTP assíncrona usando jQuery AJAX
    $.ajax({
        url: 'https://api.thecatapi.com/v1/breeds/', method: 'GET',
        // Define a URL para a qual a solicitação será enviada. Neste caso, estamos buscando informações das raças de gatos em uma API.
        success: function(resposta) {
            preencherSelecaoComRaca(resposta);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

// Função para popular o dropdown de raças
function preencheSelecaoDeRaca(racas) {
    let racaSelecionada = $('#racaSelecionada');
    racaSelecionada.empty();
    
    for (let i = 0; i < racas.length; i++) {
        let raca = racas[i];
        //// Adiciona uma nova opção ao elemento de seleção 'racaSelecionada'
        racaSelecionada.append($('<option>', {
            value: raca.id, 
            // Define o valor da opção como o ID da raça
            text: raca.name
            // Define o texto visível da opção como o nome da raça
        }));
    }

    // Define um evento de mudança no elemento selecionado 'racaSelecionada'
    racaSelecionada.change(function() {
        // Obtém o valor selecionado no elemento de seleção
        let idSelecionado = racaSelecionada.val();

        // Procura a raça com base no ID selecionado e armazena em 'selecionaRaca'
        selecionaRaca = racas.find(function(raca) {
            if (raca.id === idSelecionado) {
                return raca;
            } else {
                return null;
            }
        });
        atualizaInfoRaca();
    });
    racaSelecionada.change();
}

// Função para atualizar as informações da raça
function atualizaInfoRaca() {
    if (selecionaRaca) {
        carregaImagem(selecionaRaca.id);
    }
}

// Função para carregar uma imagem da raça selecionada
function carregaImagem(racaId) {
    // Realiza uma solicitação assíncrona para obter uma imagem de gato usando a API do The Cat API
    $.ajax({
        url: 'https://api.thecatapi.com/v1/images/search',
        data: {
            raca_ids: racaId, // ID da raça selecionada
            limit: 1 // Limita a uma única imagem
        },
        method: 'GET',
        // Função de retorno em caso de sucesso
        success: function(resposta) {
            let imagens = $('#imagens');
            imagens.empty();

            if (resposta.length > 0) {
                let imagem = $('<img>', {
                    class: 'gato-imagem', // Adicione uma classe à imagem
                    src: resposta[0].url
                });
                imagens.append(imagem);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

$(document).ready(function() {
    carregaRacas(function(racas) {
        preencheSelecaoDeRaca(racas);
    });
});
