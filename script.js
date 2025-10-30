// console.log('Script loaded');

// Function to update header height CSS variable
function updateHeaderHeight() {
    const header = document.getElementById('header');
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--js-header-height', `${headerHeight}px`);
}

// Update header height on load
updateHeaderHeight();

// Update header height on window resize
window.addEventListener('resize', updateHeaderHeight);

// Update header height on scroll (in case of sticky/fixed positioning)
window.addEventListener('scroll', updateHeaderHeight);

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



document.getElementById('urlInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const submitButton = document.getElementById('submitButton');
        submitButton.classList.add('active');
        // Trigger the action
        submitButton.click();
        // Briefly show active state for keyboard activation
        setTimeout(() => submitButton.classList.remove('active'), 150);
    }
});

// If an initial URL is present (from HTML default), render it on load
const initialUrl = document.getElementById('urlInput').value;
if (initialUrl) {
    updateIframes();
}