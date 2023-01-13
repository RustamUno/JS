window.application.blocks['screenTitle'] = renderScreenTitle;
window.application.blocks['playersList'] = renderPlayersList;
window.application.blocks['playerInfoLine'] = renderPlayerInfoLine;
window.application.blocks['playButton'] = renderPlayButton;
window.application.screens['lobbyScreen'] = renderLobbyScreen;

function renderScreenTitle(container) {
    const screenTitle = document.createElement('h1');
    screenTitle.classList.add('title');
    container.appendChild(screenTitle);
    return screenTitle;
};
function renderPlayersList(container) {
    const playersList = document.createElement('div');
    playersList.classList.add('lobby_players');
    container.appendChild(playersList);
    window.application.renderBlock('blockLoading', playersList);

    const requestParameters = {
        token: window.application.player.token,
    }

    const getOnlinePlayers = setInterval(() => {
        request('player-list', requestParameters, (data) => {
            processReceivedPlayersListData(data, playersList);
        })
    }, 1000);

    window.application.timers.push(getOnlinePlayers);
    return playersList;
}

function processReceivedPlayersListData(responseText, container) {
    const response = JSON.parse(responseText);
    let playerInfoLine;

    container.textContent = ''
    for (const player of response.list) {
        playerInfoLine = window.application.renderBlock('playerInfoLine', container);
        playerInfoLine.textContent = player.login;
        if (player.you) {
            playerInfoLine.classList.add('lobby_players_you');
        }
    };
};
function renderPlayerInfoLine(container) {
    const playerInfoLine = document.createElement('p');
    playerInfoLine.classList.add('list-item');
    container.appendChild(playerInfoLine);
    return playerInfoLine;
};

function renderPlayButton(container) {
    const playButton = document.createElement('button');
    playButton.classList.add('button');
    playButton.classList.add(`button_${window.application.settings.styles}`);
    container.appendChild(playButton);
    playButton.addEventListener('click', startsGame);

    return playButton;
}
function startsGame() {
    window.application.renderScreen('loadingScreen');
    const requestParameters = {
        token: window.application.player.token,
    }
    request('start', requestParameters, processReceivedGameStartData);
};

function processReceivedGameStartData(responseText) {
    const startGameResponse = JSON.parse(responseText);
    window.application.game.id = startGameResponse['player-status'].game.id;
    window.application.player.status = startGameResponse['player-status'].status;
    localStorage.setItem('game-id', window.application.game.id);

    const requestParameters = {
        token: window.application.player.token,
        id: window.application.game.id,
    };
    request('game-status', requestParameters, processReceivedGameStatusData);
}

function processReceivedGameStatusData(responseText) {
    const gameResponse = JSON.parse(responseText);

    if (gameResponse.status === 'error') {
        loadLastScreen();
        return;
    }
    switch (gameResponse['game-status'].status) {
        case 'waiting-for-start':
            window.application.renderScreen('waitingForEnemyScreen');
            break;
        case 'waiting-for-your-move':
            window.application.game.enemy = gameResponse['game-status'].enemy.login;
            localStorage.getItem('game-enemy', window.application.game.enemy);
            window.application.renderScreen('playScreen');
            break;
    }
}

function renderLobbyScreen() {
    window.application.renderBlock('settingsBlock', app);

    for (let item in window.application.game) {
        item = undefined;
    }
    localStorage.setItem('game-id', '');
    localStorage.setItem('game-move', '');
    localStorage.getItem('game-enemy', '');
    window.application.game.id = '';
    window.application.game.move = '';
    window.application.game.enemy = '';

    const lobbyTitle = window.application.renderBlock('screenTitle', app);
    lobbyTitle.textContent = 'Лобби';

    const playersList = window.application.renderBlock('playersList', app);

    const playButton = window.application.renderBlock('playButton', app);
    playButton.textContent = 'Играть';
}
