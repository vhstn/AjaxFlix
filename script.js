// Função para buscar filmes com base no título fornecido
function buscarFilmes() {
    // Obtém o título do filme digitado pelo usuário
    const query = document.getElementById('busca').value;
    const apiKey = '4a3b711b'; 
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;
    // Cria uma nova requisição AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        // Quando a requisição estiver completa e for bem-sucedida
        if (xhr.readyState === 4 && xhr.status === 200) {
            const resposta = JSON.parse(xhr.responseText);
            exibirResultados(resposta); // Exibe os resultados na página
        }
    };
    xhr.send(); // Envia a requisição
}

// Função para exibir os resultados na página
function exibirResultados(dados) {
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = ''; // Limpa resultados anteriores
    // Verifica se a resposta da API é bem-sucedida
    if (dados.Response === 'True') {
        // Itera sobre a lista de filmes encontrados
        dados.Search.forEach(filme => {
            // Cria um elemento para exibir as informações do filme
            const divFilme = document.createElement('div');
            divFilme.className = 'filme';
            // Adiciona a imagem do pôster do filme
            const imagem = document.createElement('img');
            imagem.src = filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/200x300?text=Sem+Imagem';
            // Adiciona o título do filme
            const titulo = document.createElement('h3');
            titulo.textContent = filme.Title;
            // Adiciona o ano de lançamento do filme
            const ano = document.createElement('p');
            ano.textContent = `Ano: ${filme.Year}`;
            // Adiciona os elementos criados ao contêiner do filme
            divFilme.appendChild(imagem);
            divFilme.appendChild(titulo);
            divFilme.appendChild(ano);
            // Adiciona o contêiner do filme aos resultados
            resultados.appendChild(divFilme);
        });
    } else {
        // Exibe mensagem caso nenhum filme seja encontrado
        resultados.innerHTML = `<p>Não foram encontrados filmes para a busca: ${document.getElementById('busca').value}</p>`;
    }
}