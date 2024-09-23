(function() {
    const apiUrl = window.API_URL || 'https://3000-dkp1903-t2-da7401yta8s.ws-us116.gitpod.io/api/events';
    
    // Utility function to send events
    function sendEvent(eventName, metadata = {}) {
        const visitorId = getVisitorId();
        const payload = {
            eventName: eventName,
            visitorId: visitorId,
            timestamp: new Date().toISOString(),
            metadata: metadata
        };
        console.log('Sending event : ', payload);
        navigator.sendBeacon(apiUrl, JSON.stringify(payload));
    }

    // Function to get a unique visitor ID (you can use localStorage or cookies)
    function getVisitorId() {
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = 'visitor-' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('visitorId', visitorId);
        }
        return visitorId;
    }

    // Track script initialization
    function trackInitialization() {
        console.log("initating scripting")
        sendEvent('script_initialized', { script: 'surface_analytics.js' });
    }

    // Track page view event
    function trackPageView() {
        sendEvent('page_view', { url: window.location.href });
    }

    // Track email entered
    function trackEmailEntered() {
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', (e) => {
                sendEvent('email_entered', { email: e.target.value });
            });
        });
    }

function trackClickEvent() {
    document.addEventListener('click', (e) => {
        const element = e.target;
        if (!element.id) {
            element.id = 'auto-id-' + Math.random().toString(36).substring(2, 15);
        }

        // Capture button text for custom checks
        let eventName = 'element_clicked';
        if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            const buttonText = element.textContent.trim().toLowerCase();

            if (buttonText.includes('log in')) {
                eventName = 'log_in_button_clicked';
            } else if (buttonText.includes('follow us')) {
                eventName = 'follow_us_button_clicked';
            } else if (buttonText.includes('submit')) {
                eventName = 'submit_button_clicked';
            }
        }

        const metadata = {
            elementId: element.id,
            elementTag: element.tagName,
            elementClasses: element.className || 'no-classes',
            buttonText: element.textContent.trim() || 'no-text'
        };

        console.log("Element clicked: ", element);
        sendEvent(eventName, metadata);
    });
}


    // Initialize tracking
    function initializeAnalytics() {
        console.log("Tracking started")
        trackInitialization();
        trackPageView();
        trackEmailEntered();
        trackClickEvent();
    }

    // Start the analytics script after page load
    window.addEventListener('load', initializeAnalytics);
})();
