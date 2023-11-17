require = require("esm")(module);
const mix = require("laravel-mix");

mix.options({
    hmrOptions: {
        host: "localhost", // HMR 서버를 실행할 호스트를 지정합니다.
        port: 8080, // HMR 서버를 실행할 포트를 지정합니다.
    },
});

mix.js("resources/js/app.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [
        //
    ]);
