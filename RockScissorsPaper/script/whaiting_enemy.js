window.application.screens['enemyMoveScreen'] = renderEnemyMoveScreen;

function renderEnemyMoveScreen() {
    window.application.renderBlock('settingsBlock', app);

    const waitingForEnemyMoveTitle = window.application.renderBlock('screenTitle', app);
    waitingForEnemyMoveTitle.textContent = 'Ожидание соперника';
    window.application.renderBlock('blockLoading', app);

    const requestParameters = {
        token: window.application.player.token,
        id: window.application.game.id,
    };

    const processReceivedData = (responseText) => {
        const data = JSON.parse(responseText);

        if (data.status === 'error') {
            window.application.renderScreen('lobbyScreen');
            return;
        }

        switch (
        data['game-status'].status
        ) {
            case 'waiting-for-enemy-move':
                break;
            case 'waiting-for-your-move':
                window.application.renderScreen('drawScreen');
                setTimeout(() => {
                    window.application.renderScreen('playScreen');
                }, 1500);
                break;
            case 'win':
                window.application.renderScreen('winScreen');
                break;
            case 'lose':
                window.application.renderScreen('loseScreen');
                break;
        };
    };

    const timer = setInterval(() => request('game-status', requestParameters, processReceivedData), 500);
    window.application.timers.push(timer);
};