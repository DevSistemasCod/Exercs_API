// Função para buscar uma imagem da NASA com base na data selecionada
function buscarImagem(dataSelecionada) {
    const apiKey = 'ddutt5o1zbszvYRunHwVJtOpLP1a03ULcOBO3EFq';
    // cria a URL com a chave de API da NASA e a data selecionada
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dataSelecionada}`;

    // Faz uma solicitação à API da NASA para obter informações sobre a imagem do dia
    return fetch(url)
        .then(function (resposta) {
            // Verifica se a resposta da solicitação é bem-sucedida
            if (!resposta.ok) {
                throw new Error('Erro ao carregar imagem da NASA.');
            }
            // Converte a resposta em formato JSON
            return resposta.json();
        })
        .catch(function (error) {
            console.error("Ocorreu um erro na solicitação HTTP", error);
        });
}

// Função para atualizar a página com a imagem
function atualizarPagina(imagem, urlDaImagem) {
    // Atualiza a imagem exibida na página com a URL fornecida
    imagem.src = urlDaImagem;
}

// Evento que é acionado quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', function () {
    // Obtém elementos HTML relevantes
    let entradaData = document.getElementById('data');
    let imagem = document.getElementById('imagem');

    // Adiciona um ouvinte de evento para quando a data é alterada
    entradaData.addEventListener('change', function () {
        // Obtém a data selecionada pelo usuário
        let dataSelecionada = entradaData.value;
        // Chama a função para buscar a imagem com base na data
        buscarImagem(dataSelecionada)
            .then(function (data) {
                // Chama a função para atualizar a página com a nova imagem
                atualizarPagina(imagem, data.url);
            })
            .catch(function (error) {
                console.error("Ocorreu um erro na solicitação:", error);
            });
    });
});
