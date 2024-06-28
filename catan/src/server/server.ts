import { Server } from "socket.io";

export class CServer{
    private io
    constructor(){
        this.io = new Server()
        this.io.on("connection", (socket) => {
            console.log(socket)
            console.log(this.rooms())
        });
        this.io.listen(3000);
    }
    private rooms(){
        return this.io.sockets.adapter.rooms
    }
}