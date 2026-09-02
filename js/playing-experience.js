function openExperience(url) {
    const modal = document.getElementById('experience-modal');
    const container = document.getElementById('experience-container');

    if (!container.querySelector('iframe')) {
        const iframe = document.createElement('iframe');

        iframe.src = url;

        iframe.width = '1280';
        iframe.height = '720';

        iframe.allow = 'fullscreen; autoplay; pointer-lock';
        iframe.allowFullscreen = true;

        iframe.className = 'experience-frame';

        container.appendChild(iframe);
    }

    modal.classList.add('open');
}


function closeExperience() {
    const modal = document.getElementById('experience-modal');
    const container = document.getElementById('experience-container');

    /*
        * iframe 자체를 제거합니다.
        * display:none으로 숨기는 것이 아니라
        * iframe의 browsing context를 제거합니다.
        */
    container.replaceChildren();

    modal.classList.remove('open');
}


function handleBackdropClick(event) {
    if (event.target.id === 'experience-modal') {
        closeExperience();
    }
}
