window.application.blocks['mainTitle'] = renderMainTitle;
window.application.blocks['text'] = renderText;
window.application.blocks['loginButton'] = renderLoginButton;
window.application.blocks['input'] = renderInput;
window.application.blocks['authBlock'] = renderAuthBlock;
window.application.screens['authScreen'] = renderAuthScreen;

function renderMainTitle(container) {
    const mainTitle = document.createElement('h1');
    mainTitle.classList.add('mainTitle');
    container.appendChild(mainTitle);

    return mainTitle;
};

function renderText(container) {
    const text = document.createElement('p');
    text.classList.add('text');
    container.appendChild(text);

    return text;
};

function renderInput(container) {
    const input = document.createElement('input');
    input.classList.add('input');
    container.appendChild(input);

    if (window.application.player.login) {
        input.value = window.application.player.login;
    }

    return input;
};

function renderLoginButton(container) {
    const loginButton = document.createElement('button');
    loginButton.classList.add('button');
    loginButton.classList.add(`button_${window.application.settings.styles}`);
    container.appendChild(loginButton);

    return loginButton;
}

function renderAuthBlock(container) {
    const div = document.createElement('div');
    div.classList.add('authBlock');
    container.appendChild(div);

    const mainTitle = window.application.renderBlock('mainTitle', div);
    mainTitle.textContent = 'Камень Ножницы Бумага';

    const input = window.application.renderBlock('input', div);
    input.placeholder = 'Введите логин';
    const text = window.application.renderBlock('text', div);
    text.classList.add('hint');

    const symbols = ['!', '"', '@', '#', '№', ';', '$', '%', '^', ':', '?', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '<', '>', ',', ' '];

    input.addEventListener('input', function () {
        let value = input.value;
        for (let i = 0; i < symbols.length; i++) {
            if (value.includes(symbols[i])) {
                let newValue = value.replace((symbols[i]), '');
                input.value = newValue;
            }
        };

    });


    const loginButton = window.application.renderBlock('loginButton', div);
    loginButton.textContent = 'Войти';
    //Создал действие с условием, если в поле input есть текст или цифра, то кнопка активна и должна работать а имя должно сохранятся
    loginButton.addEventListener('click', function () {
        if (input.value === '') {
            return;
        }

        window.application.renderScreen('loadingScreen');

        if (localStorage.getItem('login') !== input.value) {
            localStorage.setItem('game-id', '');
            localStorage.setItem('game-move', '');
            localStorage.setItem('game-enemy', '');
        }
        localStorage.setItem('login', input.value);
        window.application.player.login = input.value;
        window.application.game.id = localStorage.getItem('game-id');
        window.application.game.move = localStorage.getItem('game-move');
        window.application.game.enemy = localStorage.getItem('game-enemy');

        const requestParameters = {
            login: input.value,
        }

        const receivedData = (responseText) => {
            const data = JSON.parse(responseText);
            window.application.player['token'] = data.token;
            loadLastScreen();
        };
        request('login', requestParameters, receivedData);
    });

    return div;
}

function loadLastScreen() {
    const requestParameters = {
        token: window.application.player.token,
    };

    const receivedData = (responseText) => {
        const data = JSON.parse(responseText);

        if (data.status === 'error') {
            window.application.renderScreen('authScreen');
            return;
        }

        if (data['player-status'].status === 'lobby') {
            window.application.renderScreen('lobbyScreen');
        } else if (data['player-status'].status === 'game') {
            localStorage.setItem('game-id', data['player-status'].game.id);
            window.application.game.id = localStorage.getItem('game-id');

            const requestParameters = {
                token: window.application.player.token,
                id: window.application.game.id
            }

            const receivedData = (responseText) => {
                const data = JSON.parse(responseText);

                switch (data['game-status'].status) {
                    case 'waiting-for-start':
                        window.application.renderScreen('waitingForEnemyScreen')
                        break

                    case 'waiting-for-your-move':
                        localStorage.setItem('game-enemy', data['game-status'].enemy.login)
                        window.application.game.enemy = localStorage.getItem('game-enemy')

                        window.application.renderScreen('playScreen');
                        break

                    case 'waiting-for-enemy-move':
                        localStorage.setItem('game-enemy', data['game-status'].enemy.login)
                        window.application.game.enemy = localStorage.getItem('game-enemy')

                        window.application.renderScreen('enemyMoveScreen')
                        break

                    case 'win':
                        window.application.renderScreen('winScreen')
                        break

                    case 'lose':
                        window.application.renderScreen('loseScreen')
                        break
                }
            }
            request('game-status', requestParameters, receivedData)
        }

    }

    request('player-status', requestParameters, receivedData)
}

function renderAuthScreen() {
    window.application.renderBlock('settingsBlock', app);

    window.application.renderBlock('authBlock', app);
}