interface ComputerProps {
  order: number;
  mac: string;
  ip: string;
  hostname: string;
}

export default function Computer({ ...computerProp } : ComputerProps) {
  
  function handleAction(ip: string) {
    console.log('PC on IP: ', ip, ' is controlled');
  }
  
  return (
    <div onClick={() => { handleAction(computerProp.ip) }} className="px-4 py-2 bg-accent rounded-xl cursor-pointer hover:opacity-90 active:opacity-80">
      <div className="flex flex-col gap-3">
        <div className="font-bold text-2xl">PC {computerProp.order}</div>
        <div className="font-medium text-xl">IP: {computerProp.ip}</div>
        <div className="font-medium text-xl">MAC: {computerProp.mac}</div>
      </div>
    </div>
  )
}
