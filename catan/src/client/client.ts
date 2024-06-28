import { io } from "socket.io-client";

export class Client {
    private socket
    constructor() {
        this.socket = io()
        
        this.socket.on("connect", () => {
            console.log("Socket Connected");
        });
    }
    
}
