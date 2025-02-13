interface RoomProps {
  room: string;
}

export default function Room({ room } : RoomProps) {
  return (
    <div className="p-3 flex flex-col gap-6 h-screen items-center">
      <div className="text-slate-50 text-2xl font-bold">Room {room}</div>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 1</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 2</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 3</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 4</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 5</div>
        </div>
        <div className="flex flex-col gap-3">
        <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 1</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 2</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 3</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 4</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 5</div>
        </div>
        <div className="flex flex-col gap-3">
        <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 1</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 2</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 3</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 4</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 5</div>
        </div>
        <div className="flex flex-col gap-3">
        <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 1</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 2</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 3</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 4</div>
          <div className="p-3 bg-accent rounded-xl cursor-pointer hover:opacity-90">Table 5</div>
        </div>
      </div>
    </div>
  )
}
