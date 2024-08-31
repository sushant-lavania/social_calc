/* eslint-disable no-console */
const express = require("express");
const { Server } = require("ws");
const uuid = require("uuid");
const _ = require("lodash");

// Default data function to create a unique state for each room
const createDefaultData = (roomId) => ({
  name: `Demo Room ${roomId}`,
  id: uuid.v4(),
  celldata: [{ r: 0, c: 0, v: null }],
  order: 0,
  row: 84,
  column: 60,
  config: {},
  pivotTable: null,
  isPivotTable: false,
  status: 0,
});

const app = express();
const port = process.env.PORT || 8081;

let rooms = {}; // Store data for each room
let presences = {}; // Store presences for each room

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/init/:roomId", (req, res) => {
  const { roomId } = req.params;
  rooms[roomId] = createDefaultData(roomId); // Initialize data for a specific room
  res.json({
    ok: true,
    message: `Room ${roomId} initialized`,
    data: rooms[roomId],
  });
});

const server = app.listen(port, () => {
  console.info(`Running on port ${port}`);
});

const connections = {};

// Broadcast to all clients in a specific room except the sender
const broadcastToOthersInRoom = (roomId, selfId, data) => {
  Object.values(connections).forEach((ws) => {
    if (ws.id !== selfId && ws.roomId === roomId) {
      ws.send(data);
    }
  });
};

const wss = new Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
  ws.id = uuid.v4();
  connections[ws.id] = ws;

  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    if (msg.req === "joinRoom") {
      const { roomId } = msg;
      ws.roomId = roomId;
      if (!rooms[roomId]) {
        rooms[roomId] = createDefaultData(roomId); // Initialize room data if it doesn't exist
      }
      if (!presences[roomId]) {
        presences[roomId] = [];
      }
      ws.send(
        JSON.stringify({
          req: "getData",
          data: rooms[roomId], // Send room-specific data
        })
      );
      ws.send(JSON.stringify({ req: "addPresences", data: presences[roomId] }));

    } else if (msg.req === "op") {
      // Apply operation to in-memory data for the specific room
      const roomId = ws.roomId;
      if (rooms[roomId]) {
        rooms[roomId] = { ...rooms[roomId], ...msg.data };
        broadcastToOthersInRoom(roomId, ws.id, data.toString()); // Propagate changes to other clients in the room
      }

    } else if (msg.req === "addPresences") {
      const roomId = ws.roomId;
      ws.presences = msg.data;
      broadcastToOthersInRoom(roomId, ws.id, data.toString());
      if (presences[roomId]) {
        presences[roomId] = _.differenceBy(presences[roomId], msg.data, (v) =>
          v.userId == null ? v.username : v.userId
        ).concat(msg.data);
      }

    } else if (msg.req === "removePresences") {
      const roomId = ws.roomId;
      broadcastToOthersInRoom(roomId, ws.id, data.toString());
    }
  });

  ws.on("close", () => {
    const roomId = ws.roomId;
    broadcastToOthersInRoom(
      roomId,
      ws.id,
      JSON.stringify({
        req: "removePresences",
        data: ws.presences,
      })
    );
    if (presences[roomId]) {
      presences[roomId] = _.differenceBy(presences[roomId], ws.presences, (v) =>
        v.userId == null ? v.username : v.userId
      );
    }
    delete connections[ws.id];
  });
});
