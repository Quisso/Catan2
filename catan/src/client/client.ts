import { io , Socket } from "socket.io-client";

export class CClient {
    private socket:Socket
    constructor(){
        console.log('Client Connecting')
        this.socket = io();
        this.socket.on("connect", () => {
            console.log(this.socket.id);
        });
    }
    getID():string{
        const ID = this.socket.id
        return ID === undefined ? "NOT CONNECTED" : ID
    }
}