// import Computer from "./components/Computer";
import { useNavigate } from 'react-router-dom';
import { wolInstance } from './api/axiosConfig';
import ComputerComponent from './components/Computer';
import { useRoomComputer } from './context/ComputerContext';
import { Computer, Room } from './Interface';
import { useEffect } from 'react';

export default function RoomPage({ ...room }: Room) {

  function doWol() {
    console.log("WOL request initiated");
    wolInstance.post("", {
      "mac": [
        "A8-B1-3B-74-13-A6",
        "A8-B1-3B-74-12-16",
        "A8-B1-3B-74-82-CE",
        "A8-B1-3B-74-82-59",
        "A8-B1-3B-74-13-B0"
      ]
    }).then((data) => {
      console.log("successful WOL response: ", data.data.message);
    })
    .catch((e) => {
      console.log("error WOL", e);
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    const at = localStorage.getItem('at');
    if(!at) {
      navigate('/auth')
    }
  }, [])

  const { roomChosen } = useRoomComputer();
  return (
    <div className='p-3 flex flex-col gap-6 h-screen items-center'>
      <div className='text-slate-50 text-2xl font-bold'>
        Room {roomChosen}
      </div>
      <div onClick={() => doWol()} className='btn btn-primary'>Turn on all PCs</div>
      <div className='grid grid-cols-5 grid-rows-5 gap-3'>
        {room ? (
          room.computers.map((computer: Computer, i) => (
            <ComputerComponent key={i} {...computer} />
          ))
        ) : (
          <div className='text-2xl text-white'>Loading...</div>
        )}
      </div>
    </div>
  );
}
