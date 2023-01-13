window.application.blocks['wrp'] = renderWrp;
window.application.blocks['loading'] = renderLoading;
window.application.blocks['blockLoading'] = renderLoadingBlock;;
window.application.screens['loadingScreen'] = renderLoadingScreen

function renderWrp(container) {
    const wrp = document.createElement('div');
    wrp.classList = 'wrp';
    container.appendChild(wrp);
    return wrp;
};

function renderLoading(container) {
    const loading = document.createElement('div');
    loading.classList = 'circle';
    loading.innerHTML = '<span></span><span></span><span></span><span></span>'
    container.appendChild(loading);

    const styles = window.application.settings.styles;
    loading.style.setProperty('loader-background-color', window.application.styles.loader[styles]);

    return loading;
};

function renderLoadingBlock(container) {
    const loading_block = document.createElement('div');
    loading_block.classList = 'circle_center';
    container.appendChild(loading_block);

    return loading_block;
};

function renderLoadingScreen() {
    window.application.renderBlock('settingsBlock', app);

    window.application.renderBlock('blockLoading', app);
};
