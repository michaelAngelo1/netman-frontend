

interface ComputerProps {
  order: number;
  mac: string;
  ip: string;
  hostname: string;
}

export default function Computer({ ...computerProp } : ComputerProps) {

  function handleAction({ ...computerProp }, checked: boolean) {
    console.log('PC on IP: ', computerProp.ip, ' is ', checked.toString());
  }
  
  return (
    <div className="px-4 py-2 bg-accent rounded-xl cursor-pointer hover:opacity-90 active:opacity-80">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <div className="font-bold text-2xl">PC {computerProp.order}</div>
          <input onChange={(e) => { handleAction({ ...computerProp }, e.target.checked) }} type="checkbox" className="checkbox checkbox-xl checkbox-primary border-2 border-blue-50"/>
        </div>
        <div className="font-medium text-xl">IP: {computerProp.ip}</div>
        <div className="font-medium text-xl">MAC: {computerProp.mac}</div>
      </div>
    </div>
  )
}
