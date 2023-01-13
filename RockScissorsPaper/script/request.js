
function request(url, parameters, onSuccess) {
    const requestParameters = [];

    for (const key in parameters) {
        requestParameters.push(`${key}=${parameters[key]}`);
    }
    const requestUrl = `${backURL}${url}?${requestParameters.join('&')}`;

    const req = new XMLHttpRequest();
    req.open('GET', requestUrl);
    req.send();
    req.addEventListener('readystatechange', (event) => {
        const target = event.target;

        if (target.readyState !== 4) {
            return;
        }

        if (target.status === 200) {
            onSuccess(target.responseText);
        } else {
            window.application.renderScreen('errorScreen');
        }
    });
};
