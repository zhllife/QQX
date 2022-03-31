pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        document.getElementById("loadingContainer").style.display = "block";

    };

    var hideSplash = function () {
        // var splash = document.getElementById('application-splash-wrapper');
        //splash.parentElement.removeChild(splash);
        document.getElementById("loadingContainer").style.opacity = "0";
    };

    var setProgress = function (value) {
        var bar = document.getElementById('process');
        if(bar) {
            value = 100*Math.min(1, Math.max(0, value));
            bar.innerHTML = parseInt(value) +"%"
        }
    };





    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});