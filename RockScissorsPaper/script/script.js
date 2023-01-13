const getParameters = {};

location.search
    .substring(1)
    .split('&')
    .forEach((element) => {
        const [key, parameter] = element.split('=');
        getParameters[key] = decodeURIComponent(parameter);
    });

const backURL = 'https://skypro-rock-scissors-paper.herokuapp.com/';
const app = document.querySelector('.app');

window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screenName) {
        app.style['min-height'] = `${window.innerHeight}px`;
        for (let timer of window.application.timers) {
            clearInterval(timer);
            timer === undefined;
        }
        window.application.timers = [];
        if (window.application.screens[screenName] === undefined) {
            return;
        }

        app.textContent = '';

        window.application.screens[screenName]();
    },


    renderBlock: function (blockName, container) {
        if (window.application.blocks[blockName] === undefined) {
            return;
        }
        return window.application.blocks[blockName](container);
    },

    timers: [],
    player: {},
    game: {},
    styles: {
        loader: {
            'styles-default': 'linear-gradient(rgb(115, 115, 228), rgb(181, 116, 235))',
        },
        body: {
            'styles-default': '#63a3ff',
        },
        'body-image': {

        }
    },
    names: {
        'names-default': { rock: 'Камень', scissors: 'Ножницы', paper: 'Бумага' },
    },

    settings: {
        styles: 'styles-default',
        images: 'images-default',
        names: 'names-default'
    }
}


