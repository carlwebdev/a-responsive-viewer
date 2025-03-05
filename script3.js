// CLAUDE 3.5

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

let isScrolling = false;

function syncScroll(sourceIframe) {
    if (isScrolling) return;
    isScrolling = true;

    requestAnimationFrame(() => {
        try {
            const sourceDoc = sourceIframe.contentWindow.document.documentElement;
            const scrollTop = sourceDoc.scrollTop;
            const scrollLeft = sourceDoc.scrollLeft;

            document.querySelectorAll('.iframe').forEach(iframe => {
                if (iframe !== sourceIframe) {
                    iframe.contentWindow.scrollTo({
                        top: scrollTop,
                        left: scrollLeft,
                        behavior: 'auto'
                    });
                }
            });
        } catch (e) {
            console.warn('Cross-origin scrolling blocked:', e);
        } finally {
            isScrolling = false;
        }
    });
}

function addScrollSync(iframeId) {
    const iframe = document.getElementById(iframeId);
    iframe.addEventListener('load', () => {
        iframe.contentWindow.addEventListener('scroll', () => syncScroll(iframe));
    });
}

addScrollSync('laptopView');
addScrollSync('tabletView');
addScrollSync('phoneView');