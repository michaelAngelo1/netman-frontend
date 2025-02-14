interface ComputerProps {
  order: number;
  mac: string;
  ip: string;
  hostname: string;
}

export default function Computer({ ...computerProp } : ComputerProps) {
  return (
    <div className="px-4 py-2 bg-accent rounded-xl cursor-pointer hover:opacity-90">
      <div className="flex flex-col gap-3">
        <div className="font-bold text-2xl">PC {computerProp.order}</div>
        <div className="font-medium text-xl">IP: {computerProp.ip}</div>
        <div className="font-medium text-xl">MAC: {computerProp.mac}</div>
      </div>
    </div>
  )
}
