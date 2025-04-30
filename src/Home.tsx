import { useEffect } from "react";
import { useRoomComputer } from "./context/ComputerContext"
import Room from "./Room"

interface HomeProps {
  room: string
}

export default function Home({ ...homeProp } : HomeProps) {
  const { computers } = useRoomComputer();

  useEffect(() => {
    console.log("computers: ", computers);
  }, [computers])
  

  return (
    <div className="p-3 text-2xl">
      <div className="flex flex-col gap-3">
        {
          homeProp.room == "HD03" ?
          <Room room={homeProp.room}/>
          :
          <Room room={homeProp.room}/>
        }
      </div>
    </div>
  )
}
