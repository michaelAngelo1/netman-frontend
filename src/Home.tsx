import { useRoomComputer } from "./context/ComputerContext"
import RoomPage from "./Room"

export default function Home() {
  const { rooms, roomChosen } = useRoomComputer();

  return (
    <div className="p-3 text-2xl">
      <div className="flex flex-col gap-3">
        {rooms
          .filter((room) => room.name === roomChosen)
          .map((room) => (
            <RoomPage key={room.name} {...room} />
          ))}
      </div>
    </div>
  );
}
