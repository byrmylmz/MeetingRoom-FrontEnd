import { io, Socket } from 'socket.io-client';

const socket: Socket = io('ws://localhost:8085/calendar');
// const socket: Socket = io('https://screenapi.mintyfi.com/socket/calendar');

socket.on("connect_error",(error)=>{
    console.log(error.message);

})
socket.on("connect",()=>{
    console.log("Socket Connected",socket.connected)
})


export default socket;
