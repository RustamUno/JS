window.application.blocks['loseBlock'] = renderLoseBlock;
window.application.blocks['lobbyButton'] = rendersLobbyButton;
window.application.screens['loseScreen'] = renderLoseScreen;

function renderLoseBlock(container) {
    const loseBlock = document.createElement('div');
    container.appendChild(loseBlock);
    loseBlock.classList.add('lose-block');

    return loseBlock;
};

function rendersLobbyButton(container) {
    const lobbyButton = document.createElement('button');
    lobbyButton.classList.add('button');
    lobbyButton.classList.add(`button_${window.application.settings.styles}`)
    container.appendChild(lobbyButton);

    lobbyButton.addEventListener('click', () => {
        window.application.renderScreen('lobbyScreen');
    });

    return lobbyButton;
}

function renderLoseScreen() {
    window.application.renderBlock('settingsBlock', app);

    const loseBlock = window.application.renderBlock('loseBlock', app);
    loseBlock.textContent = 'Вы проиграли!';

    const lobbyButton = window.application.renderBlock('lobbyButton', app);
    lobbyButton.textContent = 'Перейти в лобби'

    const playButton = window.application.renderBlock('playButton', app);
    playButton.textContent = 'Играть еще';
}
