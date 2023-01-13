window.application.blocks['screenTitle'] = rendersScreenTitle
window.application.blocks['moveButton'] = rendersButton
window.application.blocks['playBlock'] = renderPlayBlock
window.application.screens['playScreen'] = renderPlayScreen

function rendersScreenTitle(container) {
    const screenTitle = document.createElement('h1');
    screenTitle.classList.add('title');
    container.appendChild(screenTitle);

    return screenTitle;
};

function rendersButton(container) {
    const button = document.createElement('button');
    button.classList.add('button');
    button.classList.add(`button_${window.application.settings.styles}`);
    container.appendChild(button);
    return button;
};

function renderPlayBlock(container) {
    const div = document.createElement('div');
    div.classList.add('playBlock');
    container.appendChild(div);

    const rock = window.application.renderBlock('moveButton', div);

    const names = window.application.settings.names;

    rock.dataset.name = 'rock';
    rock.textContent = window.application.names[names].rock;
    const text_button_rock = window.application.renderBlock('text', div);
    text_button_rock.textContent = `${window.application.names[names].rock} > ${window.application.names[names].scissors}`;

    const scissors = window.application.renderBlock('moveButton', div);
    scissors.dataset.name = 'scissors';
    scissors.textContent = window.application.names[names].scissors;
    const text_button_scissors = window.application.renderBlock('text', div);
    text_button_scissors.textContent = `${window.application.names[names].scissors} > ${window.application.names[names].paper}`;

    const paper = window.application.renderBlock('moveButton', div);
    paper.dataset.name = 'paper';
    paper.textContent = window.application.names[names].paper;
    const text_button_paper = window.application.renderBlock('text', div);
    text_button_paper.textContent = `${window.application.names[names].paper} > ${window.application.names[names].rock}`;

    div.addEventListener('click', function (event) {
        const requestParameters = {
            token: window.application.player.token,
            id: window.application.game.id,
            move: `${event.target.dataset.name}`,
        }
        window.application.game.move = window.application.names[names][`${event.target.dataset.name}`]

        const receivedData = (responseText) => {
            const data = JSON.parse(responseText);

            switch (data['game-status'].status) {
                case 'waiting-for-your-move':
                    window.application.renderScreen('drawScreen');
                    setTimeout(() => {
                        window.application.renderScreen('playScreen');
                    }, 1500);
                    break;

                case 'waiting-for-enemy-move':
                    window.application.renderScreen('enemyMoveScreen');
                    break;

                case 'win':
                    window.application.renderScreen('winScreen');
                    break;

                case 'lose':
                    window.application.renderScreen('loseScreen');
                    break;
            }
        }

        request('play', requestParameters, receivedData);

        return div;
    });
}

function renderPlayScreen() {
    window.application.renderBlock('settingsBlock', app);

    const title = window.application.renderBlock('screenTitle', app);
    title.textContent = 'Ход';

    const enemy = window.application.renderBlock('playerInfoLine', app);
    enemy.textContent = `Соперник: ${window.application.game.enemy}`;

    window.application.renderBlock('playBlock', app);
}
