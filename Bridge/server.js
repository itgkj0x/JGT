// server.js (中継サーバー)
const { Client } = require('node-osc');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// 1. C++アプリへ送るためのOSCクライアント (ポート9000へ送信)
const oscClient = new Client('127.0.0.1', 9000);

// 2. Reactからの接続を受け付けるWebSocketサーバー (ポート3000)
const io = new Server(3000, {
    cors: { origin: "*" } // どこからでも接続OK
});

// 3. HTTP APIサーバー (ポート3001)
const app = express();
app.use(cors());
app.use(express.json());

const presetsPath = path.join(__dirname, '../WebUI/src/db/presets.json');

// プリセット保存エンドポイント
app.post('/api/presets/:id', async (req, res) => {
    try {
        const presetId = req.params.id;
        const { pedals } = req.body;

        console.log(`Saving preset ${presetId} with pedals:`, pedals);

        // presets.jsonを読み込む
        const data = await fs.readFile(presetsPath, 'utf8');
        const presetsData = JSON.parse(data);

        // 該当するプリセットを探す
        const presetIndex = presetsData.Presets.findIndex(p => p.id === presetId);
        
        if (presetIndex === -1) {
            return res.status(404).json({ error: 'Preset not found' });
        }

        // ペダル情報を更新
        presetsData.Presets[presetIndex].pedals = pedals.map(pedal => ({
            pedal_id: pedal.id,
            settings: pedal.settings || {}
        }));

        // ファイルに書き込む
        await fs.writeFile(presetsPath, JSON.stringify(presetsData, null, 4), 'utf8');

        console.log(`Preset ${presetId} saved successfully`);
        res.json({ success: true, message: 'Preset saved successfully' });
    } catch (error) {
        console.error('Error saving preset:', error);
        res.status(500).json({ error: 'Failed to save preset' });
    }
});

app.listen(3001, () => {
    console.log('HTTP API Server running on port 3001...');
});

console.log("WebSocket Server running on port 3000...");

io.on('connection', (socket) => {
    console.log('Web UI Connected!');

    // Reactから "drive" イベントが来たら...
    socket.on('drive', (value) => {
        console.log(`Sending OSC /drive: ${value}`);
        // C++に転送！
        oscClient.send('/drive', parseFloat(value), () => {});
    });
});