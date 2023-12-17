import { io, Socket } from 'socket.io-client';

const socket: Socket = io('ws://localhost:8085/calendar');


export default socket;
