// import Computer from "./components/Computer";
import ComputerComponent from './components/Computer';
import { useRoomComputer } from './context/ComputerContext';
import { Computer, Room } from './Interface';

export default function RoomPage({ ...room }: Room) {


  const { roomChosen } = useRoomComputer();
  return (
    <div className='p-3 flex flex-col gap-6 h-screen items-center'>
      <div className='text-slate-50 text-2xl font-bold'>
        Room {roomChosen}
      </div>
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
