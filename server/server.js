const http = require('http');
const ws = require('ws');
const wss = new ws.Server({
    noServer: true
});

console.log("server start")

function accept(req, res) {
    // all incoming requests must be websockets
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
        res.end();
        return;
    }

    // can be Connection: keep-alive, Upgrade
    if (!req.headers.connection.match(/\bupgrade\b/i)) {
        res.end();
        return;
    }

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
    ws.on('message', function (message) {

        console.log("message reveived ")
        console.log(JSON.stringify(message))
        ws.send(`Hello from server, Jan!`);
        // setTimeout(() => ws.close(1000, "Bye!"), 5000);
    });
}

if (!module.parent) {
    http.createServer(accept).listen(8080);
} else {
    exports.accept = accept;
}