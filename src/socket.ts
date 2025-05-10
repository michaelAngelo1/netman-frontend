import { io } from 'socket.io-client';

const URL = 'ws://ecos.joheee.com:8010';                              

export const socket = io(URL);