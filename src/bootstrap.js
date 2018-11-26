define([
    "dojo/ready",
    "dojo/parser",
    "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/AccordionContainer",
    "dijit/layout/AccordionPane",
    "dojo/has!webpack?dojo-webpack-plugin/amd/dojoES6Promise",
    "css!dijit/themes/claro/claro.css",
    "css!theme/sample.less"
], function(ready, parser) {
    async function f() {
        return 'hello overfly';
    }

    f().then(v => console.log(v));
    ready(function() {
        parser.parse();
    });
    return {};
});
