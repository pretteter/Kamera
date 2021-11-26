const net = require('net');

const server = net.createServer((socket) => {
    socket.end('goodbye\n');
}).on('error', (err) => {
    // Handle errors here.
    throw err;
});

server.listen({
    port: 8080,
    host: "localhost"
}, () => {
    console.log('opened server on', server.address());
});

server.on("connection", (socket) => {
    console.log("connected" + socket.remoteAddress);

    socket.write("test");

    socket.on("data", (data) => {
        console.log("data " + data);
    })

    socket.on("error", (err) => {
        console.log("ERROR " + err)
    })

    socket.on("end",()=>{
        console.log("connection lost")
    })
})