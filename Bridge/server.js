// server.js (中継サーバー)
const { Client } = require('node-osc');
const { Server } = require('socket.io');

// 1. C++アプリへ送るためのOSCクライアント (ポート9000へ送信)
const oscClient = new Client('127.0.0.1', 9000);

// 2. Reactからの接続を受け付けるWebSocketサーバー (ポート3000)
const io = new Server(3000, {
    cors: { origin: "*" } // どこからでも接続OK
});

console.log("Bridge Server running on port 3000...");

io.on('connection', (socket) => {
    console.log('Web UI Connected!');

    // Reactから "drive" イベントが来たら...
    socket.on('drive', (value) => {
        console.log(`Sending OSC /drive: ${value}`);
        // C++に転送！
        oscClient.send('/drive', parseFloat(value), () => {});
    });
});