(function() {
    const apiUrl = 'https://3000-dkp1903-t2-da7401yta8s.ws-us116.gitpod.io/api/events';
    
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

    // Track click event
    function trackClickEvent() {
        document.addEventListener('click', (e) => {
            const element = e.target;
            const metadata = {
                elementId: element.id || null,
                elementTag: element.tagName,
                elementClasses: element.className
            };
            console.log("Elemeent : ", element);
            sendEvent('element_clicked', metadata);
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
