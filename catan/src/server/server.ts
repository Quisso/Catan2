import { Server } from "socket.io";
import express from "express";
import { Express } from "express";
import { createServer } from "http";

export class CServer{
    app:Express;
    httpServer
    io:Server
    constructor(){
        
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer, { /* options */ });
        console.log("Server Connecting...")
        this.io.on("connection", (socket) => {
            console.log(socket)
            console.log(this.rooms())
        });
        this.io.listen(3000);
    }

    private rooms(){
        return this.io.sockets.adapter.rooms
    }

    promptDiceRoll(){
        this.io.emit("Roll Dice")
    }
}