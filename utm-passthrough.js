(function () {
    var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

    // Capture UTMs from current URL into sessionStorage
    var pageParams = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach(function (key) {
        if (pageParams.has(key)) {
            sessionStorage.setItem(key, pageParams.get(key));
        }
    });

    function getStoredUtms() {
        var utms = new URLSearchParams();
        UTM_KEYS.forEach(function (key) {
            var val = sessionStorage.getItem(key);
            if (val) utms.set(key, val);
        });
        return utms;
    }

    function appendUtms(href, utms) {
        try {
            var url = new URL(href);
            utms.forEach(function (value, key) { url.searchParams.set(key, value); });
            return url.toString();
        } catch (e) {
            return href;
        }
    }

    function applyUtms() {
        var utms = getStoredUtms();
        if (!utms.toString()) return;

        // Update outbound SKED and ChiroHD links so UTMs follow the user across domains
        document.querySelectorAll('a[href*="sked.life"], a[href*="chirohd.com"]').forEach(function (link) {
            link.href = appendUtms(link.href, utms);
        });
    }

    // Inject stashed UTMs into a HubSpot form's matching hidden fields.
    function injectUtmsIntoHubSpotForm(form) {
        if (form.dataset.utmInjected === '1') return;
        form.dataset.utmInjected = '1';
        UTM_KEYS.forEach(function (key) {
            var val = sessionStorage.getItem(key);
            if (!val) return;
            var input = form.querySelector('input[name="' + key + '"]');
            if (!input) return;
            input.value = val;
            input.dispatchEvent(new Event('input',  { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }

    function scanForHubSpotForms(root) {
        (root || document).querySelectorAll('form.hs-form').forEach(injectUtmsIntoHubSpotForm);
    }

    function watchForHubSpotForms() {
        scanForHubSpotForms();
        if (typeof MutationObserver === 'undefined') return;
        var observer = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var added = mutations[i].addedNodes;
                for (var j = 0; j < added.length; j++) {
                    var node = added[j];
                    if (node.nodeType !== 1) continue;
                    if (node.matches && node.matches('form.hs-form')) {
                        injectUtmsIntoHubSpotForm(node);
                    } else if (node.querySelectorAll) {
                        scanForHubSpotForms(node);
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function init() {
        applyUtms();
        watchForHubSpotForms();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
