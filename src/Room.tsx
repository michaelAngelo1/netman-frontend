// import Computer from "./components/Computer";
import { useEffect, useState } from 'react';
import ComputerComponent from './components/Computer';
import { useRoomComputer } from './context/ComputerContext';
import { Computer, Room } from './Interface';
import { socket } from './socket';

export default function RoomPage({ ...room }: Room) {
  const [socketConnected, setSocketConnected] = useState<boolean>();
  const [response, setResponse] = useState<{
    message: string;
    body: unknown;
  } | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('Connected to socket');
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
      console.log('Disconnected from socket');
    });

    socket.on(
      'testingConnectionOutput',
      (data: { message: string; body: unknown }) => {
        console.log('Received:', data);
        setResponse(data);
      }
    );
  }, []);

  function sendData() {
    if (socket && socketConnected) {
      try {
        console.log(socket + ' ' + socketConnected);
        const jsonData = JSON.parse("{ \"test\": \"test\" }");
        socket.emit('testingConnection', JSON.stringify(jsonData));
      } catch (e) {
        console.log(e);

        alert('failed send data');
      }
    } else {
      console.log('Socket not connected');
    }
  }

  const { roomChosen } = useRoomComputer();
  return (
    <div className='p-3 flex flex-col gap-6 h-screen items-center'>
      <div className='text-slate-50 text-2xl font-bold'>
        Room {roomChosen} {socketConnected}
      </div>
      <div
        onClick={() => sendData()}
        className='btn btn-primary p-4'>
        Send data
      </div>
      {response && <div>{response.message}</div>}
      <div className='grid grid-cols-5 grid-rows-5 gap-3'>
        {room ? (
          room.computers.map((computer: Computer) => (
            <ComputerComponent {...computer} />
          ))
        ) : (
          <div className='text-2xl text-white'>Loading...</div>
        )}
      </div>
    </div>
  );
}
