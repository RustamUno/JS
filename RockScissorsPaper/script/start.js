const startGame = () => {
    const app = document.querySelector('.app');
    app.style.height = 'auto';

    if (!localStorage.getItem('styles')) {
        localStorage.setItem('styles', 'styles-default');
    }
    if (!localStorage.getItem('images')) {
        localStorage.setItem('images', 'images-default');
    }
    if (!localStorage.getItem('names')) {
        localStorage.setItem('names', 'names-default');
    }

    window.application.settings.styles = localStorage.getItem('styles');
    window.application.settings.images = localStorage.getItem('images');
    window.application.settings.names = localStorage.getItem('names');

    document.body.style.setProperty('--main-background-color', window.application.styles.body[localStorage.getItem('styles')]);
    window.application.renderScreen('loadingScreen');
    window.application.player.login = localStorage.getItem('login');

    request('ping', null, () => {
        window.application.renderScreen('authScreen');
    })
}
startGame();