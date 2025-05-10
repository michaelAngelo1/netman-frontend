// import Computer from "./components/Computer";
import { useEffect, useState } from "react";
import ComputerComponent from "./components/Computer";
import { useRoomComputer } from "./context/ComputerContext";
import { Computer, Room } from "./Interface";
import { io, Socket } from 'socket.io-client';
const SOCKET_SERVER_URL = 'http://ecos.joheee.com:8010';

export default function RoomPage({ ...room } : Room) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_SERVER_URL);
    console.log(newSocket ? "new socket: " + newSocket : "new socket doesnt exist");
    setSocket(newSocket);

    // Clean up the socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    console.log("socket: ", socket.connected.toString());
    // Set up event listeners
    socket.on('testConnection', (message: string) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    
    // Clean up event listeners
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('message', message);
    } else {
      console.log("socket takde");
    }
  };
  
  const { roomChosen } = useRoomComputer();
  return (
    <div className="p-3 flex flex-col gap-6 h-screen items-center">
      <div className="text-slate-50 text-2xl font-bold">Room {roomChosen}</div>
      <div className="grid grid-cols-5 grid-rows-5 gap-3">
        {
          room.computers.map((computer: Computer) => (
            <ComputerComponent {...computer} />
          ))
        }
      </div>
    </div>
  )
}
