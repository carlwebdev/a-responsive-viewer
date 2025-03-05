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

/*
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
*/

function syncScroll(event) {
    const { scrollTop, scrollLeft } = event.target.contentWindow.document.documentElement;
    const iframes = document.querySelectorAll('.iframe');
    iframes.forEach(iframe => {
        if (iframe !== event.target) {
            iframe.contentWindow.scrollTo(scrollLeft, scrollTop);
        }
    });
}

document.getElementById('laptopView').addEventListener('load', () => {
    document.getElementById('laptopView').contentWindow.addEventListener('scroll', syncScroll);
});

document.getElementById('tabletView').addEventListener('load', () => {
    document.getElementById('tabletView').contentWindow.addEventListener('scroll', syncScroll);
});

document.getElementById('phoneView').addEventListener('load', () => {
    document.getElementById('phoneView').contentWindow.addEventListener('scroll', syncScroll);
});