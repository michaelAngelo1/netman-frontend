import Room from "./Room"

interface HomeProps {
  room: string
}

export default function Home({ ...homeProp } : HomeProps) {
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
