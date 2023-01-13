window.application.screens['waitingForEnemyScreen'] = renderWaitingForEnemyScreen;

function renderWaitingForEnemyScreen() {
    window.application.renderBlock('settingsBlock', app);

    const waitingForEnemyScreenTitle = window.application.renderBlock('screenTitle', app);
    waitingForEnemyScreenTitle.textContent = 'Ждем подключения противника';
    window.application.renderBlock('blockLoading', app);

    const requestParameters = {
        token: window.application.player.token,
        id: window.application.game.id,
    };

    const receivedData = (responseText) => {
        const data = JSON.parse(responseText);

        if (data.status === 'error') {
            window.application.renderScreen('lobbyScreen');
            return;
        }

        if (data['game-status'].status === 'waiting-for-start') {
            return;
        }

        window.application.game.enemy = data['game-status'].enemy.login;
        localStorage.setItem('game-enemy', window.application.game.enemy);
        window.application.renderScreen('playScreen');
    }

    const timer = setInterval(() => request('game-status', requestParameters, receivedData), 500);
    window.application.timers.push(timer);
};