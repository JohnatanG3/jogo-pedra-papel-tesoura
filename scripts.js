// Seleciona todos os elementos necessários da página
const optionImage = document.querySelectorAll('.options-image');
const container = document.querySelector('.container');
const resultText = document.querySelector('.result-text');
const computerSrcImg = ['img/pedra.png', 'img/papel.png', 'img/tesoura.png'];
const userResult = document.querySelector('.user-result');
const computerResult = document.querySelector('.computer-result');
const userScoreElement = document.getElementById('user-score'); // Selecionando o elemento de pontuação do usuário
const computerScoreElement = document.getElementById('computer-score'); // Selecionando o elemento de pontuação do computador

let userScore = 0; // Inicializa a pontuação do usuário
let computerScore = 0; // Inicializa a pontuação do computador

// Recupera a pontuação do Local Storage ao carregar a página
window.onload = function() {
    const storedUserScore = localStorage.getItem('userScore');
    const storedComputerScore = localStorage.getItem('computerScore');

    // Se houver pontuação armazenada, atualiza as variáveis e a exibição
    if (storedUserScore) {
        userScore = parseInt(storedUserScore); // Converte para número
        userScoreElement.textContent = userScore; // Atualiza a exibição
    }

    if (storedComputerScore) {
        computerScore = parseInt(storedComputerScore); // Converte para número
        computerScoreElement.textContent = computerScore; // Atualiza a exibição
    }
};

// Mapeamento dos resultados do jogo
const winner = {
    RR: 'Empate!',
    RP: 'Computador',
    RS: 'Você',
    PP: 'Empate!',
    PR: 'Você',
    PS: 'Computador',
    SS: 'Empate!',
    SR: 'Computador',
    SP: 'Você'
};

// Função para atualizar a pontuação
function updateScore(finalResult) {
    if (finalResult.includes('Você')) {
        userScore++; // Incrementa a pontuação do usuário
    } else if (finalResult.includes('Computador')) {
        computerScore++; // Incrementa a pontuação do computador
    }

    // Atualiza os elementos de pontuação na tela
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;

    // Armazena a pontuação no Local Storage
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);
}

// Função que lida com o clique em uma das opções
function handleOptionClick(event) {
    const clickedImage = event.currentTarget; // Captura a imagem clicada
    const userIndex = Array.from(optionImage).indexOf(clickedImage); // Obtém o índice da imagem clicada

    container.classList.add("start"); // Adiciona uma classe para animação
    resultText.textContent = "..."; // Define texto inicial de resultado

    // Define a escolha inicial (exibe Pedra) antes da escolha real
    userResult.querySelector('img').src = computerResult.querySelector('img').src = 'img/pedra.png';

    setTimeout(() => {
        container.classList.remove("start"); // Remove a classe após a animação

        // Define a escolha do usuário com base no índice da imagem clicada
        userResult.querySelector('img').src = computerSrcImg[userIndex];
        
        // Escolha aleatória para o computador
        const randomNumber = Math.floor(Math.random() * computerSrcImg.length);
        computerResult.querySelector('img').src = computerSrcImg[randomNumber];

        // Mapeamento para as letras de R, P, S
        const userValue = ['R', 'P', 'S'][userIndex];
        const computerValue = ['R', 'P', 'S'][randomNumber];
        const userComputerResult = userValue + computerValue; // Resultado da combinação
        const finalResult = winner[userComputerResult]; // Verifica o resultado

        // Mostra o resultado na tela
        resultText.textContent = userValue === computerValue ? 'Empate!' : finalResult + ' Ganhou!';

        // Atualiza a pontuação se houver um vencedor
        if (finalResult !== 'Empate!') {
            updateScore(finalResult);
        }
    }, 2000); // Espera 2 segundos para mostrar o resultado
}

// Adiciona o evento de clique para cada imagem de opção
optionImage.forEach(img => {
    img.addEventListener("click", handleOptionClick);
});

// Adiciona evento para o botão de resetar pontuação
document.querySelector('.reset-button').addEventListener('click', function() {
    console.log('Botão de reset clicado'); // Para depuração
    localStorage.clear(); // Limpa o Local Storage
    userScore = 0; // Reseta a pontuação do usuário
    computerScore = 0; // Reseta a pontuação do computador
    userScoreElement.textContent = userScore; // Atualiza a exibição
    computerScoreElement.textContent = computerScore; // Atualiza a exibição
});