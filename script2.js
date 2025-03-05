function updateIframes() {
    const url = document.getElementById('urlInput').value;
    if (url) {
        document.getElementById('laptopView').src = url;
        document.getElementById('tabletView').src = url;
        document.getElementById('phoneView').src = url;
    } else {
        alert('Please enter a valid URL');
    }
}

function syncScroll(event) {
    const { scrollTop, scrollLeft } = event.target.contentWindow.document.documentElement;
    const iframes = document.querySelectorAll('.iframe');
    iframes.forEach(iframe => {
        if (iframe !== event.target) {
            iframe.contentWindow.scrollTo(scrollLeft, scrollTop);
        }
    });
}

function addScrollSync(iframeId) {
    const iframe = document.getElementById(iframeId);
    iframe.addEventListener('load', () => {
        iframe.contentWindow.addEventListener('scroll', syncScroll);
    });
}

addScrollSync('laptopView');
addScrollSync('tabletView');
addScrollSync('phoneView');