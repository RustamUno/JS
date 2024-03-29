window.application.blocks['winBlock'] = renderWinBlock;
window.application.blocks['lobbyButton'] = renderLobbyButton;
window.application.screens['winScreen'] = renderWinScreen;

function renderWinBlock(container) {
    const winBlock = document.createElement('div');
    container.appendChild(winBlock);
    winBlock.classList.add('win-block');

    return winBlock;
}

function renderLobbyButton(container) {
    const lobbyButton = document.createElement('button');
    lobbyButton.classList.add('button');
    lobbyButton.classList.add(`button_${window.application.settings.styles}`);
    container.appendChild(lobbyButton);

    lobbyButton.addEventListener('click', () => {
        window.application.renderScreen('lobbyScreen');
    });
    return lobbyButton;
};

function renderWinScreen() {
    window.application.renderBlock('settingsBlock', app);

    const winBlock = window.application.renderBlock('winBlock', app);
    winBlock.textContent = 'Вы победили!';

    const lobbyButton = window.application.renderBlock('lobbyButton', app);
    lobbyButton.textContent = 'Перейти в лобби';

    const playButton = window.application.renderBlock('playButton', app);
    playButton.textContent = 'Играть еще';
};