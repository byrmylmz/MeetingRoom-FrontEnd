import { io, Socket } from 'socket.io-client';

// const socket: Socket = io('ws://localhost:8085/calendar');
const socket: Socket = io('ws://10.99.3.2:8085/calendar');


export default socket;
