function getConfig(env) {
    dojoConfig = {
        baseUrl: '.',
        packages: [
            {
                name: 'dojo',
                location: env.dojoRoot + '/dojo',
                lib: '.'
            },
            {
                name: 'dijit',
                location: env.dojoRoot + '/dijit',
                lib: '.'
            },
            {
                name: 'dojox',
                location: env.dojoRoot + '/dojox',
                lib: '.'
            }
        ],
        paths: {
            js: "src",
            theme: "theme",
            css: "//chuckdumont.github.io/dojo-css-plugin/1.0.0/css",
            lesspp: "//cdnjs.cloudflare.com/ajax/libs/less.js/1.7.3/less.min",
        },
        deps: ["src/bootstrap"],
        async: true,
        has: {
            'dojo-config-api': 0
        },
        fixupUrl: function (url) {
            if (/\/(dojo|dijit|dojox)\/.*\.js$/.test(url)) {
                url += ".uncompressed.js";
            }
            return url;
        }
    };
    return dojoConfig;
}

if (typeof module !== 'undefined' && module) {
    module.exports = getConfig;
}else {
    getConfig({dojoRoot: '//ajax.googleapis.com/ajax/libs/dojo/1.13.0'});
}
