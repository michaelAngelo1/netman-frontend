import { useRoomComputer } from "./context/ComputerContext"
import Room from "./Room"

interface HomeProps {
  room: string
}

export default function Home({ ...homeProp } : HomeProps) {
  const { rooms } = useRoomComputer();

  return (
    <div className="p-3 text-2xl">
      <div className="flex flex-col gap-3">
        {rooms
          .filter((room) => room.name === "HD03" || room.name === "HD4")
          .map((room) => (
            <Room key={room.name} room={homeProp.room} />
          ))}
      </div>
    </div>
  );
}
